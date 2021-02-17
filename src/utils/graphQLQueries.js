/* 
    Evolutility-UI-React

    https://github.com/evoluteur/evolutility-ui-react
    (c) 2021 Olivier Giulieri
*/

// Helpers functions for GraphQL

import { fieldTypes, fieldIsNumber, fieldIsNumeric, fieldIsDateOrTime } from './dico.js'
import config from '../config.js'
import moMa from './moMa.js'
import { dateTZ } from '../utils/format.js'

const ft = fieldTypes

const prepData = (entity, data) => {
    const m = moMa.getModel(entity)
    let d = '{'
    m.fields.forEach(f => {
        const v = data[f.id]
        if(v !== undefined){
            if(f.type === ft.lov){
                var vv = parseInt(v, 10)
                if(vv){
                    //const s = f.list.find(d => d.id === vv)
                    d += f.id+'_id: '+vv+' '
                }
            }else if(f.type === ft.date){
                d += f.id+':"'+dateTZ(v)+'" '
            }else{
                d += f.id+':"'+v+'" '
            }
        } 
    })
    d += '}'
    return d
}

export const gqlOptions = query => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: query})
})

export const runQuery = (q, cb, cbError) => {
  return fetch(config.apiPathGraphQL, gqlOptions(q))
    .then(r => r.json())
    .then(data => {
        if(data.errors){
          console.error(data.errors)
          if(cbError){
            cbError(data.errors)
          }
        }else{ 
            cb(data)
        }
    });
}

export const fullCount = m => ' _full_count: '+m.qid+'_aggregate  { aggregate { count }}'

export const qField = f => (f.type===ft.lov) ? f.id+' {id '+(f.lovColumn || 'name')+
        (f.lovIcon?' icon':'')+
        '} ' 
        : f.id

export const qFields = m => 'id '+m.fields.map(qField).join(' ')

export const qCollecs = m => m.collections.map(c => ' '+c.id+'(order_by:{'+(c.order || 'id')+': asc}) { id '+
        c.fields.map(qField).join(' ')+'}').join(' ')

export const qMenus = `{
  menus: evol_evol_world(where:{ active: { _eq: true}}, order_by:{position:asc}) {
    id
    name
    menus: objects(where:{ active: { _eq: true}}, order_by:{title:asc}) {
      qid: id
      id: entity
      text: title
      icon
    }
  }
}`

export const qModels = `{ objects: evol_evol_object {
    id
    entity
    title
    fields {
      id
      label
      labelshort
      css
      defaultvalue
      height
      help
      inmany
      format
      fieldType {
        id
        name
        icon
      }
      insearch
      lovcolumn
      lovicon
      lovtable
      maxlength
      maxvalue
      minlength
      minvalue
      nocharts
      nofilter
      nostats
      position
      readonly
      regexp
      required
      type_id
      u_date
      width
      description
      fid
      object_id
    }
    groups {
      id
      gid
      header
      footer
      fields
      label
      object_id
      position
      type_id
      width
      css
      description
    }
    active
    name
    icon
    nameplural
    nostats
    pkey
    titlefield
    world_id
    nocharts
    table
    collecs {
      c_date
      cid
      dbcolumn
      description
      id
      label
      object_id
      position
      table
      fields
    }
    description
  }
} `

export const qSchema = `{ 
  __schema {
    queryType{
      name  
      fields{
        name 
        description
        type{
          name
          fields{
            name
            description
          }
        }
      } 
    }
  }
}`

export const qOrderBy = (m, sortField, sortDirection='asc') => {
  const mft = m.fieldsH[sortField]
  let orderBy = ', order_by:{'+sortField+':'
  if(mft && mft.type===ft.lov){
    orderBy += '{name:'+sortDirection+'}}'
  }else{
    orderBy += sortDirection+'}'
  }
  return orderBy
}

// stats: evol_wine_aggregate{ }
export const statsAggregate = m => {
  const props = ['min','max','avg','sum']
  const sag = {
    min: [],
    max: [],
    avg: [],
    sum: [],
  }
  m.fields.forEach(f => {
    if(fieldIsNumeric(f) && !f.noStats){
      if(f.type!=='money' && fieldIsNumber(f)){
          // TODO mane it work for money fields
        props.forEach(p => sag[p].push(f.id))
      }
      if(fieldIsDateOrTime(f)){
        sag.min.push(f.id)
        sag.max.push(f.id)
      }
    }
  });
  return 'stats: '+m.qid + '_aggregate { aggregate {'+
    props.map(p => sag[p].length ? (p + ' {' + sag[p].join(' ') + '}') : '').join(' ')+
    ' count'+
  '}}'
}

export const qStats = m => 'query {'+statsAggregate(m)+'}'

export const qOne = (entity, id) => {
  const m = moMa.getModel(entity)
  if(m){ 
    let q = 'query { one: '+m.qid+'_by_pk(id:'+id+') { '+
      qFields(m)+
      qCollecs(m)+
    ' }}'
    return q
  }else{
    console.error('Model not found '+entity)
    return null
  }
}

export const qDelete = (mqid, id) => `mutation {
  deleted: ${'delete_'+mqid} (
    where: {id: {_eq: ${id}}}
  ) {affected_rows}
}`

export const qUpdateOne = (entity, mqid, id, data) => {
    const m = moMa.getModel(entity)
    return `mutation {
    updated: ${'update_'+mqid} (
        where: {id: {_eq: ${id}}}
        _set: ${ prepData(entity, data) }
        ) {returning {id ${ qFields(m) } }}
  }`
}
// ) {returning ${ qOne(entity, id) }  }
  
export const qInsertOne = (entity, mqid, data) => {
    const m = moMa.getModel(entity)
    return `mutation {
    inserted: ${'insert_'+mqid} (
      objects: [${ prepData(entity, data) }]
    ) {returning {id ${ qFields(m) }}}
  }`
}

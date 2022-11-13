export const qMenus = `{
  menus: evol_world(where:{ active: { _eq: true}}, order_by:{position:asc}) {
    id
    name
    menus: objects(where:{ active: { _eq: true}}, order_by:{title:asc}) {
      qid: id
      id: entity
      text: title
      icon
    }
  }
}`;

export const qModels = `{ objects: evol_object {
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
    icon
    name
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
} `;

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
}`;


// Evolutility-UI-React :: /utils/data-layer.js

// access to data via server-node REST API

// (c) 2021 Olivier Giulieri

import axios from 'axios'
import { apiPath } from '../config.js'
import { proxy } from '../../package.json'

const daoRest = {

    apiType: 'rest',

    // get a single item
    getOne: (entity, id) => axios.get(apiPath + entity + '/' + id)
            .then(resp => resp.data),

    // get an array of items
    getMany: function(entity, options) {
        let tail = options ? '?' + Object.entries(options).map(([k,v]) => `${k}=${v}`).join('&')
            : ''
        return axios.get(apiPath + entity + tail)
            .then(data => {
                const d = data.data
                d._full_count = d.length ? d[0]._full_count : 0
                return d
            })
    },

    // get a collection of sub-items (details for master)
    //getCollec: (entity, collid, id) => axios.get(apiPath + entity + '/collec/'+ collid + '?id=' + id + '&pageSize=' + pageSize),

    // delete an item
    deleteOne: (entity, id) => axios.delete(apiPath + entity + '/' + id),

    // add an item
    addOne: (entity, data) => axios.post(apiPath + entity + '/', data),

    // update (replace) an item
    updateOne: (entity, id, data) => axios.put(apiPath + entity + '/' + id, data),

    // upload a data item (doc or image)
    // response value has filename
    uploadOne: (entity, id, field, data) => axios.post(apiPath + entity + '/upload/' + id + '?field=' + field, data),

    // get list of values for field
    getLov: (entity, field) => axios.get(apiPath + entity + '/lov/' + field),

    // get list of chartable values for field
    getChart: (entity, field) => axios.get(apiPath + entity + '/chart/' + field),

    // get entity statistics 
    getStats: entity => axios.get(apiPath + entity + '/stats/'),

    // get entity as CSV file
    getManyCSV: entity => axios.get(apiPath + entity + '?format=csv'),

    // get the models
    getModels: () => axios.get(apiPath + 'models'),

    getFileModel: (entity, path) => proxy + apiPath + entity + `'?model=${path}`,

    getAPI: entity => axios.get(apiPath + '?id=' + entity),

    getUrl: url => axios.get(apiPath + url)
}
 
export default daoRest;

// Evolutility-UI-React :: /utils/data-layer.js

// access to database via server-node REST API

// (c) 2018 Datid Bennett

import axios from 'axios'
import { apiPath, pageSize } from '../config.js'
import { proxy } from '../../package.json'

// simple logging function, easy to disable
function logall(...args) {
    console.log(...args)
}

logall('apipath', apiPath)	

export default {
    // get a single item
    getOne: function(entity, id) {
        logall('getOne', entity, id)
        return axios.get(apiPath + entity + '/' + id)
    },

    // get an array of items
    getMany: function(entity) {
        logall('getMany', entity)
        return axios.get(apiPath + entity + '?pageSize=' + pageSize)
    },

    // get a collection of sub-items (details for master)
    getCollec: function(entity, collid, id) {
        logall('getCollec', entity, collid, id)
        return axios.get(apiPath + entity + '/collec/'+ collid + '?id=' + id + '&pageSize=' + pageSize)
    },

    // get array of items using query expression
    getQuery: function(entity, query) {
        logall('getQuery', entity, query)
        return axios.get(apiPath + entity + '?' + query + '&pageSize=' + pageSize)
    },

    // delete an item
    deleteOne: function(entity, id) {
        logall('deleteOne', entity, id)
        return axios.delete(apiPath + entity + '/' + id)
    },

    // add an item
    addOne: function(entity, data) {
        logall('addOne', entity, data)
        return axios.post(apiPath + entity + '/', data)
    },

    // update (replace) an item
    updateOne: function(entity, id, data) {
        logall('updateOne', entity, id, data)
        return axios.put(apiPath + entity + '/' + id, data)
    },

    // upload a data item (doc or image)
    // response value has filename
    uploadOne: function(entity, id, field, data) {
        logall('uploadOne', entity, id, field, data)
        return axios.post(apiPath + entity + '/upload/' + id + '?field=' + field, data)
    },

    // get list of values for field
    getLov: function(entity, field) {
        logall('getLov', entity, field)
        return axios.get(apiPath + entity + '/lov/' + field)
    },

    // get list of chartable values for field
    getChart: function(entity, field) {
        logall('getChart', entity, field)
        return axios.get(apiPath + entity + '/chart/' + field)
    },

    // get entity statistics 
    getStats: function(entity) {
        logall('getStats', entity)
        return axios.get(apiPath + entity + '/stats/')
    },

    // get entity as CSV file
    getCsv: function(entity) {
        logall('getCsv', entity)
        return axios.get(apiPath + entity + '?format=csv')
    },

    getFileModel: function(entity, path) {
        logall('getFileModel', entity)
        return proxy + apiPath + entity + `'?model=${path}`;
    },
}
// Evolutility-UI-React :: /utils/load-models.js

// load models from server at start-up

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Datid Bennett

import { prepModel } from '../utils/dico'
import dataLayer from '../utils/data-layer'

// simple logging function, easy to disable
function logall(...args) {
    console.log(...args)
}

let models = {}

// load and prepare all models
function loadAllModels(cb) {
    dataLayer.getMany('table')
    .then(response => {
        response.data.forEach(m => { 
            reJson(m, ['searchFields', 'fields', 'groups'])
            m.id = m.modelid
            models[m.id] = prepModel(m) 
        })
        logall('models', models)	
        if (cb) cb()
    })
    .catch(err => {
        logall('error', err)	
    })
    
    
}

// field type json was stringified for transmission
function reJson(data, fields) {
    fields.forEach(f => {
        if (data[f])
            data[f] = JSON.parse(data[f])
    })
    return data
}

export { models as default, loadAllModels }

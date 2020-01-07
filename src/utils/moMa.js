// Evolutility-UI-React :: utils/moMa.js

// Models manager: fetch and cache models

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2020 Olivier Giulieri


import axios from 'axios'
import config from '../config'
import models from '../models/all_models'
import { prepModel } from './dico'

export function fetchModels(cb, cbErr) {
    const url = config.apiPath+'meta/models'
    axios.get(url)
        .then(response => {
            addModels(response.data)
            if(cb){
                cb(models)
            }
        })
        .catch(err => {
            console.error(err)
            if(cbErr){
                cbErr(err)
            }
        });
}

export const getModel = mId => models[mId] || null;

export function addModels(ms) {
    ms.forEach(m => {
        models[m.id] = prepModel(m)
    })
}

export let modelIds = Object.keys(models)

export default {
	fetchModels: fetchModels,
    addModels: addModels,
    getModel: getModel,
    models: models,
    modelIds: modelIds,
}
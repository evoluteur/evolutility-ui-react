/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

import {prepModel} from '../utils/dico'

import todo from './todo'
import contact from './contact'
import comics from './comics'
import restaurant from './restaurant'
import winecellar from './winecellar'
import winetasting from './winetasting'
import test from './test'


const allModels = {
	todo: prepModel(todo),
	contact: prepModel(contact),
	restaurant: prepModel(restaurant),
	comics: prepModel(comics),
	winecellar: prepModel(winecellar),
	winetasting: prepModel(winetasting),
    test: prepModel(test),
}

export default allModels
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


const allModels = {
	todo: prepModel(todo),
	contact: prepModel(contact),
	restaurant: prepModel(restaurant),
	comics: prepModel(comics),
	winecellar: prepModel(winecellar),
	winetasting: prepModel(winetasting),
}

export default allModels
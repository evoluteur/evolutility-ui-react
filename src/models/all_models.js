import {prepModel} from '../utils/dico'

import todo from './todo'
import contact from './contact'
import restaurant from './restaurant'
import comics from './comics'
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
import {prepModel} from '../utils/dico'

import todo from './todo'
import contact from './contact'
import restaurant from './restaurant'
import comics from './comics'
import winecellar from './winecellar'
import winetasting from './winetasting'

//import entity from './dico/entity'
//import field from './dico/field'

module.exports = {
	todo: prepModel(todo),
	contact: prepModel(contact),
	restaurant: prepModel(restaurant),
	comics: prepModel(comics),
	winecellar: prepModel(winecellar),
	winetasting: prepModel(winetasting),

	//entity: prepModel(entity),
	//field: prepModel(field)
}


import {prepModel} from '../js/utils/dico'

import todo from './todo'
import contact from './contact'
import comics from './comics'

//import entity from './dico/entity'
//import field from './dico/field'

module.exports = {
	todo: prepModel(todo),
	contact: prepModel(contact),
	comics: prepModel(comics),

	//entity: prepModel(entity),
	//field: prepModel(field)
}


import {prepModel} from '../utils/dico'

import todo from './todo'
import contact from './contact'
import comics from './comics'

module.exports = {
	todo: prepModel(todo),
	contact: prepModel(contact),
	comics: prepModel(comics)
}


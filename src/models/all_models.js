/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

import { prepModel, prepModelCollecs } from '../utils/dico'

// - Organizer
import todo from './organizer/todo'
import contact from './organizer/contact'
import comics from './organizer/comics'
import restaurant from './organizer/restaurant'
import winecellar from './organizer/winecellar'
import winetasting from './organizer/winetasting'

// - Music
import album from './music/album'
import artist from './music/artist'
import track from './music/track'

// - Tests
import test from './tests/test'

// - Designer
import field from './designer/field'
import object from './designer/object'
import world from './designer/world'

let models = {
    todo: todo,
    contact: contact,
    comics: comics,
    restaurant: restaurant,
    winecellar: winecellar,
    winetasting: winetasting,

    album: album,
    artist: artist,
    track: track,

    test: test,

    field: field,
    object: object,
    world: world,
}

const ms = Object.keys(models)
// need 2 passes for field map to be populated first, then collecs
ms.forEach(m => { models[m] = prepModel(models[m]) })
ms.forEach(m => { models[m] = prepModelCollecs(models, models[m]) })

export default models
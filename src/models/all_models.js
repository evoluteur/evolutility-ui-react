/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

import { prepModel, prepModelCollecs } from '../utils/dico'

// - Personal Information Manager (PIM)
import todo from './pim/todo'
import contact from './pim/contact'
import comics from './pim/comics'
import restaurant from './pim/restaurant'
import winecellar from './pim/winecellar'
import winetasting from './pim/winetasting'

// - Music
import album from './music/album'
import artist from './music/artist'
import track from './music/track'

import test from './tests/test'


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
}

const ms = Object.keys(models)
// need 2 passes for field map to be populated first, then collecs
ms.forEach(m => { models[m] = prepModel(models[m]) })
ms.forEach(m => { models[m] = prepModelCollecs(models, models[m]) })

export default models
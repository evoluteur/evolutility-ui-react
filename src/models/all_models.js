/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

import {prepModel} from '../utils/dico'

import todo from './pim/todo'
import contact from './pim/contact'
import comics from './pim/comics'
import restaurant from './pim/restaurant'
import winecellar from './pim/winecellar'
import winetasting from './pim/winetasting'

import album from './music/album'
import artist from './music/artist'
import track from './music/track'

import test from './tests/test'

export default {
    todo: prepModel(todo),
    contact: prepModel(contact),
    comics: prepModel(comics),
    restaurant: prepModel(restaurant),
    winecellar: prepModel(winecellar),
    winetasting: prepModel(winetasting),

    album: prepModel(album),
    artist: prepModel(artist),
    track: prepModel(track),

    test: prepModel(test),
}

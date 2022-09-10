/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

import { prepModels } from "../utils/dico";

// - Organizer
import todo from "./organizer/todo";
import contact from "./organizer/contact";
import comics from "./organizer/comics";
import restaurant from "./organizer/restaurant";
import winecellar from "./organizer/winecellar";
import winetasting from "./organizer/winetasting";

// - Music
// import album from './music/album'
// import artist from './music/artist'
// import track from './music/track'

// - Tests
//import test from './tests/test'

// - Designer
import field from "./designer/field";
import object from "./designer/object";
import group from "./designer/group";
import collection from "./designer/collection";
import world from "./designer/world";

let models = {
  // - Organizer
  todo: todo,
  contact: contact,
  comics: comics,
  restaurant: restaurant,
  winecellar: winecellar,
  winetasting: winetasting,

  // - Music
  // album: album,
  // artist: artist,
  // track: track,

  // - Tests
  //test: test,

  // - Designer
  field: field,
  object: object,
  group: group,
  collection: collection,
  world: world,
};

prepModels(models);

export default models;

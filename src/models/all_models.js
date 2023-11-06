/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

// - Organizer
import todo from "./organizer/todo";
import contact from "./organizer/contact";
import comics from "./organizer/comics";
import restaurant from "./organizer/restaurant";
import winecellar from "./organizer/winecellar";
import winetasting from "./organizer/winetasting";

// - Music
import artist from "./music/artist";
import album from "./music/album";
import track from "./music/track";

// // - Designer
// import field from "./designer/field";
// import object from "./designer/object";
// import group from "./designer/group";
// import collection from "./designer/collection";
// import world from "./designer/world";

// // - Tests
// import test from "./tests/test";

let models = {
  // - Organizer
  todo,
  contact,
  comics,
  restaurant,
  winecellar,
  winetasting,

  // - Music
  artist: artist,
  album: album,
  track: track,

  // // - Designer
  // world,
  // object,
  // field,
  // group,
  // collection,

  // - Tests
  // test: test,
};

export default models;

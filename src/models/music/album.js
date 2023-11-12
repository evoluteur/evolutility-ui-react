/*
  Evolutility UI model for Albums
  https://github.com/evoluteur/evolutility-ui-react
*/

const modelAlbum = {
  id: "album",
  qid: "music_album",
  title: "Albums",
  world: "music",
  name: "album",
  namePlural: "albums",
  icon: "cd.png",
  defaultViewMany: "cards",
  titleField: "title",
  fields: [
    {
      id: "title",
      type: "text",
      label: "Title",
      required: true,
      inMany: true,
      inSearch: true,
      width: 62,
    },
    {
      id: "artist",
      type: "lov",
      label: "Artist",
      object: "artist",
      aggregate: "albums_aggregate",
      required: true,
      inMany: true,
      width: 38,
    },
    {
      id: "url",
      type: "url",
      label: "Amazon",
      width: 62,
    },
    {
      id: "length",
      type: "text",
      label: "Length",
      inMany: true,
      width: 38,
    },
    {
      id: "description",
      type: "textmultiline",
      label: "Description",
      maxLength: 1000,
      inMany: false,
      inSearch: true,
      width: 100,
      height: 8,
    },
    {
      id: "cover",
      type: "image",
      label: "Cover",
      inMany: true,
      width: 100,
    },
  ],
  groups: [
    {
      id: "p-album",
      type: "panel",
      label: "Album",
      width: 70,
      fields: ["title", "artist", "url", "length", "description"],
    },
    {
      id: "p-cover",
      type: "panel",
      label: "Cover",
      width: 30,
      fields: ["cover"],
    },
  ],
  collections: [
    {
      id: "tracks",
      title: "Tracks",
      object: "track",
      column: "album_id",
      order: "name",
      icon: "music.png",
      fields: ["name", "genre", "length"],
    },
  ],
};

export default modelAlbum;

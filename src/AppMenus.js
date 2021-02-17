
module.exports = [
    {
        id: 'organizer',
        title: 'Organizer',
        icon: 'briefcase',
        menus: [
            {qid: 1, id: "todo", text: "To-Do List", icon: "todo.gif"},
            {qid: 2, id: "contact", text: "Address Book", icon: "contact.gif"},
            {qid: 4, id: "restaurant", text: "Restaurants", icon: "resto.gif"},
            {qid: 3, id: "comics", text: "Graphic novels", icon: "comics.png", defaultViewMany: 'cards'},
            {qid: 5, id: "winecellar", text: "Wine Cellar", icon: "wine-bottle.png", defaultViewMany: 'cards'},
            {qid: 6, id: "winetasting", text: "Wine Tasting", icon: "wine.gif"},
        ],
    },
    {
        id: 'music',
        title: 'Music',
        icon: 'music',
        menus: [
            {qid: 8, id: "artist", text: "Artists", icon: "star.png", defaultViewMany: 'cards'},
            {qid: 7, id: "album", text: "Albums", icon: "cd.png", defaultViewMany: 'cards'},
            {qid: 9, id: "track", text: "Tracks", icon: "music.png"},
        ],
    },/*
    {
        id: 'test',
        title: 'Test',
        icon: 'water',
        menus: [
            {id: 'test', text: 'Tests', defaultViewMany: 'cards'},
        ],
    },*/
    /*{
        id: 'designer',
        title: 'Designer',
        icon: 'cogs',
        menus: [
            {id: 'world', text: 'Apps', icon: 'designer/world.png'},
            {id: 'object', text: 'Objects', icon: 'designer/object.png'},
            {id: 'field', text: 'Fields', icon: 'designer/field.png'},
            {id: 'group', text: 'Field Groups', icon: "designer/group.png"},
            {id: 'collection', text: 'Collections', icon: "designer/collection.png"},
            //{id: 'test', text: 'Test', icon: "car.png", defaultViewMany: 'cards'}, 
        ],
    },*/
];

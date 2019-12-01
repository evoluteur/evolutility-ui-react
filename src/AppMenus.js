
module.exports = [
    {
        id: 'organizer',
        title: 'Organizer',
        icon: 'leaf',
        menus: [
            {id: 'contact', text: 'Address book'},
            {id: 'todo', text: 'Tasks'},
            {id: 'restaurant', text: 'Restaurants'},
            {id: 'winecellar', text: 'Wine cellar', defaultViewMany: 'cards'},
            {id: 'winetasting', text: 'Wine tastings'},
            {id: 'comics', text: 'Graphic novels', defaultViewMany: 'cards'},
        ],
    },
    {
        id: 'music',
        title: 'Music',
        icon: 'music',
        menus: [
            {id: 'artist', text: 'Artists', defaultViewMany: 'cards'},
            {id: 'album', text: 'Albums', defaultViewMany: 'cards'},
            {id: 'track', text: 'Tracks'},
        ],
    },
    {
        id: 'test',
        title: 'Test',
        icon: 'tint',
        menus: [
            {id: 'test', text: 'Tests', defaultViewMany: 'cards'},
        ],
    },/*
    {
        id: 'designer',
        title: 'Designer',
        icon: 'cog',
        menus: [
            {id: 'world', text: 'Worlds'},
            {id: 'object', text: 'Objects'},
            {id: 'field', text: 'Fields'}, 
            {id: 'test', text: 'Test', defaultViewMany: 'cards'}, 
        ],
    },*/
];

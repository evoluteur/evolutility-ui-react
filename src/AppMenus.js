
module.exports = [
    {
        id: 'pim',
        title: 'Personal Information Manager',
        icon: 'leaf',
        menus: [
            {id: 'contact', text: 'Address book'},
            {id: 'todo', text: 'Tasks'},
            {id: 'restaurant', text: 'Restaurants'},
            {id: 'winecellar', url1:'winecellar/cards', text: 'Wine cellar'},
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

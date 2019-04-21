
module.exports = [
    {
        id: 'demos',
        title: 'Demo Apps',
        icon: 'fire',
        menus: [
            {id: 'contact', text: 'Contact'},
            {id: 'todo', text: 'To Do'},
            {id: 'comics', text: 'Comics', defaultViewMany: 'cards'},
            {id: 'restaurant', text: 'Restaurants'},
            {id: 'winecellar', text: 'Wine Cellar'},
            {id: 'winetasting', text: 'Wine Tasting'},
        ],
    },
    {
        id: 'music',
        title: 'Another demo',
        icon: 'music',
        menus: [
            {id: 'artist', text: 'Artists', defaultViewMany: 'cards'},
            {id: 'album', text: 'Albums', defaultViewMany: 'cards'},
            {id: 'track', text: 'Tracks'},
        ],
    },
];

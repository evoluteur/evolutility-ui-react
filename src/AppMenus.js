
module.exports = [
    {
        id: 'demos',
        title: 'Demo Apps',
        icon: 'fire',
        menus: [
            {id: 'contact', text: 'Addressbook'},
            {id: 'todo', text: 'Tasks'},
            {id: 'restaurant', text: 'Restaurants'},
            {id: 'winecellar', text: 'Wine Cellar'},
            {id: 'winetasting', text: 'Wine Tasting'},
            {id: 'comics', text: 'Graphic Novels', defaultViewMany: 'cards'},
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

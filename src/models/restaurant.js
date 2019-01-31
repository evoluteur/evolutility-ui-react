var lov_cuisines = [
    {id: 1, text: 'French'},
    {id: 2, text: 'Vietnamese'},
    {id: 3, text: 'Chinese'},
    {id: 4, text: 'Fusion'},
    {id: 5, text: 'Japanese'},
    {id: 6, text: 'Thai'},
    {id: 7, text: 'Mexican'},
    {id: 8, text: 'Mediterranean'},
    {id: 9, text: 'American'},
    {id: 10, text: 'Indian'},
    {id: 11, text: 'Korean'},
    {id: 12, text: 'Italian'},
    {id: 13, text: 'Spanish'}, 
    {id: 14, text: 'Others'}, 
];
var lov_prices = [
    {id: 1, text: '$'},
    {id: 2, text: '$$'},
    {id: 3, text: '$$$'},
    {id: 4, text: '$$$$'},
    {id: 5, text: '$$$$$'},
];

module.exports = {
    
    id: 'restaurant',
    active: true,
    table: 'restaurant',
    label: 'Restaurants',
    icon: 'resto.gif',
    name: 'restaurant', 
    namePlural: 'restaurants',

    fields:[
        {
            type: 'text', id: 'name',
            label: 'Name',
            required: true, width: 62, inMany: true
        }, 
        {
            type: 'lov', id: 'cuisine',
            column: 'cuisine_id',
             label: 'Cuisine', width: 38,
             list: lov_cuisines,
             lovtable: 'restaurant_cuisine',
            inMany: true
        },
        {
            type: 'text', id: 'schedule',
             label: 'Schedule', maxLength: 1000, width: 62, height: 3
        },
        {
            type: 'lov', id: 'price',
            column: 'price_id',
             label: 'Price', width: 38,
             list: lov_prices,
             lovtable: 'restaurant_price',
            inMany: true
        },
        {
            type: 'textmultiline', id: 'favorite',
             label: 'Favorite dish', maxLength: 2000, width: 100, height: 3
        },
        {
            type: 'textmultiline', id: 'notes',
             label: 'Notes', maxLength: 2000, width: 100, height: 6
        },
 
        {
            type: 'text', id: 'phone',
             label: 'Phone', maxLength: 20, width: 50, mini:'1'
        },
        {
            type: 'url', id: 'web',
             label: 'web', width: 100
        },
        {
            type: 'url', id: 'yelp',
             label: 'yelp', width: 100, 
        },
        {
            type: 'textmultiline', id: 'address',
             label: 'Address', maxLength: 150, width: 100,
             height: 2
        },
        {
            type: 'text', id: 'city',
             label: 'City', maxLength: 100, width: 62,
            inMany: true
        },
        {
            type: 'text', id: 'state',
             label: 'State', width: 23
        },
        {
            type: 'text', id: 'zip',
             label: 'Zip', maxLength: 12, width: 15
        },
    ],

    groups: [
        {
          id:"pResto", type:"panel", 
          label: "Restaurant", width: 62,
          fields: ['name','cuisine','schedule','price','favorite','notes']
        },
        {
          id:"pContact", type:"panel", 
          label: "Contact", width: 38,
          fields: ['phone','web','yelp','address','city','state','zip',]
        },
    ]

}


module.exports = {
    id: 'comics',
    label: 'Graphic novels',
    name: 'serie',
    namePlural: 'series',
    icon: 'comics.png',
    titleField: 'title',
    searchFields: ['title', 'authors', 'notes'],

    fields:[
        {
            id: 'title', type: 'text', label: 'Title', required: true, 
            maxLength: 255,
            width: 100, inMany: true
        },
        {
            id: 'authors', type: 'text', width: 62, inMany: true,
            label: 'Authors'
        },
        {
            id: 'genre', type: 'lov', label: 'Genre', 
            width: 38, inMany: true,
            list: [
            {id: 1, text: 'Adventure'},
            {id: 3, text: 'Erotic'},
            {id: 2, text: 'Fairy tale'},
            {id: 4, text: 'Fantastic'},
            {id: 14, text: 'Graphic novel'},
            {id: 5, text: 'Heroic Fantasy'},
            {id: 6, text: 'Historic'},
            {id: 7, text: 'Humor'},
            {id: 8, text: 'One of a kind'},
            {id: 11, text: 'Science-fiction'},
            {id: 12, text: 'Super Heros'},
            {id: 10, text: 'Thriller'},
            {id: 13, text: 'Western'},
            {id: 9, text: 'Youth'},
            ]
        },
        {
            id: 'serie_nb', type: 'integer', 
            width: 15, 
            inMany: true,
            label: 'Albums', noCharts: true 
        },
        {
            id: 'have_nb', type: 'integer', 
            width: 15, inMany: true,
            label: 'Owned', noCharts: true 
        },
        {
            id: 'have', type: 'text', 
            width: 15, inMany: false,
            label: 'Have' 
        },
        {
            id: 'language', type: 'lov', label: 'Language', 
            width: 17, inMany: true,
            lovIcon: true,
            list: [
                {id: 2, text: 'French', icon:'comics/flags/fr.png'},
                {id: 1, text: 'American', icon:'comics/flags/us.png'}
            ]
        },
        {
            id: 'complete', type: 'boolean', 
            width: 19, inMany: false,
            label: 'Complete'
        },
        {
            id: 'finished', type: 'boolean', 
            width: 19, inMany: false,
            label: 'Finished'
        },
		{
			"id": "url_bdfugue",
			"type": "url",
			"width": 62,
			"label": "BDFugue",
		},
		{
			"id": "url_amazon",
			"type": "url",
			"width": 38,
			"label": "Amazon",
		},
        {
            id: 'notes', type: 'textmultiline', 
            label: 'Notes', maxLength: 1000,
            width: 100, height: 7, inMany: false
        },
        {
            id: 'pix', type: 'image', 
            width: 30, inMany: true,
            label: 'Cover'
        },
    ],

    groups: [
        { 
            id:'serie', type: 'panel', label: 'Serie', width: 70,
            fields: ['title', 'authors', 'genre', 
                'serie_nb', 'have_nb', 'have', 
                'language', 'complete', 'finished', 'url_bdfugue', 'url_amazon', 'notes']
        },
        { 
            id:'pix', type: 'panel', label: 'Album Cover', width: 30,
            fields: ['pix']
        }
    ]
}
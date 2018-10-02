var lov_categories = [
    {id: '1', text: 'Work'},
    {id: '2', text: 'Fun'},
    {id: '3', text: 'Travel'},
    {id: '4', text: 'Business'},
    {id: '5', text: 'Cars'},
    {id: '6', text: 'Sport'},
    {id: '7', text: 'Misc.'}
];

module.exports = {
    id: 'contact',
    label: 'Address Book',
    icon: 'contact.gif',
    name: 'contact', namePlural: 'contacts',
    titleField: function(data){
        var title = ''
        if(data.firstname){
            title += data.firstname+' ';
        }
        if(data.lastname){
            title += data.lastname;
        }
        return title || 'N/A';
    },
    searchFields: ['lastname', 'firstname', 'jobtitle', 'company'],

    fields:[
        {
            type: 'text', id: 'lastname',
            label: 'Lastname', maxLength: 50,
            required: true, width: 62, inMany: true
        },
        {
            type: 'text', id: 'firstname',
             label: 'Firstname', maxLength: 50,
            required: true, width: 38, inMany: true
        },
        {
            type: 'text', id: 'jobtitle',
             label: 'Title', maxLength: 50,
            width: 62
        },
        {
            type: 'text', id: 'company',
             label: 'Company', maxLength: 50,
            width: 38, inMany: true
        },
        {
            type: 'email', id: 'email',
             label: 'email', maxLength: 255,
            width: 100 
        },
        {
            type: 'url', id: 'web',
             label: 'web', maxLength: 255, width: 100
        },
        {
            type: 'lov', id: 'category',
             label: 'Category', width: 100,
             list: lov_categories,
            inMany: true
        },
        {
            type: 'text', id: 'phone',
             label: 'Work Phone', maxLength: 20, width: 100, mini:'1'
        },
        {
            type: 'text', id: 'phonehome',
             label: 'Home Phone', maxLength: 20, width: 100
        },
        {
            type: 'text', id: 'phonecell',
             label: 'Cell.', maxLength: 20, width: 100, mini:'1'
        },
        {
            type: 'text', id: 'fax', 
             label: 'Fax', maxLength: 20, width: 100
        },
        {
            type: 'textmultiline', id: 'address',
             label: 'Address', width: 100, height: 3
        },
        {
            type: 'text', id: 'city',
             label: 'City', maxLength: 100, width: 62
        },
        {
            type: 'text', id: 'state',
             label: 'State', width: 23
        },
        {
            type: 'text', id: 'zip',
             label: 'Zip', maxLength: 12, width: 15
        },
        {
            type: 'text', id: 'country',
             label: 'Country', maxLength: 60, width: 100
        },
        {
            type: 'textmultiline', id: 'notes',
             label: 'Notes', maxLength: 1000, width: 100, height: 6
        }
    ],

    groups: [
        {
            type: 'panel', label: 'Identity', width: 62,
            fields: ['lastname', 'firstname', 'jobtitle', 'company', 'email', 'web']
        },
        {
            type: 'panel', label: 'Contact Info', width: 38,
            fields: ['phone', 'phonehome', 'phonecell', 'fax']
        },
        {
            type: 'panel', label: 'Address', width: 62,
            fields: ['address', 'city', 'state', 'zip', 'country']
        },
        {
            type: 'panel', label: 'Misc.', width: 38,
            fields: ['category','notes']
        }
    ]
}


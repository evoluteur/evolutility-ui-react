# React-Evolutility

React-Evolutility provides a set of React Views to display and interact with objects of different data structures. These views work together to provide full web apps. With it you can quickly make web applications by configuring views with metadata instead of hand-coding Javascript, CSS, and HTML.

React-Evolutility works hand-in-hand with [Evolutility-Server](https://github.com/evoluteur/evolutility-server) which provides a matching RESTful API based on the same metadata.

This project is a **work in progress**. I'm still learning React.


## Models

For each application, several views will be generated form a single model. 
Models describe the object and its list of fields.

### Entity

| Property     | Meaning                                 |
|--------------|-----------------------------------------|
| id           | Unique key to identify the entity (used as API parameter). |
| name   | Object name (singular).  |
| namePlural   | Object name (plural).  |
| fields       | Array of fields.                        |
| groups       | Array of groups. If not provided a single group will be used.   |
| titleField    | Field id for the column value used as record title. titleField can also be a function. |      


### Field

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the field (can be the same as column but doesn't have to be). |
| type         | Field type to show in the UI. Possible field types: <ul><li>boolean (yes/no)</li><li>date</li><li>datetime</li><li>decimal</li><li>document</li><li>email</li><li>image</li><li>integer</li><li>lov (list of values)</li><li>money</li><li>text</li><li>textmultiline</li><li>time</li><li>url</li></ul> |
| required     | Determines if the field is required for saving.      |
| readonly     | If set to true, the field value cannot be changed.          |       
| defaultValue | Default field value for new records.          |                   
| inMany       | Determines if the field is present (by default) in lists of records. |                     
| height        | For fields of type "textmultiline", number of lines used in the field (in Browse and Edit views). |                 
| width        | Percentage width in Browse and Edit views. |
| help         | Optional help on the field. |
| noCharts     | Prevent the field to have a charts (most fields are prevented based on thier type already). |

### Group

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the group. It is optional.            |
| type         | Only "panel" is currently supported ("tab" is next).  |
| label        | Group title as displayed to the user.      |
| fields       | Array of field ids.                   |


### Sample model

Here is a model for a To-Do app.

```javascript
module.exports = {
    id: 'todo',
    table: 'task',
    titleField: 'title',
    fields: [
        {
            id: 'title', type: 'text', 
            label: 'Title', required: true,
            maxLength: 300,
            inMany: true
        },
        {
            id: 'duedate', type: 'date', 
            label: 'Due Date', inMany: true
        },
        {
            id: 'category', type: 'lov', 
            label: 'Category', inMany: true
        },
        {
            id: 'priority', type: 'lov', 
            label: 'Priority', required: true,
            inMany: true
        },
        {
            id: 'complete', type: 'boolean',
            label: 'Complete', inMany: true
        },
        {
            id: 'description', type: 'textmultiline', 
            label: 'Description', inMany: false,
            maxLength: 1000,
            height: 5        
        }
    ],

	 groups: [
	    {
	    	type:'panel', 
	    	label: 'Task', 
	    	width: 62,
	      	fields: ['title', 'duedate', 'category']
	    },
	    {
	    	type:'panel',
	    	label: 'Status', 
	    	width: 38,
	      	fields: ['priority', 'complete']
	    },
	    {
	    	type:'panel', 
	    	label: 'Task Description', 
	    	width: 100,
	      	fields: ['description']
	    }
	]
  
};

```

## License

Copyright (c) 2016 Olivier Giulieri.

React-Evolutility.js is released under the [MIT license](http://github.com/evoluteur/react-evolutility/raw/master/LICENSE.md).

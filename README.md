# React-Evolutility

React-Evolutility provides a set of React Views to display and interact with objects of different data structures. These views work together to provide full web apps. 

With React-Evolutility you can quickly make a web application UI by configuring views with metadata instead of hand-coding Javascript, CSS, and HTML.

React-Evolutility works hand-in-hand with [Evolutility-Server](https://github.com/evoluteur/evolutility-server) which provides a matching RESTful API based on the same metadata.

This project is a **work in progress**. I'm still learning React.



## Installation

[**Download**](https://github.com/evoluteur/react-evolutility/archive/master.zip) or **clone** from GitHub.

```bash
# To get the latest stable version, use git from the command line.
git clone https://github.com/evoluteur/react-evolutility
```

In the React-Evolutility directory, use the command line to type the following:

```bash
# Install dependencies
npm install

# Run the node.js server
npm start

```

In a web browser, go to the url [http://localhost:8080/](http://localhost:8080/).


## Views

For any object, a single model defines UI elements across views in a simple declarative way.

React-Evolutility provides 2 types of view:

* Views for a model: [Browse](#browse), [Edit](#edit).
* Views for a collection: [List](#list), [Cards](#cards), [Charts](#charts).

Notes: Views for actions will come later.

A large part of the API (methods, options and events) is common to all views. Some views have additional API.

## Views for One object
### Browse
Shows all fields for viewing (read only). Fields are grouped in panels.

![Browse](https://raw.githubusercontent.com/evoluteur/react-evolutility/master/doc/screenshots/one-browse.gif)

Code: [/js/views/one/Browse.js](https://github.com/evoluteur/react-evolutility/blob/master/js/views/one/Browse.js)

### Edit
This view shows all fields for edition to create or update records.
It automatically performs validation based on the model.
Fields are grouped in panels and tabs.

![Edit](https://raw.githubusercontent.com/evoluteur/react-evolutility/master/doc/screenshots/one-edit.gif)

Code: [/js/views/one/Edit.js](https://github.com/evoluteur/react-evolutility/blob/master/js/views/one/Edit.js)


## Views for Many objects
### List
Gives a tabular view of a collection.

![List](https://raw.githubusercontent.com/evoluteur/react-evolutility/master/doc/screenshots/many-list.gif)

Code: [/js/views/many/List.js](https://github.com/evoluteur/react-evolutility/blob/master/js/views/many/List.js)

### Cards
Shows records side by side as cards.

![Cards](https://raw.githubusercontent.com/evoluteur/react-evolutility/master/doc/screenshots/many-cards.gif)

Code: [/js/views/many/Cards.js](https://github.com/evoluteur/react-evolutility/blob/master/js/views/many/Cards.js)

### Charts
Draws charts about the collection.

![Charts](https://raw.githubusercontent.com/evoluteur/react-evolutility/master/doc/screenshots/many-charts.gif)

Code: [/js/views/many/Charts.js](https://github.com/evoluteur/react-evolutility/blob/master/js/views/many/Charts.js)




## Models

For each application, several views will be generated form a single model. 
Models describe the object and its list of fields.

### Entity

| Property     | Meaning                                 |
|--------------|-----------------------------------------|
| id           | Unique key to identify the entity (used as API parameter). |    
| icon         | Icon file name for the entity (example: "cube.gif". |  
| name         | Object name (singular).    |
| namePlural   | Object name (plural).      |
| title        | Application name.          |
| fields       | Array of fields.           |
| groups       | Array of groups. If not provided a single group will be used.   |
| titleField   | Field id for the column value used as record title. titleField can also be a function. | 

### Field

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the field (can be the same as column but doesn't have to be). |
| type         | Field type to show in the UI. Possible field types: <ul><li>boolean (yes/no)</li><li>date</li><li>datetime</li><li>decimal</li><li>document</li><li>email</li><li>image</li><li>integer</li><li>lov (list of values)</li><li>money</li><li>text</li><li>textmultiline</li><li>time</li><li>url</li></ul> |
| required     | Determines if the field is required for saving.      |
| readonly     | If set to true, the field value cannot be changed.   |       
| defaultValue | Default field value for new records.                 |                   
| inMany       | Determines if the field is present (by default) in lists of records. |                     
| height        | For fields of type "textmultiline", number of lines used in the field (in Browse and Edit views). |                 
| width        | Percentage width in Browse and Edit views. |
| help         | Optional help on the field. |
| noCharts     | Prevent the field to have a charts (most fields are prevented based on thier type already). |

### Group

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the group. It is optional.            |
| type         | Only "panel" is currently supported ("tab" is next). |
| label        | Group title as displayed to the user.      |
| fields       | Array of field ids.                        |


### Sample model

The following example is a graphic novels collection app. The classic To-Do app is [also included](https://github.com/evoluteur/react-evolutility/blob/master/js/models/todo.js) in the demo. 

```javascript
module.exports = {
    id: 'comics',
    label: 'Graphic Novels',
    name: 'graphic novel serie',
    namePlural: 'graphic novel series',
    icon: 'comics.png',
    titleField: 'title',
    searchFields: ['title', 'authors', 'notes']

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
            {id: 2, text: 'Fairy tale'},
            {id: 3, text: 'Erotic'},
            {id: 4, text: 'Fantastic'},
            {id: 5, text: 'Heroic Fantasy'},
            {id: 6, text: 'Historic'},
            {id: 7, text: 'Humor'},
            {id: 8, text: 'One of a kind'},
            {id: 9, text: 'Youth'},
            {id: 10, text: 'Thriller'},
            {id: 11, text: 'Science-fiction'},
            {id: 12, text: 'Super Heros'},
            {id: 13, text: 'Western'} 
          ]
      },
      {
          id: 'serie_nb', type: 'integer', 
          width: 15, inMany: false,
          label: 'Albums', noCharts: true 
      },
      {
          id: 'have_nb', type: 'integer', 
          width: 15, inMany: false,
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
          lovicon: true,
          list: [
            {id: 2, text: 'French', icon:'flag_fr.gif'},
            {id: 1, text: 'American', icon:'flag_us.gif'}
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
          id: 'pix', type: 'image', 
          width: 30, inMany: true,
          label: 'Cover'
      },
      {
          id: 'notes', type: 'textmultiline', 
          label: 'Notes', maxLength: 1000,
          width: 70, height: 7, inMany: false
      }
  ],

  groups: [
        { 
          id:'serie', type: 'panel', label: 'Serie', width: 70,
          fields: ['title', 'authors', 'genre', 
                'serie_nb', 'have_nb', 'have', 
                'language', 'complete', 'finished', 'notes']
        },
        { 
          id:'pix', type: 'panel', label: 'Album Cover', width: 30,
          fields: ['pix']
        }
  ]
}


```

## License

Copyright (c) 2016 Olivier Giulieri.

React-Evolutility.js is released under the [MIT license](http://github.com/evoluteur/react-evolutility/raw/master/LICENSE.md).

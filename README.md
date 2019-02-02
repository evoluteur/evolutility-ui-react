# Evolutility-UI-React

Evolutility-UI-React is a set of **model-driven views** to Browse, Edit, List, Cards, and Charts data by writing models rather than code. 

## Installation

[**Download**](https://github.com/evoluteur/evolutility-ui-react/archive/master.zip) or **clone** from [GitHub](https://github.com/evoluteur/evolutility-ui-react/).

```bash
# To get the latest stable version, use git from the command line.
git clone https://github.com/evoluteur/evolutility-ui-react
```

In the Evolutility-UI-React directory, use the command line to type the following:

```bash
# Install dependencies
npm install

# Run the node.js server
npm start

```

In a web browser, go to the url [http://localhost:3000/](http://localhost:3000/).

For the REST endpoints, you also need to install and run [Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node) which provides the matching REST endpoints based on the same metadata.


## Views

For any object, a single model defines UI elements across views in a simple declarative way.

Evolutility-UI-React provides 2 types of view:

* Views for a model: [Browse](#browse), [Edit](#edit).
* Views for a collection: [List](#list), [Cards](#cards), [Charts](#charts), [Stats](#stats).

Notes: Views for actions will come later.

A large part of the API (methods, options and events) is common to all views. Some views have additional API.

## Views for One object
### Browse
Shows all fields for viewing (read only). Fields are grouped in panels.

![Browse](https://raw.githubusercontent.com/evoluteur/evolutility-ui-react/master/public/screenshots/comics/one-browse.gif)

Code: [/src/components/views/one/Browse.js](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/one/Browse.js)

### Edit
This view shows all fields for edition to create or update records.
It automatically performs validation based on the model.
Fields are grouped in panels and tabs.

![Edit](https://raw.githubusercontent.com/evoluteur/evolutility-ui-react/master/public/screenshots/comics/one-edit.gif)

Code: [/src/components/views/one/Edit.js](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/one/Edit.js)


## Views for Many objects
### List
Gives a tabular view of a collection.

![List](https://raw.githubusercontent.com/evoluteur/evolutility-ui-react/master/public/screenshots/comics/many-list.gif)

Code: [/src/components/views/many/List.js](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/List.js)

### Cards
Shows records side by side as cards.

![Cards](https://raw.githubusercontent.com/evoluteur/evolutility-ui-react/master/public/screenshots/comics/many-cards.gif)

Code: [/src/components/views/many/Cards.js](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/Cards.js)

### Charts
Draws charts about the collection (currently bars and pies).

![Charts](https://raw.githubusercontent.com/evoluteur/evolutility-ui-react/master/public/screenshots/comics/many-charts.gif)

Code: [/src/components/views/many/Charts.js](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/Charts.js)


### Stats
Display last update, number of updates in the last week, and for numeric fields the min, max, count, average.

![Stats](https://raw.githubusercontent.com/evoluteur/evolutility-ui-react/master/public/screenshots/comics/many-stats.gif)

Code: [/src/components/views/many/Stats.js](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/Stats.js)




## Models

For each application, all views can be generated from the model at run-time. 
Each model describe an object and its list of fields. A single model is used for all views (Browse, Edit, List, Cards...) of the object it describes.

### Object

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

Objects have fields.

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the field (can be the same as column but doesn't have to be). |
| type         | Field type to show in the UI. Possible field types: <ul><li>boolean (yes/no)</li><li>date</li><li>datetime</li><li>decimal</li><li>document</li><li>email</li><li>image</li><li>integer</li><li>lov (list of values)</li><li>money</li><li>text</li><li>textmultiline</li><li>time</li><li>url</li></ul> |
| required     | Determines if the field is required for saving.      |
| readonly     | If set to true, the field value cannot be changed.   |
| defaultValue | Default field value for new records.                 |
| max, min     | Maximum/Minimum value allowed (only applies to numeric fields).      |
| maxLength, minLength | Maximum/Minimum length allowed (only applies to text fields).      |
| lovicon      | Set to True to include icon with LOV items.    |
| object       | Model id for the object to link to (only for fields of "lov" type).     |
| inMany       | Determines if the field is present (by default) in lists of records. |
| height       | For fields of type "textmultiline", number of lines used in the field (in Browse and Edit views). |
| width        | Field width in Browse and Edit views (in percent of parent width). |
| help         | Optional help on the field. |
| noCharts     | Prevent the field to have a charts (only necessary for fields of type integer, decimal, money, boolean, list of values which are "chartable"). |
| unique       | Values must be unique (not implemented yet).   |

### Group

Groups are used to visually divide Fields (in Edit and Browse views).

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the group. It is optional.            |
| type         | Type of fields group. Only "panel" is currently supported (tab and other types of groups will be added later). |
| label        | Group title displayed in the group header.      |
| fields       | Array of field ids.       |
| width        | Width (in % of the container total width).        |

Note: Groups are optional. By default a single group holds all fields.

### Collection

Multiple details tables can be specified with "collections". 

| Property     | Meaning                               |
|--------------|---------------------------------------|
| id           | Unique key for the collection.        |
| title        | Collection title.                     |
| object       | Model.id for the Object to link to.   |
| fields       | Array of fields. Fields in collections do not need all properties of Fields in objects.    |

Sample model using collections: [Wine Cellar](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/winecellar.js).

### Sample model

The following example is the model for a simple graphic novels inventory app. 

```javascript
module.exports = {
    id: "comics",
    label: "Graphic Novels",
    name: "graphic novel serie",
    namePlural: "graphic novel series",
    icon: "comics.png",
    titleField: "title",
    searchFields: ["title", "authors", "notes"]

	fields:[
      {
          id: "title", type: "text", label: "Title", required: true, 
          maxLength: 255,
          width: 100, inMany: true
      },
      {
          id: "authors", type: "text", width: 62, inMany: true,
          label: "Authors"
      },
      {
          id: "genre", type: "lov", label: "Genre", 
          width: 38, inMany: true,
          list: [
            {id: 1, text: "Adventure"},
            {id: 2, text: "Fairy tale"},
            {id: 3, text: "Erotic"},
            {id: 4, text: "Fantastic"},
            {id: 5, text: "Heroic Fantasy"},
            {id: 6, text: "Historic"},
            {id: 7, text: "Humor"},
            {id: 8, text: "One of a kind"},
            {id: 9, text: "Youth"},
            {id: 10, text: "Thriller"},
            {id: 11, text: "Science-fiction"},
            {id: 12, text: "Super Heros"},
            {id: 13, text: "Western"} 
          ]
      },
      {
          id: "serie_nb", type: "integer", 
          width: 15, inMany: false,
          label: "Albums", noCharts: true 
      },
      {
          id: "have_nb", type: "integer", 
          width: 15, inMany: false,
          label: "Owned", noCharts: true 
      },
      {
          id: "have", type: "text", 
          width: 15, inMany: false,
          label: "Have" 
      },
      {
          id: "language", type: "lov", label: "Language", 
          width: 17, inMany: true,
          lovicon: true,
          list: [
            {id: 2, text: "French", icon:"flag_fr.gif"},
            {id: 1, text: "American", icon:"flag_us.gif"}
          ]
      },
      {
          id: "complete", type: "boolean", 
          width: 19, inMany: false,
          label: "Complete"
      },
      {
          id: "finished", type: "boolean", 
          width: 19, inMany: false,
          label: "Finished"
      },
      {
          id: "pix", type: "image", 
          width: 30, inMany: true,
          label: "Cover"
      },
      {
          id: "notes", type: "textmultiline", 
          label: "Notes", maxLength: 1000,
          width: 70, height: 7, inMany: false
      }
  ],

  groups: [
      { 
        id:"serie", type: "panel", label: "Serie", width: 70,
        fields: ["title", "authors", "genre", 
              "serie_nb", "have_nb", "have", 
              "language", "complete", "finished", "notes"]
      },
      { 
        id:"pix", type: "panel", label: "Album Cover", width: 30,
        fields: ["pix"]
      }
  ]
}


```

More sample models: [To-do list](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/todo.js),
[Address book](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/contact.js),
[Restaurants list](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/restaurant.js),
[Wine cellar](https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/winecellar.js). 


## Other implementations of Evolutility

[Evolutility-UI-jQuery](https://github.com/evoluteur/evolutility-ui-jquery) - Model-driven Web UI for CRUD using jQuery and Backbone (for REST or localStorage).

[Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node) - RESTful Micro-ORM for CRUD and more, written in Javascript, using Node.js, Express, and Postgres.

[Evolutility-ASP.net](https://github.com/evoluteur/evolutility-asp.net) - Lightweight CRUD framework for heavy lifting with ASP.net and Microsoft SQL-Server.

## License

Copyright (c) 2019 [Olivier Giulieri](https://evoluteur.github.io/).

Evolutility-UI-React is released under the [MIT license](http://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE.md).

To suggest a feature or report a bug: [https://github.com/evoluteur/evolutility-ui-react/issues](https://github.com/evoluteur/evolutility-ui-react/issues)


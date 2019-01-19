# Naxl-UI

This project is the user interface for Naxl.
It has been created as a fork of [Evolutility-UI-React](https://github.com/evoluteur/evolutility-ui-react/).
Naxl is a Personal Database Manager for no-coders. Not Another eXceL.

The aim is to produce a web-based tool that anyone can use to create and manage databases (sets of tables) for their own use.
The target user is someone with a degree of technical skill but no specific programming ability. 
Anyone who can create and edit an Excel spreadsheet should qualify.

The focus is on the ability to store and retrieve personally useful data from a variety of sources in a variety of relevant formats. 
It is not about transactional updates, detailed validation or multi-user access.

The technology used should be state of the art, hence the choice of JavaScript, React, Express, JSON and NoSQL.

## Installation

First download, install and start the [Naxl-Server](https://github.com/david-pfx/naxl-server) project, or there won't be much to see.

Then follow the instructions much as for Evolutility-UI-React. 
 - Download or clone the repo from GitHub.
 - `npm install` to install dependencies.
 - `npm start` to run the UI project from a local server.
  - Browse to [http://localhost:3002/](http://localhost:3002/) if it doesn't start automatically.

## Demonstration

The initial browser displays a menu of sample data files. It also shows the current locale, obtained from the browser. You may need to configure that.

The 'master table' contains an entry for every table, including itself. Editing this can break the system!

Create a new record in the master table and upload a CSV file by drag and drop into the 'source' field. The table will go live once the record is saved (currently the browser needs to be restarted). A sample file called 'member.csv' can be found in the 'test' directory.

## Modifications

 - API access refactored to use a single data layer.
 - Contains no models. All models are loaded from the server, and the app menu is generated dynamically.
 - Models can be viewed and edited as a 'table of tables'.
 - A new model can be created by drag and drop into the 'source' field of a new table.
 - Uses the NPM proxy feature to send API requests to the server.

## Todo

- Upload new database tables from XLS or JSON.
- Edit model (table, field and panel attributes).
- Edit table in list view.

## License

[MIT license](http://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE.md) for now.

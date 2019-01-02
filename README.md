# Evolutility-UI-React

This project is the user interface for a Personal Database Manager.
It has been created as a fork of [Evolutility-UI-React](https://github.com/evoluteur/evolutility-ui-react/).

The aim is to produce a web-based tool that anyone can use to create and manage databases (sets of tables) for their own use.
It should be based on state of the art technology, which currently means React, Express, JSON, JavaScript and NoSQL.

The target user is someone with a degree of technical skill but no specific programming ability. 
Anyone who can create and edit an Excel spreadsheet should qualify.

The focus is on the ability to store and retrieve useful data in a variety of relevant formats. 
It is not about transactional updates, detailed validation or multi-user access.

## Installation

First download, install and start the server project, or there won't be much to see.

Then follow the instructions much as for Evolutility-UI-React. 
 - Download or clone the repo from GitHub.
 - `npm install` to install dependencies.
 - `npm start` to run the UI project from a local server.
  - Browse to [http://localhost:3002/](http://localhost:3002/) if it doesn't start automatically.

## Modifications

 - API access refactored to use a single data layer.
 - Contains no models. All models are loaded from the server, and the app menu is generated dynamically.
 - Models can be viewed as a 'table of tables'.
 - Uses the NPM proxy feature to send API requests to the server.

## Todo

- Upload new database tables from CSV, XLS or JSON.
- Edit model (table, field and panel attributes).
- Edit table in list view.

## License

[MIT license](http://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE.md) for now.

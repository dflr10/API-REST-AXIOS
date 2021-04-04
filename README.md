# API-REST-AXIOS
small CRUD with fake REST-API and ajax requests using axios library, json-server and local database in .JSON format

## Installing
To start this small web application, the first thing to do is go to the axios library repository that you will find by clicking on this link: https://github.com/axios/axios
and then import it using jsDelivr CDN: `<script src =" https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js "> </script>`

Later you should have Node.js installed and using the command: `npm install -g json-server` you can install JSON Server

## Start JSON Server

`json-server --watch db.json`

Now if you go to http: // localhost: 3000 / languages / 1, you'll get

`{" id ": 1," nombre ":" Java "," tipo ":" Compiled "}`

## Run in VSC
Finanlly in Visual Studio Code, install Live Server extension, right click on crud_axios.html file and choose "open with live server" option.

'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const app = express();
const PORT = 3000;

const engDictionaryPath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');
const startLobbyPath = path.join(__dirname, '..', 'StartLobby');
const gameLobbyPath = path.join(__dirname, '..', 'GameLobby');

app.use(express.static(startLobbyPath));
app.use(express.static(gameLobbyPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(startLobbyPath, "StartLobby.html"));
});

app.get('/gameLobby', (req, res) => {
  res.sendFile(path.join(gameLobbyPath, 'GameLobby.html'));
});

app.get('/getdata', (req, res) => {
  fs.readFile(engDictionaryPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});


app.listen(PORT, ()=>{
  console.log('We track port ' + PORT);
});
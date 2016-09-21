const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const env = process.env;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());         // to support JSON-encoded bodies

app.use(express.static('public'));

// --- Routes --- //

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/views/index.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

app.get('/hey', (req, res) => {
  res.send('Hey!');
});

app.get('/data', (req, res) => {
  res.json({ data: 'Hello Marcus!', color: 'green'});
});

// for rhcloud
app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

// --- Web server --- //

app.listen(env.NODE_PORT || 8888, env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});


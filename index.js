const express = require('express');
const app = express();
const bot = require('./bot');

app.all('/', async (req, res) => {
  console.log(req.query.url);
  const html = await bot(req.query.url);
  res.send(html);
});
app.all('*', async (req, res) => {
  res.send('hello');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

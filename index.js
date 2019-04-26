const express = require('express');
const app = express();
const {getHTML, runBrowser} = require('./bot');

runBrowser().then(
  () => {
    app.listen(3000, function () {
      console.log('App listening on port 3000!');
    })
  },
  (err) => {
    console.log(err)
  }
);

app.all('/', async (req, res) => {
  console.log(req.query.url);
  const html = await getHTML(req.query.url);
  res.send(html);
});
app.all('*', async (req, res) => {
  res.send('hello');
});


const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const staticFIle = path.join(__dirname, '../dist', 'index.html');

const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};

app.use(express.static(staticFIle));

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
  res.sendFile(staticFIle);
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
  console.log(process.env.NODE_ENV);
});

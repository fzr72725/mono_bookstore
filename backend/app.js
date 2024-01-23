import express from 'express';
import {router as pythonDataProcessorRouter} from './routers/pythonDataProcessor.js';
import {router as booksRouter} from './routers/books.js';

const app = express();

app.use(pythonDataProcessorRouter);

app.use(booksRouter);

app.listen(3001, () => {
  console.log('App listening on port 3001');
});

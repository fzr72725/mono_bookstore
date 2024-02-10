import express from 'express';
import {router as pythonDataProcessorRouter} from './routers/pythonDataProcessor.js';
import {router as booksRouter} from './routers/books.js';
import {router as downloadsRouter} from './routers/downloads.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(pythonDataProcessorRouter);

app.use(booksRouter);

app.use(downloadsRouter);

app.listen(3001, () => {
  console.log('App listening on port 3001');
});

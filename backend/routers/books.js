import express from 'express';
import * as booksJson from '../resources/books.json' assert { type: "json" };

const router = express.Router();

router.get('/api/v1/books', (req, res) => {
  //console.log('ZZZZZ get all books');
  res.json(booksJson);
})

export {router};
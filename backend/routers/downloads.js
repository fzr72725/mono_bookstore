import express from 'express';
import {Storage} from '@google-cloud/storage';

const router = express.Router();
const GCS_CLIENT = new Storage();

export const getDataFetcherFile = async (bucketName, integrationId, companyId, fileName) => {
  // use bucketName, integrationId/companyId to get all runIds
  const bucket = GCS_CLIENT.bucket(bucketName);
  const pathPrefix = `${integrationId}/${companyId}/`;
  const allPaths = [];
  let a = 1;
  const getFilesResponse = await bucket.getFiles({
    prefix: pathPrefix,
  });
  getFilesResponse[0].forEach(f => {
    allPaths.push(f.name);
  })
  const runIds = allPaths.map((f) => +f.split('/').splice(-2)[0]);
  const sorted = runIds.reverse().sort((a, b) => b - a);
  // then get the latest runId
  const latestRunId = sorted[0];
  //console.log(`ZZZZZ latestRunId ${JSON.stringify(latestRunId)}`);
  const filePath = `${pathPrefix}${latestRunId}/${fileName}`;
//   const fileContent = GCS_CLIENT.bucket(bucketName).file(filePath, {})
//     .download();
//   return fileContent;
  return filePath;
};

export const Cache = new Map();

// testAPI
// router.get('/api/v1/downloadGCSFile', async (req, res) => {
//   // test url:
//   // http://localhost:3001/api/v1/downloadGCSFile?integrationId=capTable1&companyId=company1&fileName=paveSchema.json
//   console.log('ZZZZZ downloadGCSFile API');
//   const integrationId = req.query.integrationId;
//   const companyId = req.query.companyId;
//   const fileName = req.query.fileName;
//   const fileData= await getDataFetcherFile(
//     'zeestache',
//      integrationId,
//      companyId,
//      fileName,)
//   const json = JSON.parse(fileData[0].toString('utf-8'));
//   res.json(json);
// });

export {router};
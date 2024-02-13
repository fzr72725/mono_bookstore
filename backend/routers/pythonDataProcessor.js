import express from 'express';
import { getDataFetcherFile, Cache } from './downloads.js';
import * as child from 'child_process';

const router = express.Router();
router.get('/api/v1/previewDataFrame', async (req, res) => {
    //http://localhost:3001/api/v1/previewDataFrame?integrationId=capTable1&companyId=company1&fileName=paveSchema.json
    const integrationId = req.query.integrationId;
    const companyId = req.query.companyId;
    const fileName = req.query.fileName;
    const filePath= await getDataFetcherFile(
      'zeestache',
       integrationId,
       companyId,
       fileName,)
    Cache.set('currentPath', filePath);
    const execSync = child.execSync;
    // due to the length of param, I decided to pass the GCS path and let python script do the download
    const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/preview_df.py "${filePath}"`);
    const data = result;
    res.json(String.fromCharCode(...data));
})

router.get('/api/v1/listAllTableFields', (req, res) => {
    const execSync = child.execSync;
    console.log(`ZZZZZ Cache.get('currentPath') ${Cache.get('currentPath')}`)
    if (Cache.has('currentPath')) {
        const filePath = Cache.get('currentPath');
        const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/list_all_table_fields.py "${filePath}"`);
        const data = result;
        res.json(String.fromCharCode(...data));
    } else {
        res.json("");
    };
    
})

router.get('/api/v1/explodeTableField', (req, res) => {
    const execSync = child.execSync;
    // TODO: give error message box if fields don't exist
    const tableFieldName = req.query.tableFieldName;
    const idFields = req.query.idFields;
    if (Cache.has('currentPath')) {
        const filePath = Cache.get('currentPath');
        const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/explode_df.py "${filePath}" "${tableFieldName}" "${idFields}"`);
        const data = result;
        res.json(String.fromCharCode(...data));
    } else {
        res.json("");
    };
})

router.get('/api/v1/freeFormQuery', (req, res) => {
    const execSync = child.execSync;
    const queryStr = req.query.queryStr;
    const idColumnNames = req.query.idColumnNames
    const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/free_form_condition.py "${queryStr}" "${idColumnNames}"`);
    const data = result;
    res.json(String.fromCharCode(...data));
})

export {router};

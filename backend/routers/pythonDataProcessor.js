import express from 'express';
import * as child from 'child_process';

const router = express.Router();

router.get('/api/v1/previewDataFrame', (req, res) => {
    const execSync = child.execSync;
    const result = execSync("/usr/local/Cellar/python@3.11/3.11.7_1/bin/python3 ./pythonScripts/preview_df.py");
    const data = result;
    res.json(String.fromCharCode(...data));
})

router.get('/api/v1/listAllTableFields', (req, res) => {
    const execSync = child.execSync;
    const result = execSync("/usr/local/Cellar/python@3.11/3.11.7_1/bin/python3 ./pythonScripts/list_all_table_fields.py");
    const data = result;
    res.json(String.fromCharCode(...data));
})

router.get('/api/v1/explodeTableField', (req, res) => {
    const execSync = child.execSync;
    const tableFieldName = req.query.tableFieldName;
    console.log(`ZZZZZ tableFieldName: ${tableFieldName}`);
    const idFields = req.query.idFields;
    console.log(`ZZZZZ idFields: ${idFields}`);
    const result = execSync(`/usr/local/Cellar/python@3.11/3.11.7_1/bin/python3 ./pythonScripts/explode_df.py "${tableFieldName}" "${idFields}"`);
    const data = result;
    res.json(String.fromCharCode(...data));
    
    console.log(`ZZZZZ done`);
})

export {router};

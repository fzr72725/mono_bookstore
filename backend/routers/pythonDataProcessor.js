import express from 'express';
import * as child from 'child_process';

const router = express.Router();
router.get('/api/v1/previewDataFrame', (req, res) => {
    const execSync = child.execSync;
    const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/preview_df.py`);
    const data = result;
    res.json(String.fromCharCode(...data));
})

router.get('/api/v1/listAllTableFields', (req, res) => {
    const execSync = child.execSync;
    const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/list_all_table_fields.py`);
    const data = result;
    res.json(String.fromCharCode(...data));
})

router.get('/api/v1/explodeTableField', (req, res) => {
    const execSync = child.execSync;
    // TODO: give error message box if fields don't exist
    const tableFieldName = req.query.tableFieldName;
    const idFields = req.query.idFields;
    const result = execSync(`python3 ${process.env.PYTHON_CODE_PATH}/explode_df.py "${tableFieldName}" "${idFields}"`);
    const data = result;
    res.json(String.fromCharCode(...data));
    
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

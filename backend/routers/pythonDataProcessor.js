import express from 'express';
import * as child from 'child_process';

const router = express.Router();

router.get('/api/v1/pythonTest', (req, res) => {
    const execSync = child.execSync;
    const result = execSync("/usr/local/Cellar/python@3.11/3.11.7_1/bin/python3 test1.py");
    console.log(result);
    const data = result;
    res.json(String.fromCharCode(...data));
    
    console.log(`ZZZZZ done`);
})

export {router};
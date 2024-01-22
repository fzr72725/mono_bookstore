const express = require('express');
const app = express();

app.get('/api/v1/pythonTest', (req, res) => {
  // use execSync to make sure the child process execute in a sync way
  // spawn is asyn
  // https://stackoverflow.com/questions/22337446/how-to-wait-for-a-child-process-to-finish-in-node-js
  const execSync = require("child_process").execSync;
  const result = execSync("/usr/local/Cellar/python@3.11/3.11.7_1/bin/python3 test1.py");
  console.log(result);
  const data = result;
  res.json(String.fromCharCode(...data));
  
//   pythonProcess.stdout.on('exit', (data) => {
//     // Do something with the data returned from python script
//     console.log(`ZZZZZ calling Python ${data}`);
//     res.json(String.fromCharCode(...data));
//   });
  console.log(`ZZZZZ done`);
});

app.get('/api/v1/:id', (req, res) => {
    const {id} = req.params;
    res.json(`test id ${id}`);
  });

// Call python
// router.get('/pythonTest', (req, res) => {
//   const spawn = require("child_process").spawn;
//   const pythonProcess = spawn('/usr/local/Cellar/jupyterlab/3.6.1/libexec/bin/python3.11',["test1.py"]);
//   pythonProcess.stdout.on('data', (data) => {
//     // Do something with the data returned from python script
//     console.log(`ZZZZZ calling Python ${data}`);
//     res.json(String.fromCharCode(...data));
//   });
// });

app.listen(3001, () => {
  console.log('App listening on port 3001');
});
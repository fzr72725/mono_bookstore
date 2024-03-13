//import logo from '../logo.svg';
import '../App.css';
import Books from './books'
import {GetData, GetTableFieldNames, ExplodeTableField, FreeFormQuery} from './pythonData'
import React, { useState, useEffect } from "react";

// interface SyntheticEvent<T> {
//   target: EventTarget & T;
// }

const GetComponents = () => {
  // preview
  const [integrationId, showIntegratinId] = useState('');
  const [companyId, showCompanyId] = useState('');
  const [fileName, showFileName] = useState('');
  const [showPythonData, setShowPythonData] = useState(false);

  const handleIntegrationIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    showIntegratinId(event.target.value);
  }

  const handleCompanyIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    showCompanyId(event.target.value);
  }

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    showFileName(event.target.value);
  }

  const handlePreviewDataClick = () => {
    setShowPythonData(true);
  }

  // freeform query on preview
  const [queryStr, setQueryStr] = useState('');
  const [showFreeFormQueryResult, setShowFreeFormQueryResult] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(`Free-form query is: ${queryStr}`);
    }, 10000); // wait for 10 secs for the typing to finish
    return () => clearTimeout(delayDebounceFn);
  }, [queryStr]);

  const handleQueryStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryStr(event.target.value);
  }

  const handleFreeFormQueryClick = () => {
    setShowFreeFormQueryResult(true);
  }

  // table fields list on preview
  const [showTableList, setShowTableList] = useState(false);

  const handleTableListClick = () => {
    setShowTableList(true);
  }

  // explode on preview
  const [tableFieldName, setTableFieldName] = useState('');
  const [idFields, setIdFields] = useState('');
  const [showExplodedTableData, setShowExplodedTableData] = useState(false);

  const handleTableFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableFieldName(event.target.value);
  }
  

  const handleIdFieldsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdFields(event.target.value);
  }

  const handleExplodedTableDataClick = () => {
    setShowExplodedTableData(true);
  }

  // freeform query on exploded
  const [queryStrExploded, setQueryStrExploded] = useState('');
  const [showFreeFormQueryExplodedResult, setShowFreeFormQueryExplodedResult] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(`Free-form query (on exploded df) is: ${queryStrExploded}`);
    }, 10000); // wait for 10 secs for the typing to finish
    return () => clearTimeout(delayDebounceFn);
  }, [queryStrExploded]);

  const handleFreeFormQueryExplodedClick = () => {
    setShowFreeFormQueryExplodedResult(true);
  }

  const handleQueryStrExplodedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryStrExploded(event.target.value);
  }

  // clear page
  const handleClearClick = () => {
    showIntegratinId('');
    showCompanyId('');
    showFileName('');
    setShowPythonData(false);
    setQueryStr('');
    setShowFreeFormQueryResult(false);

    setShowTableList(false);
    setTableFieldName('');

    setIdFields('');
    setShowExplodedTableData(false);
    setQueryStrExploded('');
    setShowFreeFormQueryExplodedResult(false);
    
  }

  return (
    <div>
      <button onClick={handleClearClick}>
        Clear Page
      </button>
      <p></p>
      <p></p>
      <label> IntegrationId: </label>
      <input
        type="text"
        id="integrationId"
        name="integrationId"
        onChange={handleIntegrationIdChange}
        value={integrationId}
        autoComplete="off"
      />
      <p></p>
      <label> CompanyId: </label>
      <input
        type="text"
        id="companyId"
        name="companyId"
        onChange={handleCompanyIdChange}
        value={companyId}
        autoComplete="off"
      />
      <p></p>
      <label> FileName: </label>
      <input
        type="text"
        id="fileName"
        name="fileName"
        onChange={handleFileNameChange}
        value={fileName}
        autoComplete="off"
      />
      <p></p>
      <button onClick={handlePreviewDataClick}>
        Preview Python Data
      </button>
      {showPythonData ? <GetData integrationId={integrationId} companyId={companyId} fileName={fileName}/> : <p></p>}
      <p></p>
      <label> Query: </label>
      <p></p>
      <label> (Example: df[df['email'] == 'john@gmail.com']) </label>
      <input
        type="text"
        id="queryStr"
        name="queryStr"
        onChange={handleQueryStrChange}
        value={queryStr}
        autoComplete="off"
      />
      <p></p>
      <button onClick={handleFreeFormQueryClick}>
        Get Query Result
      </button>
      {showFreeFormQueryResult ? <FreeFormQuery queryStr={queryStr} isExploded="false"/> : <p></p>}


      <button onClick={handleTableListClick}>
        Get Full List of Explodable Fields
      </button>
      <p></p>
      {showTableList ? <GetTableFieldNames /> : <p></p>}
      <p></p>



      <label> Table Name: </label>
      <input
        type="text"
        id="tableFieldName"
        name="tableFieldName"
        onChange={handleTableFieldNameChange}
        value={tableFieldName}
        autoComplete="off"
      />
      <p></p>
      <label> Submit Id Field List (sep by comma): </label>
      <input
        type="text"
        id="idFields"
        name="idFields"
        onChange={handleIdFieldsChange}
        value={idFields}
        autoComplete="off"
      />
      <p></p>
      <button onClick={handleExplodedTableDataClick}>
        Get Exploded Table Data
      </button>
      {showExplodedTableData ? <ExplodeTableField tableFieldName={tableFieldName} idFields={idFields}/> : <p></p>}
      <p></p>
      <label> Query Exploded Table Data: </label>
      <p></p>
      <label> (Example: df[df['email'] == 'john@gmail.com']) </label>
      <input
        type="text"
        id="queryStrExploded"
        name="queryStrExploded"
        onChange={handleQueryStrExplodedChange}
        value={queryStrExploded}
        autoComplete="off"
      />
      <p></p>
      <button onClick={handleFreeFormQueryExplodedClick}>
        Get Query Result
      </button>
      {showFreeFormQueryExplodedResult ? <FreeFormQuery queryStrExploded={queryStrExploded} isExploded="true"/> : <p></p>}
    </div>
  );
};


const App = () => {
  return (
    <div>
    <h1>MVP</h1>
    <GetComponents />
    </div>
  );
}


export default App;
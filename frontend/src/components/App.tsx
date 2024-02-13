//import logo from '../logo.svg';
import '../App.css';
import Books from './books'
import {GetData, GetTableFieldNames, ExplodeTableField, FreeFormQuery} from './pythonData'
import React, { useState } from "react";

// interface SyntheticEvent<T> {
//   target: EventTarget & T;
// }

const GetComponents = () => {
  const [showPythonData, setShowPythonData] = useState(false);
  const [integrationId, showIntegratinId] = useState('');
  const [companyId, showCompanyId] = useState('');
  const [fileName, showFileName] = useState('');
  const [showTableList, setShowTableList] = useState(false);
  const [tableFieldName, setTableFieldName] = useState('');
  const [idFields, setIdFields] = useState('');
  const [showExplodedTableData, setShowExplodedTableData] = useState(false);



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

  const handleTableListClick = () => {
    setShowTableList(true);
  }

  const handleTableFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableFieldName(event.target.value);
    //console.log('value is:', event.target.value);
  }

  const handleIdFieldsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdFields(event.target.value);
    //console.log('value is:', event.target.value);
  }

  const handleExplodedTableDataClick = () => {
    setShowExplodedTableData(true);
  }

  const handleClearClick = () => {
    showIntegratinId('');
    showCompanyId('');
    showFileName('');
    setShowPythonData(false);
    setShowTableList(false);
    setTableFieldName('');
    setIdFields('');
    setShowExplodedTableData(false);

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
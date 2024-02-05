//import logo from '../logo.svg';
import '../App.css';
import Books from './books'
import {GetData, GetTableFieldNames, ExplodeTableField, FreeFormQuery} from './pythonData'
import React, { useState } from "react";

// interface SyntheticEvent<T> {
//   target: EventTarget & T;
// }

const GetComponents = () => {
  const [showBookList, setShowBookList] = useState(false);
  const [showPythonData, setShowPythonData] = useState(false);
  const [showTableList, setShowTableList] = useState(false);
  const [tableFieldName, setTableFieldName] = useState('');
  const [idFields, setIdFields] = useState('');
  const [showExplodedTableData, setShowExplodedTableData] = useState(false);
  const [queryStr, setQueryStr] = useState('');
  const [idColumnNames, setIdColumnNames] = useState('');
  const [showFreeFormQueryResult, setShowFreeFormQueryResult] = useState(false);

  const handleGetBooksClick = () => {
    setShowBookList(true);
  }

  const handleTableListClick = () => {
    setShowTableList(true);
  }

  const handlePythonDataClick = () => {
    setShowPythonData(true);
  }

  const handleTableFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableFieldName(event.target.value);
    console.log('value is:', event.target.value);
  }

  const handleIdFieldsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdFields(event.target.value);
    console.log('value is:', event.target.value);
  }

  const handleExplodedTableDataClick = () => {
    setShowExplodedTableData(true);
  }

  const handleQueryStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryStr(event.target.value);
    console.log('value is:', event.target.value);
  }

  const handleIdColNamesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdColumnNames(event.target.value);
    console.log('value is:', event.target.value);
  }

  const handleFreeFormQueryClick = () => {
    setShowFreeFormQueryResult(true);
  }

  const handleClearClick = () => {
    setShowBookList(false);
    setShowPythonData(false);
    setShowTableList(false);
    setTableFieldName('');
    setIdFields('');
    setShowExplodedTableData(false);
    setQueryStr('');
    setIdColumnNames('');
    setShowFreeFormQueryResult(false);
  }

  return (
    <div>
      <button onClick={handleClearClick}>
        Clear Page
      </button>
      <p></p>
      <button onClick={handleGetBooksClick}>
        Get book list
      </button>
      {showBookList ? <Books /> : <p></p>}
      <button onClick={handleTableListClick}>
        Get Full List of Table Fields
      </button>
      <p></p>
      {showTableList ? <GetTableFieldNames /> : <p></p>}
      <p></p>
      <button onClick={handlePythonDataClick}>
        Preview Python Data
      </button>
      {showPythonData ? <GetData /> : <p></p>}
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

      <label> DataFrame Condition: </label>
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
      <label> Result ID Field Names (we only display result id columns): </label>
      <input
        type="text"
        id="idColumnNames"
        name="idColumnNames"
        onChange={handleIdColNamesChange}
        value={idColumnNames}
        autoComplete="off"
      />
      <p></p>
      <button onClick={handleFreeFormQueryClick}>
        Get Query Result
      </button>
      {showFreeFormQueryResult ? <FreeFormQuery queryStr={queryStr} idColumnNames={idColumnNames}/> : <p></p>}
        
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
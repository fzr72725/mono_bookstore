import logo from '../logo.svg';
import '../App.css';
import Books from './books'
import {GetData, GetTableFieldNames, ExplodeTableField} from './pythonData'
import { useState } from "react";

const GetComponents = () => {
  const [showBookList, setShowBookList] = useState(false);
  const [showPythonData, setShowPythonData] = useState(false);
  const [showTableList, setShowTableList] = useState(false);
  const [tableFieldName, setTableFieldName] = useState('');
  const [idFields, setIdFields] = useState('');
  const [showExplodedTableData, setShowExplodedTableData] = useState(false);

  const handleGetBooksClick = () => {
    setShowBookList(true);
  }

  const handleTableListClick = () => {
    setShowTableList(true);
  }

  const handlePythonDataClick = () => {
    setShowPythonData(true);
  }

  const handleTableFieldNameChange = (event) => {
    setTableFieldName(event.target.value);
    console.log('value is:', event.target.value);
  }

  const handleIdFieldsChange = (event) => {
    setIdFields(event.target.value);
    console.log('value is:', event.target.value);
  }

  const handleExplodedTableDataClick = () => {
    setShowExplodedTableData(true);
  }

  const handleClearClick = () => {
    setShowBookList(false);
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
        Get Python Data
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
import logo from './logo.svg';
import {useState, useEffect} from "react";
import './App.css';

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch('/api/v1/pythonTest');
        const data = await response.json();
        setData(data);
      } catch(err) {
        console.log(err);
      }
    }
    fecthData();
  }, []);

  return (
    <div>
      {!data ? "Loading..." : <h2>{data}</h2>}
    </div>
  );
};

export default App;
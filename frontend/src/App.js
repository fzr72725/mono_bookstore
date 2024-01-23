import logo from './logo.svg';
import {useState, useEffect} from "react";
import './App.css';

const MyBook = () => {
  

  const handleClick = () => {
    
    return (
      <div>
       <GetBooks />
      </div>
    );
  }

  const GetBooks = () => {
    console.log('ZZZZZ GetBooks')
    const [bookData, setBookData] = useState();
    useEffect(() => {
      const fecthBookData = async () => {
        try {
          const response = await fetch('api/v1/books');
          const data = await response.json();
          setBookData(data);
        } catch(err) {
          console.log(err);
        }
      }
      fecthBookData();
    }, []);
  
    return (
      <div>
        {!bookData ? "Loading..." : <h2>{bookData[0].name}</h2>}
      </div>
    );
  };

  return (
    <button onClick={handleClick}>
      Get book name
    </button>
  );
  
  
};

// const MyPython = () => {
//   const [data, setData] = useState();

//   useEffect(() => {
//     const fecthData = async () => {
//       try {
//         const response = await fetch('/api/v1/pythonTest');
//         const data = await response.json();
//         setData(data);
//       } catch(err) {
//         console.log(err);
//       }
//     }
//     fecthData();
//   }, []);

//   return (
//     <div>
//       {!data ? "Loading..." : <h2>{data}</h2>}
//     </div>
//   );
// };

const App = () => {
  return (
    <div>
    {/* <h1>Python Data Processor</h1>
      <MyPython /> */}
    <h1>Book List</h1>
      <MyBook />
  </div>
  );
}

export default App;
import React, { useState, useEffect} from "react";

interface Book {
  name: '',
};

const Books = () => {
    const [bookData, setBookData] = useState<Book[]>([]);
    useEffect(() => {
      const fecthBookData = async () => {
        try {
          const response = await fetch('api/v1/books');
          const data = await response.json();

          setBookData(data.default);
        } catch(err) {
          console.log(err);
        }
      }
      fecthBookData();
    }, []);
    //console.log(`ZZZZZ ${JSON.stringify(bookData)}`)
    return (
    //   <div>
    //     {!bookData ? "Loading..." : <h2>{bookData[0].name}</h2>}
    //   </div>
      <ul>
        {!bookData ? "Loading..." : bookData.map((book) => <li>{book.name}</li>)}
      </ul>
    );
  };

  export default Books
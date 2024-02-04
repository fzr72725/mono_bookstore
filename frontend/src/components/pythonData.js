import {useState, useEffect} from "react";


// const Banner = () => {
//   return (
//     <h1>First React App</h1>
//   );
// };

const GetData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch('/api/v1/previewDataFrame');
        const data = await response.json();
        setData(data);
      } catch(err) {
        console.log(err);
      }
    }
    fecthData();
  }, []);
  //console.log(`ZZZZZ ${JSON.stringify(data)}`)
  
  return (
    <div>
      {!data ? "Loading..." : <div dangerouslySetInnerHTML={{__html: data}}></div>}
    </div>
  );
};

const GetTableFieldNames = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch('/api/v1/listAllTableFields');
        const data = await response.json();
        setData(data);
      } catch(err) {
        console.log(err);
      }
    }
    fecthData();
  }, []);
  //console.log(`ZZZZZ ${JSON.stringify(data)}`)
  
  return (
    <div>
      {!data ? "Loading..." : <div dangerouslySetInnerHTML={{__html: data}}></div>}
    </div>
  );
};

const ExplodeTableField = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        console.log(`ZZZZZ ${JSON.stringify(props)}`);
        const response = await fetch(`/api/v1/explodeTableField?tableFieldName=${props.tableFieldName}&idFields=${props.idFields}`);
        const data = await response.json();
        setData(data);
      } catch(err) {
        console.log(err);
      }
    }
    fecthData();
  },);
  //console.log(`ZZZZZ ${JSON.stringify(data)}`)
  
  return (
    <div>
      {!data ? "Loading..." : <div dangerouslySetInnerHTML={{__html: data}}></div>}
    </div>
  );
};

const FreeFormQuery = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        console.log(`ZZZZZ ${JSON.stringify(props)}`);
        const response = await fetch(`/api/v1/freeFormQuery?queryStr=${props.queryStr}&idColumnNames=${props.idColumnNames}`);
        const data = await response.json();
        setData(data);
      } catch(err) {
        console.log(err);
      }
    }
    fecthData();
  },);
  
  return (
    <div>
      {!data ? "Loading..." : <div dangerouslySetInnerHTML={{__html: data}}></div>}
    </div>
  );
};

export {
  GetData,
  GetTableFieldNames,
  ExplodeTableField,
  FreeFormQuery,
}
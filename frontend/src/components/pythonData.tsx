import React, {useState, useEffect} from "react";


// const Banner = () => {
//   return (
//     <h1>First React App</h1>
//   );
// };

const GetData = (input: any) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch(`/api/v1/previewDataFrame?integrationId=${input.integrationId}&companyId=${input.companyId}&fileName=${input.fileName}`);
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

const ExplodeTableField = (input: any) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch(`/api/v1/explodeTableField?tableFieldName=${input.tableFieldName}&idFields=${input.idFields}`);
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

const FreeFormQuery = (input: any) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const isExploded = input.isExploded
        let queryStr = null;
        if (isExploded === "true") {
          queryStr = input.queryStrExploded;
        } else {
          queryStr = input.queryStr;
        };
        const response = await fetch(`/api/v1/freeFormQuery?queryStr=${queryStr}&isExploded=${input.isExploded}`);
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
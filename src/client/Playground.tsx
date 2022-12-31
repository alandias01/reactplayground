import React, { useEffect } from 'react';

export function Playground() {
  useEffect(() => {
    const data = fetch("http://localhost:5150/api/filereader/read3/").then(
      res => res.json()
    );

  }, []);


  return (<div>
    Playground2
  </div>
  )
}

class serv {
  cc = async () => {
    const data = await fetch("http://localhost:5150/api/filereader/read3/");
    return data;
  }
}
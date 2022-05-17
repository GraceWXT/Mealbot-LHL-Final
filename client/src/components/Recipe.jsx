import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import classNames from "classnames";


export default function Recipe() {
  const [state, setState] = useState({
    ingredients: [],
    instructions: [],
    nutrition: []
  });


  const { id } = useParams();
  console.log('id', id);

  // get data to update state
  useEffect(() => {
    axios.get(`/recipes/${id}`
    ).then((res) => {
      // console.log("res", res.data);
      setState(prev => ({ ...prev, ...res.data }));
    });
  }, []);
  console.log('state', state);

  return (
    <div>
      Recipe
    </div>
  );
}

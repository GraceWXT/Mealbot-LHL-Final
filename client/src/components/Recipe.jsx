import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";


export default function Recipe() {
  const [state, setState] = useState({
    ingredients: [],
    instructions: [],
    nutrition: []
  });

  //get data to update state
  useEffect(() => {
    axios.get('/api/recipes'
    ).then((all) => {
      setState(prev => ({ ...prev,  }));
    });
  }, []);

  return (
    <div>
      Recipe
    </div>
  );
}

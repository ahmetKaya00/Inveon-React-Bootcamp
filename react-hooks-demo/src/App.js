import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";


const reducer = (state,action) => {
  switch(action.type){
    case "increment":
      return {count: state.count + 1};
    case "decrement":
      return {count: state.count - 1};
    default:
      return state;
  }
};

const App = () =>{
  const [state, dispatch] = useReducer(reducer, {count: 0});

  const[counter, setCounter] = useState(0);

  useEffect(()=>{
    console.log(`Counter değeri değişti: ${counter}`);
    return () => {
      console.log("useEffect temizlendi!");
    }
  }, [counter]);

  const expensiveComputation = useMemo(()=>{
    console.log("Pahalı hesaplama çalıştı");
    return counter * 2;
  }, [counter]);

  const increment = useCallback(()=> setCounter(counter + 1),[counter]);

  return(
    <div>
      <h1>React Hooks Örneği</h1>

      <h2>useState: {counter}</h2>
      <button onClick={increment}>Tetikle</button>

      <h2>useReducer: {state.count}</h2>
      <button onClick={()=>dispatch({type: "increment"})}>ARttır</button>
      <button onClick={()=>dispatch({type: "decrement"})}>Azalt</button>

      <h2>useMemo: {expensiveComputation}</h2>
    </div>
  );


}
export default App;
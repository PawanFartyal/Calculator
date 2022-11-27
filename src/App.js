import "./App.css";
import{ useReducer,createContext}  from "react";
import { Digit } from "./digit";
import { Operation } from "./Operation";
const GlobalContext = createContext();
function App() {
 const Intialstate ={
  operation:'',
  currentOperand:'',
  prevOperand:'',
 }
 function reduce(state,{type,payload}){
  switch(type){
    case "ADD_DIGIT":{
      if(state.currentOperand==="0" && payload==="0") return state;
      if(payload==="." && state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: state.currentOperand+payload,
      }
    }
    case "CLEAR":{
      return {
        operation: "",
        currentOperand: "",
        prevOperand: "",
      };
    }
    case "DELETE":{
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1),
      }
    }
    case "OPERATION":{
      if(!state.currentOperand && !state.prevOperand) return state;
      else if(!state.currentOperand) return {
        ...state,
        operation: payload,
      };
      else if(state.operation && state.prevOperand){
        return{
          operation:payload,
         prevOperand:evaluate(state.operation,state.currentOperand,state.prevOperand),
        currentOperand:'',
      }
        }
     else{ return{
        operation:payload,
        prevOperand:state.currentOperand,
        currentOperand:'',
      }
    }
    }
    case "COMPUTE":{
       const compute=evaluate(payload,state.currentOperand,state.prevOperand)
       if(!state.prevOperand) return state;
      return {
        ...state,
        operation: "",
        currentOperand: compute,
        prevOperand: "",
      };
    }
  }
 }
  const [state,dispatch]=useReducer(reduce,Intialstate)
  function evaluate(payload,currentOperand,prevOperand) {
    let compute;
    switch (payload) {
      case "+": {
        compute = +currentOperand + +prevOperand;
        break;
      }
      case "-": {
        compute = +currentOperand - +prevOperand;
        break;
      }
      case "×": {
        compute = +currentOperand * +prevOperand;
        break;
      }
      case "÷": {
        compute = +prevOperand / +currentOperand;
        break;
      }
    }
    return compute;
  }
  return (
    <GlobalContext.Provider value={{state,dispatch}}>
      <div className="container">
        <div className="output">
          <p className="previous-operand">{state.prevOperand} {state.operation}</p>
          <p className="present-operand">{state.currentOperand}</p>
        </div>
        <button className="span-2 clear" onClick={()=>{
          dispatch({type:"CLEAR"})
        }}>AC</button>
        <button className="delete" onClick={()=>{
          dispatch({type:'DELETE'})
        }} >DEL</button>
        <Operation operation="-" />
        <Digit digit="1" />
        <Digit digit="2" />
        <Digit digit="3" />
        <Operation operation="+" />
        <Digit digit="4" />
        <Digit digit="5" />
        <Digit digit="6" />
        <Operation operation="×" />
        <Digit digit="7" />
        <Digit digit="8" />
        <Digit digit="9" />
        <Operation operation="÷" />
        <Digit digit="." />
        <Digit digit="0" />
        <button className="span-2 equal" onClick={()=>{
          dispatch({type:"COMPUTE", payload:state.operation})
        }}>=</button>
      </div>
    </GlobalContext.Provider>
  );
}

export { App,GlobalContext};

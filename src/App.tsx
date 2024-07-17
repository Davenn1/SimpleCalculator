import React, { useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DisplayText from './Module/DisplayText';
import NumericButton from './Module/NumericButton';
import Support from './Module/Support';
import OperationButton from './Module/OperationButton';
import ClearButton from './Module/ClearButton';
import DeleteButton from './Module/DeleteButton';
import EvaluateButton from './Module/EvaluateButton';



let history: (string)[] = [];

export enum actions  {
  add_digit = 'add-digit',
  choose_operation = 'choose-operation',
  clear = 'clear',
  delete_digit = 'delete-digit',
  evaluate= 'evaluate'
}

interface Inumber{
  currentNumber:number,
  previousNumber:number,
  operation:string
}
interface numberAction{
  type:actions;
  payload?:string
}




const initState = {currentOperand:"0", previousOperand: "zero", operation:"0"}

const reducer = (state: typeof initState, action:numberAction ) : typeof initState =>{
  
  switch(action.type){
    case actions.add_digit:
      
    let output1;
    if(state.currentOperand === "0"){
      output1 = `${action.payload}`
    }else if(state.operation==state.currentOperand){
      return {...state,
      currentOperand : `${action.payload}`}
    }else{
      output1 = `${state.currentOperand}${action.payload}`;
    }
      return {...state, 
       
      currentOperand : output1}
    default:
      throw new Error();

    case actions.delete_digit:
      
    let output;
    if(state.currentOperand.length == 1){
      output = "0"
    }else{
      output = state.currentOperand.substring(0, state.currentOperand.length-1);
    }
    return {...state, currentOperand : output}

    case actions.clear:
      let output3 = "0";

      return {...state,  operation : ``,
      previousOperand : 'zero',
      currentOperand: '0'}

    case actions.choose_operation:

    let output2;

    if(state.currentOperand == null && state.previousOperand == "zero"){
      return state;
    }

    if(state.currentOperand == "+" || state.currentOperand == "-" || state.currentOperand == "/" || state.currentOperand == "x"){
      return {
        ...state,
        operation : `${action.payload}`,
        previousOperand : state.previousOperand,
        currentOperand: `${action.payload}`
      };
    }

    if(state.previousOperand == "zero"){
      return {
        ...state,
        operation : `${action.payload}`,
        previousOperand : state.currentOperand,
        currentOperand: `${action.payload}`
      }
    }

    return {
      ...state,
      previousOperand:evaluate(state.currentOperand, state.previousOperand, state.operation),
      operation: `${action.payload}`,
      currentOperand: `${action.payload}`
    }

    case actions.evaluate:
      if(state.operation==null||state.previousOperand=="zero"){
        return state;
      }

      return {
        ...state,
        previousOperand:"zero",
        operation:"",
        currentOperand: evaluate(state.currentOperand, state.previousOperand, state.operation)
      }

  }

}

function evaluate(currentOperand:string, previousOperand:string, operation:string) : any{
  const num1 = parseFloat(currentOperand);
  const num2 = parseFloat(previousOperand);

  

  if(isNaN(num1)||isNaN(num2))return ""

  let compute=0;
  let final=" ";
  if(operation == "+"){
    compute = num1 + num2
  }else if(operation == "-"){
    compute =  num2 -  num1
  }else if(operation == "/"){
    if(num1==0){
      return "Err";
    }
    compute = num2 / num1
  }else if(operation == "x"){
    compute = num1 * num2;
  }

  if(compute>=10000){
    final = compute.toPrecision(7).toString();
  }else if (compute<10000&&compute>=1){
    final = compute.toString()
  }else if((compute<1&&compute>0)||(compute>-1&&compute<0)){
    final = compute.toPrecision(7).toString();
  }else if(compute==0){
    final = compute.toString();
  }else if(compute>-10000&&compute<=-1){
    final = compute.toString();
  }
  else if(compute<=-10000){
    final = compute.toPrecision(7).toString();
  }else{
    final = compute.toPrecision(7).toString();
  }
  


  history.push(final);
  if((num1%3==0||num1%5==0||num1%7==0) && operation=="/"){
    return final;
  }
  return final;
  
}


function App() {

  const [state, dispatch] = useReducer(reducer, initState)
  return (
    
    <>
    
    <div className="app-container">
      
      <div className="calculator-container">
          
          {<DisplayText passPropPrev = {state.previousOperand} passArray = {history} passProps= {state.currentOperand} dispatch={dispatch} /> }
          <div className="button-container">
            <div className="firstline-button-container">
              <ClearButton passProp={"C"} dispatch={dispatch} />
              <DeleteButton passProp={"Del"} dispatch={dispatch}/>
              <Link  className = "one-button-container center darker" to={'/supportPage'}>?</Link>
              <OperationButton passProp={"/"}  dispatch={dispatch} />
            </div>
            <div className="secondline-button-container">
              <NumericButton passProp={"1"} dispatch={dispatch} />
              <NumericButton passProp={"2"} dispatch={dispatch}/>
              <NumericButton passProp={"3"} dispatch={dispatch}/>
              <OperationButton passProp={"x"}  dispatch={dispatch} />
            </div>
            <div className="thirdline-button-container">
              <NumericButton passProp={"4"} dispatch={dispatch}/>
              <NumericButton passProp={"5"} dispatch={dispatch}/>
              <NumericButton passProp={"6"} dispatch={dispatch}/>
              <OperationButton passProp={"-"}  dispatch={dispatch} />
            </div>
            <div className="fourthline-button-container">
              <NumericButton passProp={"7"} dispatch={dispatch}/>
              <NumericButton passProp={"8"} dispatch={dispatch}/>
              <NumericButton passProp={"9"} dispatch={dispatch}/>
              <OperationButton passProp={"+"}  dispatch={dispatch} />
            </div>
            <div className="fifthline-button-container">
              <NumericButton passProp={"0"} dispatch={dispatch}/>
              <EvaluateButton passProp={"="} dispatch={dispatch} />
            </div>
          </div>
      </div>
    </div>

    </>
  );
}

export default App;

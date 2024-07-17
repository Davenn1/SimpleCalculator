import React, { useState } from 'react';
import { actions} from '../App';

const NumericButton = (props:any)=>{
    const [button, setButton] = useState(props.passProp);
    const name:string = props.passProp;
    return (
        <button className = {name === ("0")?"zero-button-container":"one-button-container"} onClick = {()=>{
            props.dispatch({type:actions.add_digit, payload:props.passProp})
        }}>
            {props.passProp}
        </button>
    )
   
}

export default NumericButton;
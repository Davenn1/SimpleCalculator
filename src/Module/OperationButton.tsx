import React, { useState } from 'react';
import { actions} from '../App';

const OperationButton = (props:any)=>{
    const [buttons, setButtons] = useState(props.passProp)
    const name:string = props.passProp;
    return (
        <button className={name=="="?"equal-button-containers" : "symbol-button-container"} onClick = {()=>{
            props.dispatch({type:actions.choose_operation, payload:props.passProp})
        }}>
            {props.passProp}
        </button>
     )


}

export default OperationButton;
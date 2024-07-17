import React, { useState } from 'react';
import { actions} from '../App';

const EvaluateButton = (props:any)=>{
    const [buttons, setButtons] = useState(props.passProp)
    const name:string = props.passProp;
    return (
        <button className={name=="="?"equal-button-containers" : "one-button-container"} onClick = {()=>{
            props.dispatch({type:actions.evaluate, payload:props.passProp})
        }}>
            {props.passProp}
        </button>
     )


}

export default EvaluateButton;
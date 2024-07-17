import React, { useState } from 'react';
import { actions} from '../App';

const DeleteButton = (props:any)=>{
    const [buttons, setButtons] = useState(props.passProp)
    return (
        <button className="one-button-container" onClick = {()=>{
            props.dispatch({type:actions.delete_digit, payload:props.passProp})
        }}>
            {props.passProp}
        </button>
     )


}

export default DeleteButton;
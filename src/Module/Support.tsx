import React, { useEffect, useRef, useState } from 'react';
import './support.css'
import axios from 'axios';

const Support = ()=>{
    
    const inputLastName = useRef<HTMLInputElement | null>(null);
    const inputFirstName = useRef<HTMLInputElement | null>(null);
    const inputEmail = useRef<HTMLInputElement | null>(null);
    const inputCheck1 = useRef<HTMLInputElement | null>(null);
    const inputCheck2 = useRef<HTMLInputElement | null>(null);
    const buttons = useRef<HTMLInputElement | null>(null);
    let [ticket, setTicket] = useState<string>("none");
    let [formDisplay, setFormDisplay] = useState<string>("flex");
    let [buttonDisplay, setButtonDisplay] = useState<string>("flex");
    let random = `${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`;

    let [setdisplay, setSetDisplay] = useState("none");
    let [spanDisplay, setSpanDisplay] = useState("none");
    let [api, setApi] = useState<any>();

    const  fetchApi = async ()=>{
        let res2 = null;
        try{
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        res2 = res;
        setApi(res.data);
        }catch(e){
            alert("Failed to send the data");
        }
        
        if(res2!=null){
            setTicket("flex")
            setFormDisplay("none")
            setButtonDisplay("none")
        }
        
        
      }




    useEffect(()=>{
        const checkbutton = setInterval(()=>{handleClick()}, 100);
        return ()=>clearInterval(checkbutton)
    }, [setdisplay])

    function handleClick(){
        var boolname, boolemail, boolcheck;
        
        if(inputFirstName.current?.value.trim().length==0||inputLastName.current?.value.trim().length==0){
            boolname = false
        }else{
            boolname = true
        }    

        if(inputEmail.current?.value.trim().length==0){
            boolemail = false
        }else{
            boolemail = true
        }
        
        if(!inputCheck1.current?.checked && !inputCheck2.current?.checked){
            boolcheck = false
        }else{
            boolcheck = true
        }  

        
        if(!boolname||!boolemail||!boolcheck){
            setSetDisplay("none");
            setSpanDisplay("block");
        }else{
            setSetDisplay("block");
            setSpanDisplay("none");
        }
    }
    
    
    return(
        <div className="App">
            <div className="form-container">
                <div className = "form-title-container">
                    <h1>Support Ticket Form</h1>
                </div>
                
                <div>
                <div style = {{display:formDisplay}} className = "form-data-container">
                    <div className="form-left">
                    <div className="form-name-container">
                        <div className="form-name-title-container">Name<span className="asterisk"> *</span></div>
                        <div className="form-name-text-container">
                        <div>
                            <input ref = {inputFirstName} type="text"></input>
                            <p>First</p>
                        </div>
                        <div className="last">
                            <input ref = {inputLastName} type="text"></input>
                            <p className="last-text" >Last</p>
                        </div>
                        </div>
                    </div>

                    <div className = "form-email-container">
                        <div className="form-email-title-container">Email<span className="asterisk"> *</span></div>
                        <input  ref={inputEmail} type="text"></input>
                    </div>

                    <div className = "form-topic-container">
                        <div className="form-topic-title-container">Topic<span className="asterisk"> *</span></div>
                        <div className="form-topic-text-container">
                            <div>
                            <p>What can we help you today?</p>
                            <div><input ref={inputCheck1} type="radio"></input><span>General</span></div>
                            <div><input ref={inputCheck2} type="radio"></input><span>Bug</span></div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className = "form-right">
                        <div className="form-description-container">
                            <div className = "form-description-title-container">Description<sup className="optional">optional</sup></div>
                            <input placeholder="Description Report"></input>
                        </div>
                    </div>

                    
                </div>

                <div className="ticket-container" style={{display:ticket}}>
                        <div>
                        <h1>Thank you for sending us your report, we will track the problem now</h1>
                        <p>Ticket number: <span>{random}</span></p>
                        </div>
                    </div>

                <div style={{display:buttonDisplay}}className="send-button-container"><div><button style = {{display:setdisplay}} onClick= {()=>{fetchApi()}} >Send</button><span style={{display:spanDisplay}}>Send</span></div></div>
                
                </div>
                
            </div>
        </div>
        
    ) 
}

export default Support;
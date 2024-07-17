import React, { useEffect, useState } from 'react';


const DisplayText = (props : any) =>{
    const [display, setDisplay] = useState<string>("0");
    const [displayPrev, setDisplayPrev] = useState<any>(null);

    useEffect(()=>{
        let data = setInterval(()=>{
            setDisplay(props.passProps)
            setDisplayPrev(props.passPropPrev)
        }, 25)

        return ()=>clearInterval(data);
    })
    return (
        <div className="display-container">
            <div className="display-text-previous"><p>{displayPrev=="zero"?"":displayPrev}</p></div>
            <div className="display-text"><p>{display}</p></div>
            <div className="history-container">
                

                {props.passArray.map((element: string | null | undefined, index:number) => {
                    if(index%2==0){
                        return (
                        
                            <div className="history-text">{element}</div>
                        )
                    }
                    
                })}
            </div>
        </div>
    )
}

export default DisplayText;
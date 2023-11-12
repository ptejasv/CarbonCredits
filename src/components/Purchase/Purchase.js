import { Navigate } from "react-router-dom";
import "./Purchase.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Purchase(props){
    return(    
        <div>
            <h1>
                Purchase Tab.
            </h1>
            <h4 style={ {color: "red"}}>Please ensure that the ID is correct before purchasing.</h4>
            <p>            
                <br />
                Please type in the Listing you would like to Purchase.
            </p>
                <input width = "5px" type = "number" id = "inputIDVal"></input>
                <br />
                <button className = "btn" onClick = {props.buyHandle}>
                    Purchase This ID
                </button>
            <GlobalToolBar/>
        </div>
    );
    return (
        <div>
            {
                props.isConnected ?
                <Purchase />:
                <Navigate to = '/ee4032project' />
            }
        </div>
    )
}

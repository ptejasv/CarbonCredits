import { Navigate } from "react-router-dom";

import "./makelisting.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import tree from '../../images/forest (1).png';

export default function MakeListing(props){

    const FunctionIntro = () => {
        return (
            <div> <img src= {tree} width="200" height="200" /> 
                <div className = "make-listing-intro">
                </div>
            </div>
        )
    }

    const MakeListingPanel = () => {
        return (
            <div>
                
                <br />
                Enter a description: &nbsp;&nbsp;
                <input width = "30px" type = "text" id = "desc"></input>
                <br />
                Enter number of credits: &nbsp;&nbsp; 
                <input width = "30px" type = "number" id = "quantity"></input>
                <br />
                Enter price (x0.01Eth): &nbsp;&nbsp;
                <input width = "30px" type = "number" id = "price"></input>
                <br />
                <div className = "make-listing-storeBox">
                    <button className = "make-listing-btn" onClick = {() => props.makeListingHandle()}>
                        List Now
                    </button>
                    {props.error && <div className="error"> {props.error} </div>}
                    {props.status && <p className="make-status"> {props.status} </p>}
                </div>
            </div>
        )
    }

    const FunctionPanel = () => {
        return (
            <div className = "make-listing-box">
                <MakeListingPanel/>
                <br/>
            </div>
        )
    }

    const MakeListingPage = () => {
        return (
            <div className = "make-listing-background">
                
                <FunctionIntro/>
                <h1>Make a Listing!</h1>
                <div className = "make-listing">
                    <FunctionPanel/>
                </div>

                <GlobalToolBar/>
            </div>
        )
    }

    return (
        <div>
            {
                props.isConnected ?
                <MakeListingPage />:
                <Navigate to = '/CarbonCredits' />
            }
        </div>
    )
}
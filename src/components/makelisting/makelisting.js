import { Navigate } from "react-router-dom";

import "./makelisting.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function MakeListing(props){

    const FunctionIntro = () => {
        return (
            <div className = "make-listing-intro">
                <p>
                    Make your carbon credit listing here.
                    <br />
                    Enter the details about the type of credits and how they were acquired in the "description" field. Enter the price and quantity of credits (this must be less than or equal to the number of credits you have after other listings you've made). 
                    <br />
                    Your listing will be visible to everyone with this application.
                </p>
            </div>
        )
    }

    const MakeListingPanel = () => {
        return (
            <div>
                
                <br />
                Enter credits description: &nbsp;&nbsp;
                <input width = "30px" type = "text" id = "desc"></input>
                <br />
                Enter number of credits: &nbsp;&nbsp; 
                <input width = "30px" type = "number" id = "quantity"></input>
                <br />
                Enter price of credits: &nbsp;&nbsp;
                <input width = "30px" type = "number" id = "price"></input>
                <br />
                <div className = "make-listing-storeBox">
                    <button className = "make-listing-btn" onClick = {() => props.makeListingHandle()}>
                        Make Listing
                    </button>
                    {props.error && <div className="error"> {props.error} </div>}
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
                <h1>Make Carbon Credits Listing</h1>
                <FunctionIntro/>
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
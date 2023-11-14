import { Navigate } from "react-router-dom";

import "./storage.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Storage(props){

    const FunctionIntro = () => {
        return (
            <div className = "storage-intro">
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

    const StoreValPanel = () => {
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
                <div className = "storage-storeBox">
                    <button className = "btn" onClick = {() => props.makeListingHandle()}>
                        Make Listing
                    </button>
                    {props.error && <div className="error"> {props.error} </div>}
                </div>
            </div>
        )
    }

    const FunctionPanel = () => {
        return (
            <div className = "storage-box">
                <StoreValPanel/>
                <br/>
            </div>
        )
    }

    const StoragePage = () => {
        return (
            <div className = "storage-background">
                <h1>Make Carbon Credits Listing</h1>
                <FunctionIntro/>
                <div className = "storage">
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
                <StoragePage />:
                <Navigate to = '/CarbonCreditsTrading' />
            }
        </div>
    )
}
import { Navigate } from "react-router-dom";

import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Sell(props){

    // const FunctionIntro = () => {
    //     return (
    //         <div className = "storage-intro">
    //             <p>
    //                 &emsp;This is an introduction to this simple demo of applying blockchain contracts via web interface. 
    //                 Here a contract is applied for storing and checking value. 
    //                 The contract file can be found at "~/src/contracts/SimpleStorage.sol". 
    //                 <br/>
    //                 &emsp;Similar to what you see on REMIX, 
    //                 the functionality of the contract can be implemented with the buttons to the right. 
    //                 A value will be stored by filling in a number and clicking "store". 
    //                 The value can then be read by clicking "get". 
    //             </p>
    //         </div>
    //     )
    // }/

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
                    {/* <button className = "btn" onClick = {props.storeValHandle}>
                        store
                    </button> */}
                    <button className = "btn" onClick = {() => props.makeListingHandle()}>
                        Make Listing
                    </button>
                    {/* {
                        props.storedPending ?
                        <span>
                            {
                                props.storedDone ?
                                <span>Done! </span>:
                                <span>Pending... </span>
                            }
                        </span> : 
                        <span>
                            {
                                props.storedDone ?
                                <span>Rejected! </span>:
                                <span>Please try again. </span>
                            }
                        </span>
                    } */}
                </div>
            </div>
        )
    }

    // const GetValPanel = () => {
    //     return (
    //         <div>
    //             Click 'get' to check the stored value:&nbsp;
    //             <span className = "global-message">
    //                 {props.showVal}
    //             </span>
    //             <br />
    //             <button className = "btn" onClick = {props.showValHandle}>
    //                 get
    //             </button>
    //         </div>
    //     )
    // }

    const FunctionPanel = () => {
        return (
            <div className = "storage-box">
                <StoreValPanel/>
                <br/>
                {/* <GetValPanel/> */}
            </div>
        )
    }

    const SellPage = () => {
        return (
            <div className = "storage-background">
                <h1>Make Carbon Credits Listing</h1>
                <div className = "storage">
                    {/* <FunctionIntro/> */}
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
                <SellPage />:
                <Navigate to = '/InterfaceDemo' />
            }
        </div>
    )
}
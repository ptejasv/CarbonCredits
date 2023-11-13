import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';

export default function Sell(props){

    // // Amount of Credits to Sell
    // const InputCredits = () => {
    //     return(

    //         <div className = "sellCredit">
    //             <input width = "5px" type = "number" id = "inputIDVal"></input>
    //         </div>
    //     )
    // }

    // const InputDescription = () => {
    //     return(

    //         <div className = "sellDescription">
    //             <input width = "5px" type = "text" id = "inputIDVal"></input>
    //         </div>

    //     )
    // }

    // const InputPrice = () => {

    //     return(

    //         <div className = "sellPrice">
    //             <input width = "5px" type = "number" id = "inputIDVal"></input>
    //         </div>
    //     )

    // }

    // Description of listing 
    // Price of credits in eth 
    const SellTitle = () => {
        return (
            <div className="sellTitle"> <h1>Sell your 🌳!😊 </h1>
            </div>
        )
    }

    const CreditInput = () => {
        return (
            <div className="creditInputContainer">
                <p> 🌳 to sell: </p>
                <input

                    type = "number" 
                    onChange={props.credits}
                    id = "inputCreditID"

                /> 
            </div>
        );
    }

    const PriceInput = () => {
        return (
            <div className="priceInputContainer">
                <p>Price 💎 (eth):</p>
                <input 
                    style={{ marginLeft: '5px'}} 
                    type="text" 
                    id="inputPriceID" 
                    onChange={parseFloat(props.price)}
                />
            </div>
        );
    }

    const DescriptionInput = () => {
        return (
            <div className="priceInputContainer">
            <p> Description:</p>
            <textarea 
                rows="5" 
                cols="50" 
                onChange={props.description}
                style={{ padding: '8px' }}
                id = "inputDescptID"
            />
            </div>
        );
    }

    // const StoreSellValues = () => {
    //     return (
    //         <div>
    //             Input price in eth:
    //             <br />
    //             <input width = "30px" type = "number" id = "inputVal"></input>
    //             <br />
    //             <div className = "storage-storeBox">
    //                 <button className = "btn" onClick = {props.storedPrice}>
    //                     store
    //                 </button>
    //                 {
    //                     props.storedPending ?
    //                     <span>
    //                         {
    //                             props.storedDone ?
    //                             <span>Done! </span>:
    //                             <span>Pending... </span>
    //                         }
    //                     </span> : 
    //                     <span>
    //                         {
    //                             props.storedDone ?
    //                             <span>Rejected! </span>:
    //                             <span>Please try again. </span>
    //                         }
    //                     </span>
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

    const SellPage = (props) => {
        return (
            <div className = "sell-background">
                <div className = "sell-menu">
                    <SellTitle/>
                    <div className = "sell-menuFramework">  

                        <CreditInput/>
                        <PriceInput/>
                        <DescriptionInput/>                 
                        <br />

                        <button 
                            className = "btn" 
                            onClick = {props.showListedHandle}
                            style={
                                { backgroundColor: 'green', padding: '10px' }
                            }
                        >
                            List now    
                        </button>
                        {
                        props.listNowPending ?
                        <span>
                            {
                                props.listNowDone ?
                                <span>Pending... </span>:
                                <span>Done! </span>
                            }
                        </span> : 
                        <span>
                            {
                                props.listNowDone ?
                                <span>Rejected! </span>:
                                <span>Please try again. </span>
                            }
                        </span>
                        }    
                    </div>
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
                <Navigate to = '/ee4032project' />
            }
        </div>
    );
}
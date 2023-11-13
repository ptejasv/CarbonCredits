import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';

export default function Sell(props){

    const { price, credits, description, onSell, setPrice, setCredits, setDescription } = props;

    const handleSell = () => {
        // Pass the values to the parent component using onSell prop
        onSell();
        
    }
    
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
                    id="inputVal"
                    value = {credits}
                    type = "number" 
                    onChange={(e) => setCredits(e.target.value)}

                /> 
            </div>
        );
    }

    const PriceInput = () => {
        return (
            <div className="priceInputContainer">
                <p>Price 💎 (eth):</p>
                <input 
                    id="inputVal"
                    value={price}
                    style={{ marginLeft: '5px'}} 
                    type="text" 
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
        );
    }

    const DescriptionInput = () => {
        return (
            <div className="priceInputContainer">
            <p> Description:</p>
            <textarea 
                id="inputVal"
                value={description}
                rows="5" 
                cols="50" 
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: '8px' }}
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

    const SellPage = () => {
        return (
            <div className = "sell-background">
                <div className = "sell-menu">
                    <SellTitle/>
                    <div className = "sell-menuFramework">  

                        <CreditInput />
                        <PriceInput />
                        <DescriptionInput />                 
                        <br />

                        <button 
                        
                            className = "btn" 
                            onClick = {props.storeInputsHandle}
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
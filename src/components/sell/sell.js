import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';

export default function Sell(props){

    // const SellMenu = () => {
    //     return (
    //         <div className = "sell-menu">
    //             {/* <div className = "listNumber">#</div> */}
    //             {/* <div className = "listAccount">Account 😀 </div> */}
    //             <div className = "listCredit">Credits 🌳 </div>
    //             <div className = "listDescription">Description 💬 </div>
    //             <div className = "listPrice">Price </div>
    //         </div>
    //     )
    // }

    // const RecordStatusDisplay = (propsStatus) => {
    //     const curRecord = propsStatus.record;

    //     if (curRecord.status === 1){
    //         return (
    //             <div className = "listing-approved">A</div>
    //         );
    //     }
    //     else{
    //         if (curRecord.status === 0){
    //             return (
    //                 <div className = "listing-invalid">I</div>
    //             );
    //         }
    //         else{
    //             return (
    //                 <div className = "listing-rejected">R</div>
    //             );
    //         }
    //     }
    // }

    // const RecordDisplay = (propsDisplay) => {
    //     const curRecord = propsDisplay.record;
    //     const description = propsDisplay.descrpt;

    //     // const recordNum = props.recordLen - curRecord.id;

    //     return (

    //         <div className = "history-elementInner">
    //             <div className = "listAccount">{curRecord.address}</div>
    //             <div className = "listCredit">{curRecord.credits}</div>
    //             <div className = "listDescription">{description}</div>
    //             <div className = "listPrice">curRecord.price
    //                 <RecordStatusDisplay record = {curRecord}/> </div>
    //         </div>
    //     )
    // }

    // Amount of Credits to Sell
    const InputCredits = () => {
        return(

            <div className = "sellCredit">
                <input width = "5px" type = "number" id = "inputIDVal"></input>
            </div>

        )
    }

    const InputDescription = () => {
        return(

            <div className = "sellDescription">
                <input width = "5px" type = "text" id = "inputIDVal"></input>
            </div>

        )
    }

    const InputPrice = () => {

        return(

            <div className = "sellPrice">
                <input width = "5px" type = "number" id = "inputIDVal"></input>
            </div>
        )

    }

    // Description of listing 
    // Price of credits in eth 
    const SellTitle = () => {
        return (
            <div className="sellTitle"> <h1>Sell your 🌳!😊 </h1>
            
            </div>
        )
    }

    const PriceInput = () => {
        return (
            <div className="priceInputContainer">
                <p>Price 💎 (eth):</p>
                <input style={{ marginLeft: '5px', borderRadius: '5px' }} type="number" id="inputIDVal" />
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

    const SellPage = (sellData, updateSellData, handleSellListingNow) => {
        return (
            <div className = "sell-background">
                <div className = "sell-menu">
                    <SellTitle/>
                    <div className = "sell-menuFramework">
                        <p> 🌳 to sell: </p>   
                        <input 
                            type = "number" 
                            value={sellData.credits}
                            onChange={(e) => updateSellData('credits', e)}
                        
                        />
                                   
                        <PriceInput type = "number" value={sellData.price} onChange={(value) => updateSellData('price',value)} /> 
                        
                        <p> Description:</p>   
                        <textarea 
                            rows="5" 
                            cols="50" 
                            value={sellData.description}
                            onChange={(e) => updateSellData('description', e.target.value)}
                            style={{ borderRadius: '20px', padding: '8px' }}
                        />                       
                        <br />
                        <button 
                            className = "btn" 
                            onClick = {() => handleSellListingNow(sellData)}
                            style={
                                { backgroundColor: 'green', borderRadius: '8px', padding: '10px' }
                            }
                        >
                            List now
                            
                        </button>
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
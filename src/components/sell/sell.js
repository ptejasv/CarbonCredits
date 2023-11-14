import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';

const [SellInfo, setSellInfo] = useState({price:"", credits:"", description: ""});

export default function Sell(props){

    const onSell = (e) => {
        // Pass the values to the parent component using onSell prop
        const credits = e.target.name1;
        const description = e.target.value;
        setSellInfo( (prev) => {
            return {...prev, [name1]: value}
        })        
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
                    value = {credits}
                    type = "credits" 
                    onChange={onSell}

                /> 
            </div>
        );
    }

    const PriceInput = () => {
        return (
            <div className="priceInputContainer">
                <p>Price 💎 (eth):</p>
                <input 
                    value={price}
                    style={{ marginLeft: '5px'}} 
                    type="price" 
                    onChange={onSell}
                />
            </div>
        );
    }

    const DescriptionInput = () => {
        return (
            <div className="priceInputContainer">
            <p> Description:</p>
            <textarea 
                value={description}
                type = "description"
                rows="5" 
                cols="50" 
                onChange={onSell}
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
                            <form> 
                                <CreditInput />
                                <PriceInput />
                                <DescriptionInput />          
                                <br />
                                <button 
                                    className = "btn" 
                                    type = "ListNow"
                                    >
                                    List now    
                                </button>
                                    {/* {
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
                                    } */}
                            </form>    
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
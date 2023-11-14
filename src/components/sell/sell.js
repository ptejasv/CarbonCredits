import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';


export default function Sell(props){

    // const [SellInfo, setSellInfo] = useState({
    //     price:"", 
    //     credits: "", 
    //     description: "",
    // });

    // const onSell = (e) => {
    //     // Pass the values to the parent component using onSell prop
    //     const {name,value} = e.target;
    //     setSellInfo((prev) => {
    //         return {...prev, [name]: value}
    //     });        
    // };

   
    
    const SellTitle = () => {
        return (
            <div className="sellTitle"> <h1>Sell your 🌳!😊 </h1>
            </div>
        )
    }

    // const CreditInput = () => {
    //     return (
    //         <div className="creditInputContainer">
    //             <p> 🌳 to sell: </p>
    //             <input
    //                 // id = 'credits'
    //                 // value = {SellInfo[1]}
    //                 type = "credits" 
    //                 name = "credits"
    //                 onChange={onSell}
    //             /> 
    //         </div>
    //     );
    // }

    const PriceInput = () => {
        return (
            <div className="priceInputContainer">
                <p>Price 💎 (eth):</p>
                <input 
                    id = 'price'
                    // value={SellInfo[0]}
                    type="price" 
                />
            </div>
        );
    }

    const DescriptionInput = () => {
        return (
            <div className="priceInputContainer">
            <p> Description:</p>
            <textarea 
                id = 'description'
                // value={SellInfo[2]}
                type = "description"
                rows="5" 
                cols="50" 
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
                            {/* <form>  */}
                                <p>🌳 to sell:</p>      <input type= "credits"  id = 'cred' name= "credits" onChange= {props.handleSell} /> 
                                <p> Price 💎 (eth):</p> <input type="price" id = 'prc' name= "price" onChange= {props.handleSell} />
                                <p> Description:</p>     <textarea type= "description" id = 'desc' name= "description" onChange= {props.handleSell}> </textarea>
                                <br></br>
                                <button type= "ListNow" onClick={props.makeListingHandle}> List now </button>         
                            {/* </form>     */}
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
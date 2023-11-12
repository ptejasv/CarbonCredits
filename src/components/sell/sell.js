import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   

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
            <div className="sellTitle"> <h1>Sell your credits!😊 </h1>
            
            </div>
        )
    }

    const PriceInput = () => {
        return (
            <div className="priceInputContainer">
                <p>Price:</p>
                <input style={{ marginLeft: '5px', borderRadius: '5px' }} type="number" id="inputIDVal" />
            </div>
        );
    }


    const SellPage = () => {
        return (
            <div className = "sell-background">
                <div className = "sell-menu">
                    <SellTitle/>
                    <div className = "sell-menuFramework">
                        {/* <hr color = "black" width = "100%"/> */}
                   
                        <p> Credits to sell 🌳: </p>   
                        <input type = "number" id = "inputIDVal"></input>
                                   
                        <PriceInput/>  
                        
                        <p> Description:</p>   
                        <textarea 
                            rows="5" 
                            cols="50" 
                            id="inputIDVal" 
                            style={{ borderRadius: '20px', padding: '8px' }}
                        />                       
                        <br />
                        <button 
                            className = "btn" 
                            onClick = {props.buyHandle}
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
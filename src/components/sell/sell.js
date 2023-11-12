import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./sell.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   

export default function Sell(props){

    const SellMenu = () => {
        return (
            <div className = "sell-menu">
                {/* <div className = "listNumber">#</div> */}
                {/* <div className = "listAccount">Account 😀 </div> */}
                <div className = "listCredit">Credits 🌳 </div>
                <div className = "listDescription">Description 💬 </div>
                <div className = "listPrice">Price </div>
            </div>
        )
    }

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

    const SellPage = () => {
        return (
            <div className = "sell-background">
                <div className = "sell-menu">
                    <h1>Make a Listing!😊 </h1>
                    <div className = "sell-menuFramework">
                        <hr color = "black" width = "100%"/>
                   
                        <p> Please enter the A, B and C you would like to sell. </p>         
                        <input width = "5px" type = "number" id = "inputIDVal"></input>
                        <input width = "5px" type = "number" id = "inputIDVal"></input>
                        <input width = "5px" type = "flaot" id = "inputIDVal"></input>
                        <br />

                        <button className = "btn" onClick = {props.buyHandle}> 
                            Publish Listing
                            
                        </button>

                        <hr color = "black" width = "100%"/>

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
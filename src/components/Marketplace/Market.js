import { Navigate } from "react-router-dom";

import "./Market.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Market(props){
    const displayNum = 10;

    const Menu = () => {
        return (
            <div className = "market-menu">
                <div className = "market-listNumber">#</div>
                <div className = "market-listCredits">Credits</div>
                <div className = "market-listPrice">Price</div>
                <div className = "market-description">Description</div>
                <div className = "market-listOwner">Owner</div>
            </div>
        )
    }

    const RecordStatusDisplay = (propsStatus) => {
        const curRecord = propsStatus.record;

        if (curRecord.status === 1){
            return (
                <div className = "market-approved">A</div>
            );
        }
        else{
            if (curRecord.status === 0){
                return (
                    <div className = "market-invalid">I</div>
                );
            }
            else{
                return (
                    <div className = "market-rejected">R</div>
                );
            }
        }
    }

    const RecordDisplay = (propsDisplay) => {
        const curRecord = propsDisplay.record;
        // const recordNum = props.recordLen - curRecord.id;
        return (
            <div className = "market-elementInner">
                <div className = "market-listNumber">{curRecord.id}</div>
                <div className = "market-listCredits">{curRecord.operation}</div>
                <div className = "market-listPrice">{curRecord.value}</div>
                <div className = "market-description">{curRecord.cost}</div>
                <div className = "market-listOwner">
                    <RecordStatusDisplay record = {curRecord}/>
                </div>
            </div>
        )
    }

    const ListUnitDisplay = (propsUnit) => {
        const index = propsUnit.index;
        const unitIdx = props.recordLen - displayNum + index;
        return (
            <div className = "market-element">
                {
                    // props.recordLen >= index ?
                    unitIdx >= 1 ?
                    <RecordDisplay record = {props.recordList[unitIdx]}/>:
                    null
                }
            </div>
        )
    }


    // const RecordListRender = () => {
    //     let text = "";
    //     console.log(props.recordLen);
    //     if (props.recordLen > 0){
    //         for (let itr = 1; itr <= props.recordLen; itr ++){
    //             text = text + ListElement(props.recordList[itr]);
    //         }
    //         // text = ListElement(props.recordList[1]);
    //         console.log(text);
    //         // text = '<p>why teh hell</p>';
    //         // console.log(text);
    //         document.getElementById('RecordList').innerHTML = text;
    //     }
    //     // <RecordDisplay record = {props.recordList[0]}/>
        
    // }

    const MarketPage = () => {
        return (
            <div className = "market-background">
                <div className = "market">
                    <h1>Market Listing</h1>
                    <div className = "market-menuFramework">
                        <hr color = "black" width = "100%"/>
                        <Menu />
                        <hr color = "black" width = "100%"/>
                        
                        <ListUnitDisplay index = {1}/>
                        <ListUnitDisplay index = {2}/>
                        <ListUnitDisplay index = {3}/>
                        <ListUnitDisplay index = {4}/>
                        <ListUnitDisplay index = {5}/>
                        <ListUnitDisplay index = {6}/>
                        <ListUnitDisplay index = {7}/>
                        <ListUnitDisplay index = {8}/>
                        <ListUnitDisplay index = {9}/>
                        <ListUnitDisplay index = {10}/>
                    </div>
                </div>
            <h4 style={ {color: "red"}}>Please ensure that the ID is correct before purchasing.
            </h4>
            <p>            
                Please type in the Listing you would like to Purchase.
            </p>
                <input width = "5px" type = "number" id = "inputIDVal"></input>
                <br />
                <button className = "btn" onClick = {props.buyHandle}> 
                    Purchase This ID
                </button>
                <GlobalToolBar/>
            </div>
        )
    }

    return (
        <div>
            {
                props.isConnected ?
                <MarketPage />:
                <Navigate to = '/ee4032project' />
            }
        </div>
    )
}
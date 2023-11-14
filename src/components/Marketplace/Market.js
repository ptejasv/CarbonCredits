import { Navigate } from "react-router-dom";

import "./Market.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import { useEffect, useState } from "react";

export default function Market(props){
    const displayNum = 10;
    const[len, setLen] = useState(0);

    useEffect(() =>{ loadData();},[]);


    const Menu = () => {
        return (
            <div className = "market-menu">
                <div className = "market-listNumber">ID</div>
                <div className = "market-listCredits">Description</div>
                <div className = "market-listPrice">Quantity</div>
                <div className = "market-description">Price</div>
                <div className = "market-listOwner">Owner</div>
            </div>
        )
    }

    function loadData() {
        props.showMarketHandle()
        setLen(props.recordList.length)
    }


    const RecordDisplay = (propsDisplay) => {
        const curRecord = propsDisplay.record;
        // const recordNum = props.recordLen - curRecord.id;
        return (
            <div className = "market-elementInner">
                <div className = "market-listNumber">{curRecord[4]}</div>
                <div className = "market-listCredits">{curRecord[1]}</div>
                <div className = "market-listPrice">{curRecord[2]}</div>
                <div className = "market-description">{curRecord[3]}</div>
                <div className = "market-listOwner">{curRecord[0]}</div>
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
        const rows = []
        for (let i = 0; i <= len; i++){
            rows.push(<ListUnitDisplay index = {i}/>)
        }
        return (
            <div className = "market-background">
                <div className = "market">
                    <h1>Market Listing</h1>
                    <div className = "market-menuFramework">
                        <hr color = "black" width = "100%"/>
                        <Menu />
                        <hr color = "black" width = "100%"/>
                        {rows}
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
                <button className = "btn" onClick = {props.showMarketHandle}> 
                    Refresh
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
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import {useState} from 'react';

import "./market.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function History(props){
    
    const Menu = () => {
        return (
            <div className = "history-menu">
                <div className = "history-listNumber">ID</div>
                <div className = "history-listAccount">Description</div>
                <div className = "history-listOperation">Quantity</div>
                <div className = "history-listValue">Price</div>
                <div className = "history-listCost">Owner</div>
                <div className = "history-listValue">Buy</div>
            </div>
        )
    }

    const RecordDisplay = (propsDisplay) => {
        const curRecord = propsDisplay.record;
        // const recordNum = props.recordLen - curRecord.id;
        return (
            <div className = "history-elementInner">
                <div className = "history-listNumber">{curRecord[4]}</div>
                <div className = "history-listAccount">{curRecord[1]}</div>
                <div className = "history-listOperation">{curRecord[2]}</div>
                <div className = "history-listValue">{curRecord[3]}</div>
                <div className = "history-listCost">{curRecord[0].slice(0, 6)}...</div>
                <div className = "history-listValue"><button className = "btn" onClick = {() => props.buyHandle(curRecord[4])}>
                    Buy
                </button></div>
            </div>
        )
    }

    const ListUnitDisplay = (propsUnit) => {
        const unitIdx = propsUnit.index;
        return (
            <div className = "history-element">
                {
                    (unitIdx >= 0) && (unitIdx < props.marketRecordLen) ?
                    <RecordDisplay record = {props.recordList[unitIdx]}/>:
                    null
                }
            
            </div>
        )
    }

    const MarketPage = () => {
        const rows = []
        for (let i = 0; i < props.marketRecordLen; i++) {
            rows.push(<ListUnitDisplay index = {i}/>)
        }
        return (
            <div className = "history-background">
                <div className = "history">
                    <h1>Carbon Credits Market</h1> 
                    <button className = "refresh-market" onClick = {() => props.showHistory()}>
                        Refresh
                    </button>
                    <div className = "history-menuFramework">
                        <hr color = "black" width = "100%"/>
                        <Menu />
                        <hr color = "black" width = "100%"/>
                        {rows}
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
                <MarketPage />:
                <Navigate to = '/CarbonCreditsTrading' />
            }
        </div>
    )
}
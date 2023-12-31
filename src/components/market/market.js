import { Navigate } from "react-router-dom";

import "./market.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import market from '../../images/market.png';

export default function Market(props){

    const Menu = () => {
        return (
            <div className = "market-menu">
                <div className = "market-listNumber">ID</div>
                <div className = "market-listAccount">Description</div>
                <div className = "market-listOperation">Quantity</div>
                <div className = "market-listValue">Price(x0.01 ETH)</div>
                <div className = "market-listCost">Owner</div>
                <div className = "market-listBuy">&emsp;</div>
            </div>
        )
    }

    const RecordDisplay = (propsDisplay) => {
        const curRecord = propsDisplay.record;
        return (
            <div className = "market-elementInner">
                <div className = "market-listNumber">{curRecord[4]}</div>
                <div className = "market-listAccount">{curRecord[1]}</div>
                <div className = "market-listOperation">{curRecord[2]}</div>
                <div className = "market-listValue">{curRecord[3]}</div>
                <div className = "market-listCost">{curRecord[0].slice(0, 6)}...</div>
                <div className = "market-listBuy"><button className = "btn" onClick = {() => props.buyHandle(curRecord[4], curRecord[3])}>
                    Buy
                </button></div>
            </div>
        )
    }

    const ListUnitDisplay = (propsUnit) => {
        const unitIdx = propsUnit.index;
        return (
            <div className = "market-element">
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
            <div className = "market-background">
                <div className = "market">
                    <div> <img src= {market} width="150" height="150" /> </div>
                    <h1> Market </h1> 
                    <button className = "refresh-market" onClick = {() => props.showMarket()}>
                        Refresh
                    </button>
                    {props.error && <div className="error"> {props.error} </div>}
                    {props.status && <p className="buy-status"> {props.status} </p>}
                    <div className = "market-menuFramework">
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
                <Navigate to = '/CarbonCredits' />
            }
        </div>
    )
}
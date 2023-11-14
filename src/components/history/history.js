import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import {useState} from 'react';

import "./history.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function History(props){
    const displayNum = 10;
    const [len, setLen] = useState(0);

    useEffect(() => {
        loadData();
     }, []);

    function loadData() {
        props.showHistory()
        // len = props.recordList.length
        setLen(props.recordList.length)
    }

    const Menu = () => {
        return (
            <div className = "history-menu">
                <div className = "history-listNumber">ID</div>
                <div className = "history-listAccount">Description</div>
                <div className = "history-listOperation">Quantity</div>
                <div className = "history-listValue">Price</div>
                <div className = "history-listCost">Owner</div>
            </div>
        )
    }

    const RecordDisplay = (propsDisplay) => {
        const curRecord = propsDisplay.record;
        // const recordNum = props.recordLen - curRecord.id;
        return (
            <div className = "history-elementInner">
                {/* <div className = "history-listNumber">{curRecord.id}</div>
                <div className = "history-listAccount">{curRecord.address}</div>
                <div className = "history-listOperation">{curRecord.operation}</div>
                <div className = "history-listValue">{curRecord.value}</div>
                <div className = "history-listCost">{curRecord.cost}</div> */}
                {/* <div className = "history-listStatus">
                    <RecordStatusDisplay record = {curRecord}/>
                </div> */}
                <div className = "history-listNumber">{curRecord[4]}</div>
                <div className = "history-listAccount">{curRecord[1]}</div>
                <div className = "history-listOperation">{curRecord[2]}</div>
                <div className = "history-listValue">{curRecord[3]}</div>
                <div className = "history-listCost">{curRecord[0]}</div>
            </div>
        )
    }

    const ListUnitDisplay = (propsUnit) => {
        const unitIdx = propsUnit.index - 1;
        return (
            <div className = "history-element">
                {
                    // props.recordLen >= index ?
                    (unitIdx >= 0) && (unitIdx < len) ?
                    <RecordDisplay record = {props.recordList[unitIdx]}/>:
                    null
                }
            </div>
        )
    }

    const HistoryPage = () => {
        const rows = []
        for (let i = 0; i <= len; i++) {
            rows.push(<ListUnitDisplay index = {i}/>)
        }
        return (
            <div className = "history-background">
                <div className = "history">
                    <h1>Carbon Credits Market</h1> 
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
                <HistoryPage />:
                <Navigate to = '/InterfaceDemo' />
            }
        </div>
    )
}
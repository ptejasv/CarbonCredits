import { Navigate } from "react-router-dom";

import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import fox from '../../images/fox.png';
import list from '../../images/list.png';

export default function Profile(props){

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
        return (
            <div className = "history-elementInner">
                <div className = "history-listNumber">{curRecord[4]}</div>
                <div className = "history-listAccount">{curRecord[1]}</div>
                <div className = "history-listOperation">{curRecord[2]}</div>
                <div className = "history-listValue">{curRecord[3]}</div>
                <div className = "history-listCost">(You)</div>
            </div>
        )
    }

    const ListUnitDisplay = (propsUnit) => {
        const unitIdx = propsUnit.index;
        return (
            <div className = "history-element">
                {
                    (unitIdx >= 0) && (unitIdx < props.userListingsLen) ?
                    <RecordDisplay record = {props.allUserListings[unitIdx]}/>:
                    null
                }
            </div>
        )
    }

    const ProfilePage = () => {
        props.showCredits();
        const rows = []
        for (let i = 0; i < props.userListingsLen; i++) {
            rows.push(<ListUnitDisplay index = {i}/>)
        }
        return (
            
        <div className = "profile-background">
            <div className = "profile">
                <div className = "profile-account">
                        <div className = "fox-icon"> <img src= {fox} width="40" height="40" />  Profile </div>   
                        <hr color = "black"/>                    
                        🏠 Address:&nbsp;
                        <span className = "global-message">{props.address.slice(0, 10)}.....</span>
                        <br/>
                        💰 Credits owned:&nbsp;
                        <span className = "global-message">{props.credits}</span>
                        <br/>
                        💎 Balance (Eth):&nbsp;
                        <span className = "global-message">{props.balance.slice(0, 5)}</span>
                </div> 
            </div> 
             
            <div className = "profile">
                <button className = "refresh-profile" onClick = {() => props.showListings()}>
                            Refresh
                </button>
                <div className = "listings-header"> <img src= {list} width="40" height="40" /> My Listings </div> 
                    
                    <div className = "history-menuFramework">
                        <br/>
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
                <ProfilePage />:
                <Navigate to = '/CarbonCredits' />
            }
        </div>
    )
}
import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./MyListings.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';

export default function MyListings(props){

    // Displays up to 10 listings 
    const displayNum = 10;

    const MyListingsMenu = () => {
        return (
            <div className = "mylisting-menu">
                <div className = "mylistingID">ID#</div>
                <div className = "mylistingCredits">Credits</div>
                <div className = "mylistingPrice">Price</div>
                <div className = "mylistingDescription">Description</div>
            </div>
        )
    }


    const RecordDisplay = (propsDisplay) => {
        const curRecord = propsDisplay.record;
        // const recordNum = props.recordLen - curRecord.id;
        return (
            <div className = "mylist-elementInner">
                <div className = "mylistingID">{curRecord.id}</div>
                <div className = "mylistingCredits">{curRecord.operation}</div>
                <div className = "mylistingPrice">{curRecord.value}</div>
                <div className = "mylistingDescription">{curRecord.cost}</div>
            </div>
        )
    }

    const MyListingsUnitDisplay = (propsUnit) => {
        const index = propsUnit.index;
        const unitIdx = props.recordMyListingsLen - displayNum + index;
        return (
            <div className = "market-element">
                {
                    // props.recordLen >= index ?
                    unitIdx >= 1 ?
                    <RecordDisplay record = {props.recordMyListings[unitIdx]}/>:
                    null
                }
            </div>
        )
    }

    const MyListingsTitle = () => {

        return (
            <div> <h1> My Listings </h1></div>
        )
    }

    const MyListingsPage = () => {
        return (
            
            <div className = "MyListings-background">
                <div className = "mylisting"></div>
                    <MyListingsTitle/>
                    <div className = "mylisting-menuFramework">
                        <hr color = "black" width = "100%"/>
                        <MyListingsMenu />
                        <hr color = "black" width = "100%"/>
                        <MyListingsUnitDisplay index = {1}/>
                        <MyListingsUnitDisplay index = {2}/>
                        <MyListingsUnitDisplay index = {3}/>
                        <MyListingsUnitDisplay index = {4}/>
                        <MyListingsUnitDisplay index = {5}/>
                        <MyListingsUnitDisplay index = {6}/>
                        <MyListingsUnitDisplay index = {7}/>
                        <MyListingsUnitDisplay index = {8}/>
                        <MyListingsUnitDisplay index = {9}/>
                        <MyListingsUnitDisplay index = {10}/>
                    </div>
                <br />
                {/* <h3 style={ {color: "red"}}>Please ensure that the ID is correct before removing.
                </h3>
                <p> Enter the ID of the listing you would like to remove. </p>
                <input width = "5px" type = "number" id = "inputIDVal"></input>
                <br />
                <button className = "btn" onClick={props.removeListingHandle}>
                    Remove
                </button>

                <button className = "btn" onClick = {props.showMyListingsHandle}> 
                    Refresh
                </button> */}

                <GlobalToolBar/>
            </div>
        )
    }

    return (
        <div>
            {
                props.isConnected ?
                <MyListingsPage />:
                <Navigate to = '/ee4032project' />
            }
        </div>
    );
}
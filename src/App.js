import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";

import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";
import Market from "./components/Marketplace/Market";
import Sell from "./components/sell/sell";
import MyListings from "./components/MyListings/MyListings";
import { id } from "ethers/lib/utils";

export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
    const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
    const [network, setNetwork] = useState(null);               // network the account is using. 
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 
    const [storedPending, setStoredPending] = useState(false);        // check if a value is pending. 
    const [storedDone, setStoredDone] = useState(false);        // check if a value is stored. 
    // eslint-disable-next-line
    const [storedVal, setStoredVal] = useState(0);              // value that is stored right now. 
    const [showVal, setShowVal] = useState(0);                  // value that is showed on screen. 

    const [historyRecord, setHistoryRecord] = useState(null);   // record of history operations. 
    const [recordLen, setRecordLen] = useState(0);              // length of record. 
    const maxRecordLen = 50;                                    // maximum length of record list. 

    const [marketRecord, setMarketRecord] = useState(null);       // record of market.
    const [marketlistLen, setListLen] = useState(0);              // length of record.
    const maxListLen = 50;                                        // maximum length of record list. 
    const [listPending, setListPending] = useState(false);        // check if a value is pending. 
    const [listDone, setListDone] = useState(false);              // check if a value is stored.

    // Sell.js
    // const [price, setPrice] = useState(0);                     // Selling Price
    // const [credits, setCredits] = useState(0);                 // Amount of credits to be sold
    // const [description, setDescription] = useState('');        // Description of listing
    const [ListingPending, setListingPending] = useState(false);        // check if a listing is pending. 
    const [ListingPublished, setListingPublished] = useState(false); // check if a listing is published
    const [SellInfo, setSellInfo] = useState({price:"", credits:"", description: "",});
    
    

    // MyListings.js
    const [MyListingsRecord, setMyListingsRecord] = useState(null);       // record of market.
    const [MyListingsLen, setMyListingsLen] = useState(0);              // length of record.
    const maxMyListingsLen = 50;                                        // maximum length of My Listings list to be displayed 
    const [MyListingsPending, setMyListingsPending] = useState(false);        // check if a value is pending. 
    const [MyListingsDone, setMyListingsDone] = useState([]);              // check if a value is stored.
    const [ListingID, setListingsID] = useState(-1);                    // listing ID

    const navigate = useNavigate();
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    
    // useEffect(() => {
    //     const { ethereum } = window;
    //     const checkMetamaskAvailability = async () => {
    //         if (!ethereum) {
    //             setHaveMetamask(false);
    //         }
    //         setHaveMetamask(true);
    //     };
    //     checkMetamaskAvailability();
    // }, []);

////// connect to MetaMask. 

    const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'. 
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balanceVal);

            console.log(chainId);
            if (chainId === '0x3'){
                setNetwork('Ropsten Test Network');
            }
            else if (chainId === '0x5'){
                setNetwork('Goerli Test Network');
            }
            else if (chainId === '0xaa36a7'){
                setNetwork('Sepolia Test Network');
            }
            else {
                setNetwork('Other Test Network');
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);
            

            navigate('/ee4032project/profile');
        }
        catch (error){
            setIsConnected(false);
        }
    }


////// Contract Deployment. 
    // IMPORTANT: async / await is essential to get values instead of Promise. 
    const storeData = async (inputVal) => {
        const res = await contract.methods.set(inputVal).send({from: address});
        return res;
    }

    const getData = async () => {
        const res = await contract.methods.get().call();
        return res;
    }

    /// New contract functions put here 1st
    const userData = async () => {
        const res = await contract.methods.registerUser(address).send();
        return res;
    }
    const buyListing = async (inputList) => {
        const res = await contract.methods.purchaseListing(inputList).send({from: address});
        return res;
    }

    const getCCBalance = async () => {
        const res = await contract.methods.getUserCredits().call();
        return res;
    }

    const showMarketList = async () => {
        const res = await contract.methods.viewListings(recordLen).call();
        return res
    }

    // Get all of a user's listings from BC
    const getMyListings = async () => {
        const res = await contract.methods.viewMyListings().call();
        return res;
    }


////// history recording. 
    const RecordOverFlow = () => {
        if (recordLen > maxRecordLen){
            let outlierNum = recordLen - maxRecordLen;
            setHistoryRecord(current => current.splice(1, outlierNum));
            setRecordLen(maxRecordLen);
        }
    }

    const RecordPush = (opr, val, detail) => {
        let stat = 1;
        let cost = 0;
        if (val.length === 0){
            val = 'NA';
            cost = 'NA';
            stat = 0;
        }
        else{
            if (opr === 'get'){
                cost = 0;
                stat = 1;
            }
            else{
                if (detail === 'null'){
                    setStoredPending(false);
                    setStoredDone(true);
                    console.log('Rejected');
                    cost = 'NA';
                    stat = 2;
                }
                else{
                    setStoredDone(true);
                    console.log('Done');
                    console.log(detail);    // show the details of transaction. 
                    cost = detail.gasUsed;
                    stat = 1;
                }
            }
        }

        const newRecord = {
            id: recordLen + 1, 
            address: address, 
            operation: opr, 
            value: val, 
            cost: cost, 
            status: stat
        };
        if (recordLen === 0){
            setHistoryRecord([newRecord, newRecord]);
        }
        else{
            setHistoryRecord(current => [...current, newRecord]);
        }
        setRecordLen(recordLen + 1);

        if (recordLen > maxRecordLen){
            RecordOverFlow();
        }
    }

    // For My listing, stored inputs come from sell page
    const storedInputs = async () => {
        const inputElement = document.getElementById('inputVal2').value;

        if (!inputElement) {
            console.error('Input element with ID "inputVal2" not found in the DOM');
            return;
        }
    
        const inputVal = inputElement.value;
        setMyListingsPending(false);
        setMyListingsDone(false);

        if (inputVal.length === 0) {
            const detail = 'null';
            RecordPush('store', inputVal, detail);
        }
        else {
            setStoredVal(inputVal);
            
            try{
                const detail = await MarketListing(inputVal);   // contract deployed. 
                RecordPush('store', inputVal, detail);      // recorded. 
            }
            catch(err){
                const detail = 'null';                      // no detail info. 
                RecordPush('store', inputVal, detail);      // recorded. 
            }
        }

    }
    

////// store and get value. 
    const storedValUpdate = async () => {
        const inputVal = document.getElementById('inputVal').value;
        setStoredPending(false);
        setStoredDone(false);

        if (inputVal.length === 0) {
            const detail = 'null';
            RecordPush('store', inputVal, detail);
        }
        else {
            setStoredPending(true);
            setStoredVal(inputVal);
            
            try{
                const detail = await storeData(inputVal);   // contract deployed. 
                RecordPush('store', inputVal, detail);      // recorded. 
            }
            catch(err){
                const detail = 'null';                      // no detail info. 
                RecordPush('store', inputVal, detail);      // recorded. 
            }
        }
    }

    const showValUpdate = async () => {
        const ans = await getData();
        setStoredPending(false);
        setStoredDone(false);

        setShowVal(ans);
        RecordPush('get', ans);
    }

    


//////////////////// new functions.//////////////////////////

////// Market Listing. 
const MarketListing = () => {
    if (recordLen > maxRecordLen){
        let outlierNum = recordLen - maxRecordLen;
        setMarketRecord(current => current.splice(1, outlierNum));
        setListLen(maxListLen);
    }
}

const ListPush = (id, cred, prc, descrp) => {
    setListDone(true);
    console.log('Done');

    const newRecord = {
        id: id, 
        credit: cred,  
        price: prc, 
        description: descrp, 
        address: address, 
    };
    if (recordLen === 0){
        setMarketRecord([newRecord, newRecord]);
    }
    else{
        setMarketRecord(current => [...current, newRecord]);
    }
    setListLen(recordLen + 1);

    if (recordLen > maxRecordLen){
        MarketListing();
    }
}

const purchaseList = async () => {
    const inputList = document.getElementById('inputList');
    setListPending(false);
    setListDone(false);
    try{
        if (inputList.length == 0) {
            <h3>You did not select anything</h3>
        }
        else {
            setListPending(true);
            try{
                const detail = await buyListing(inputList);   // contract deployed. 
            }
            catch(err){
                const detail = 'null';                      // no detail info.  
            }
        }
    }
    catch(err){}
}
  
const showMarket = async () => {
    const ans = await showMarketList();
    ListPush(ans);
}

////////////////////////// Sell functions////////////////////////////////////////////////////////////////////////////////////////////////////////
const onSell = (e) => {
    // Pass the values to the parent component using onSell prop
    const {name,value} = e.target;
    setSellInfo((prev) => {
        return {...prev, [name]: value}
    });       
    
};
console.log(SellInfo); 

const getNewListingID = async (description, credits, price) => { 
    const res = await contract.methods.makeListing(description, credits, price).send({from: address});
    return res;
}

// Publish sell listing to blockchain 
const publishMyListingtoBC = async () => {

    // publish to bc, Get id back
    const listingID = getNewListingID(SellInfo[2], SellInfo[1], SellInfo[0]);

    // Get newly published listing from BC
    const newListing = await contract.methods.viewListingDetails(listingID).call();

    // Assuming the result includes the new listing 
    const newListingWithID = {listingID, 'description': newListing[2], 'credits': newListing[1], 'price':newListing[0]};

    // Update the listings state with the new listing
    MyListingsRecord((prevListings) => [...prevListings, newListingWithID]);

    // Return true or any confirmation if needed
    return true;
}





////// My listings
/// Remove a listing and refresh the page
// const MyListingUpdate = async () => {
//     const inputID = document.getElementById('inputID').value;
//     setMyListingsPending(false);
//     setMyListingsDone(false);

//     if (inputID === 0) {
//         const detail = 'null';
//         RecordPush('store', inputID, detail);
//     }
//     else {
//         setMyListingsPending(true);
//         setMyListingsDone(inputID);
        
//         try{
//             const detail = await storeData(inputID);   // contract deployed. 
//             RecordPush('store', inputID, detail);      // recorded. 
//         }
//         catch(err){
//             const detail = 'null';                      // no detail info. 
//             RecordPush('store', inputID, detail);      // recorded. 
//         }
//     }
// }

const ShowMyListings = () => {

    let outlierNum = MyListingsLen - maxMyListingsLen;
    setMyListingsRecord(current => current.splice(1, outlierNum));
    setMyListingsLen(maxMyListingsLen);
}

const AddMyNewListing = (descrp, qty, prc, id ) => {
    setMyListingsDone(true);

    const newRecord = {
        id: getNewListingID(), // the listing id, not index
        description: descrp,
        price: prc, 
        credit: qty,  
        
    };

    if (MyListingsRecord === 0){
        setMyListingsRecord([newRecord, newRecord]);
    }
    else{
        setMyListingsRecord(current => [...current, newRecord]);
        setMyListingsLen(MyListingsLen + 1);
    }
    

    if (MyListingsLen > maxMyListingsLen){
        ShowMyListings();
    }
}

// const cancelMyListing = async () => {
//     const ListingID = document.getElementById('inputIDToRemove');
//     setMyListingsPending(false);
//     setMyListingsDone(false);
//     try{
//         if (ListingID < 0 ) {
//             <h3>You have selected invalid ID, or it has already been removed</h3>
//         }
//         else {
//             setMyListingsPending(true);
//             try{
//                 const detail = await removeMyListing(ListingID);   // contract deployed.
//                 setMyListingsDone(true); 
//             }
//             catch(err){
//                 const detail = 'null';                      // no detail info.  
//             }
//         }
//     }
//     catch(err){}
// }
  
const showMyListingsUpdate = async () => {
    const ans = await getMyListings();
    setShowVal(ans);
    AddMyNewListing(ans);
}

////// display functions. 
    const ProfileDisplay = () => {
        return (
            <Profile 
                isConnected = {isConnected}
                address = {address} 
                networkType = {network} 
                balance = {balance}
                carbonCredits = {getCCBalance}
            />
        )
    }

    const MarketDisplay = () => {
        return (
            <Market 
                isConnected = {isConnected}
                recordList = {marketRecord}
                recordLen = {marketlistLen}
                showMarketHandle = {showMarket} 
                buyHandle ={purchaseList}
            />
        )
    }

    const SellDisplay = () => {
        return (
            <Sell 
            
                isConnected = {isConnected}
                listNowPending = {ListingPending}
                listNowDone = {ListingPublished}
                handleSell={onSell}
                makeListingHandle={publishMyListingtoBC}
                // storeInputsHandle = {storedInputs}
            
            />
                
        )
    }

    const MyListingsDisplay = () => {
        return (

            <MyListings  

                isConnected = {isConnected}
                recordMyListings = {MyListingsRecord}
                recordMyListingsLen = {MyListingsLen}
                showMyListingsHandle = {showMyListingsUpdate} 

                ///You need the equivalent of storeValHandle = {storedValUpdate}  in StorageDisplay for the button to work
                //recordLen = {marketlistLen}

            />
        )
    }

    return (
        // <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/ee4032project" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />}></Route>
                    <Route path = "/ee4032project/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/ee4032project/Marketplace" element = {<MarketDisplay/>}></Route>
                    <Route path = "/ee4032project/Sell" element = {<SellDisplay/>}></Route>
                    <Route path = "/ee4032project/MyListings" element = {<MyListingsDisplay/>}></Route>
                </Routes>
            </div>
        // </BrowserRouter>s
    );
}


// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
pragma experimental ABIEncoderV2;

contract CarbonCredits {
    struct User {
        uint creditsOwned;
        uint creditsListed;
        bool init;
    }

    struct Listing {
        address owner;
        string description;
        uint quantity;
        uint price;
        uint id;
    }

    mapping(address => User) private allUsers;
    mapping(uint => uint) private listingIds;
    Listing[] public allListings; 
    uint private nextId = 0;
    uint public defaultCredits;
    bool public locked = false;

    event CreditsListed(uint id, address owner, uint quantity, uint price);
    event CreditsPurchased(uint id, address purchaser, address owner, uint quantity, uint price);

    constructor (uint _defaultCredits) {
        defaultCredits = _defaultCredits;
    }

    modifier newUser() {
        require(allUsers[msg.sender].init == false, "User already registered");
        _;
    }

    function registerUser() newUser public {
        allUsers[msg.sender] = User(defaultCredits, 0, true);
    }

    function getUserCredits() public view returns (uint) {
        return allUsers[msg.sender].creditsOwned;
    }

    modifier validListing(uint _quantity, uint _price) {
        require(_quantity > 0, "Must list more than 0 credits.");
        require(_price >= 0, "Price of listing cannot be negative");
        _;
    }

    modifier sufficientCredits(uint _quantity) {
        require(_quantity < allUsers[msg.sender].creditsOwned - allUsers[msg.sender].creditsListed, "Insufficient credits to make this listing.");
        _;
    }

    function makeListing(string memory _description, uint _quantity, uint _price) public 
            validListing(_quantity, _price) sufficientCredits(_quantity) returns (uint) {
        allListings.push(Listing(msg.sender, _description, _quantity, _price, nextId));
        listingIds[nextId] = allListings.length;
        emit CreditsListed(nextId, msg.sender, _quantity, _price);
        nextId++;
        allUsers[msg.sender].creditsListed = allUsers[msg.sender].creditsListed + _quantity;
        return nextId - 1; // id of the new listing
    }

    function viewListings() public view returns (Listing[] memory) {
        return allListings;
    }

    modifier validId(uint id) {
        require((id >= 0) && (listingIds[id] > 0), "Listing ID not found.");
        _;
    }

    function viewListingDetails(uint id) public view validId(id) returns (Listing memory) {
        return allListings[listingIds[id] - 1];
    }

    function viewUserListings() public view returns (Listing[] memory) {
        // will not show deleted listings
        uint count = 0;
        for (uint i = 0; i < allListings.length; i++) {
            if (allListings[i].owner == msg.sender) count++;
        }
        Listing[] memory userListings = new Listing[](count);
        uint idx = 0;
        for (uint i = 0; i < allListings.length; i++) {
            if (allListings[i].owner == msg.sender) {
                userListings[idx] = allListings[i];
                idx++;
            }
        }
        return userListings;
    }

    function deleteListing(uint id) private validId(id) {
        uint idx = listingIds[id] - 1;
        for (uint i = idx; i < allListings.length; i++) {
            listingIds[allListings[i].id] = listingIds[allListings[i].id] - 1;
        }
        for (uint i = idx; i < allListings.length - 1; i++) {
            allListings[i] = allListings[i + 1];
        }
        listingIds[id] = 0; // reset this to reflect deletion
        allListings.pop();
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy.");

        locked = true;
        _;
        locked = false;
    }

    function purchaseListing(uint id) public noReentrancy validId(id) returns (bool) {
        uint idx = listingIds[id] - 1;
        (bool sent, bytes memory data) = allListings[idx].owner.call{value: allListings[idx].price}(""); // send ether to listing owner
        allUsers[msg.sender].creditsOwned = allUsers[msg.sender].creditsOwned + allListings[idx].quantity; // transfer credits to purchaser
        allUsers[allListings[idx].owner].creditsOwned = allUsers[allListings[idx].owner].creditsOwned - allListings[idx].quantity; // deduct credits from owner
        allUsers[allListings[idx].owner].creditsListed = allUsers[allListings[idx].owner].creditsListed - allListings[idx].quantity;

        emit CreditsPurchased(id, msg.sender, allListings[idx].owner, allListings[idx].quantity, allListings[idx].price);
        deleteListing(id);

        return sent;
    }
}
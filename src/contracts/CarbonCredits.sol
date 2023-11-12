// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract CarbonCredits {
    struct Listing {
        address owner;
        string description;
        uint quanitity;
        uint price;
    }

    mapping(address => uint) public allUsers;
    Listing[] public allListings; // index = listing ID
    uint public defaultCredits = 100;
    bool public locked = false;

    event CreditsListed(uint id, address owner, uint quantity, uint price);
    event CreditsPurchased(uint id, address purchaser, address owner, uint quantity, uint price);
    // event CreditsDeleted(uint id, address owner);

    constructor (uint _defaultCredits) {
        defaultCredits = _defaultCredits;
    }

    modifier newUser() {
        require(allUsers[msg.sender] == 0, "User already registered");
        _;
    }

    function registerUser() newUser public {
        // overloaded if no credit value is provided, use default
        allUsers[msg.sender] = defaultCredits;
    }

    function getUserCredits() public view returns (uint) {
        return allUsers[msg.sender];
    }

    modifier validListing(uint _quantity, uint _price) {
        require(_quantity > 0, "Must list more than 0 credits.");
        require(_price >= 0, "Price of listing cannot be negative");
        _;
    }

    modifier sufficientCredits(uint _quantity) {
        require(_quantity < allUsers[msg.sender], "Insufficient credits to make this listing.");
        _;
    }

    function makeListing(string memory _description, uint _quantity, uint _price) public 
            validListing(_quantity, _price) sufficientCredits(_quantity) returns (uint) {
        allListings.push(Listing(msg.sender, _description, _quantity, _price));
        emit CreditsListed(allListings.length, msg.sender, _quantity, _price);
        return allListings.length; // id of the listing made
    }

    function viewListings() public view returns (Listing[] memory) {
        return allListings;
    }

    modifier validId(uint id) {
        require((id >= 0) && (id < allListings.length), "Listing ID not found.");
        _;
    }

    function viewListingDetails(uint id) public view validId(id) returns (Listing memory) {
        return allListings[id];
    }

    function deleteListing(uint id) private validId(id) {
        for (uint i = id; i < allListings.length - 1; i++) {
            allListings[i] = allListings[i + 1];
        }
        allListings.pop();
        // emit CreditsDeleted(id, msg.sender);
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy.");

        locked = true;
        _;
        locked = false;
    }

    // modifier noSelfBuy(uint id) {
    //     require(allListings[id].owner != msg.sender, "Cannot purchase your own listing.");
    //     _;
    // }

    function purchaseListing(uint id) public noReentrancy validId(id) returns (bool) {
        (bool sent, bytes memory data) = allListings[id].owner.call{value: allListings[id].price}(""); // send ether to listing owner
        allUsers[msg.sender] = allUsers[msg.sender] + allListings[id].price; // transfer credits to purchaser
        allUsers[allListings[id].owner] = allUsers[allListings[id].owner] - allListings[id].price; // deduct credits from owner

        emit CreditsPurchased(id, msg.sender, allListings[id].owner, allListings[id].quanitity, allListings[id].price);
        deleteListing(id);

        return sent;
    }
}
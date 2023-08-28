// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Wildpatron{

    using Counters for Counters.Counter;

    event AnimalAdded(bytes32 animalId, address initiator);
    event WithdrawFunds(bytes32 animalId, address initiator, uint256 amount);
    event FundsDonated(bytes32 animalId, address donor, uint256 amount);

    Counters.Counter public _animalCount;

    struct Animal {
        string title;
        string description;
        address recipient;
        uint totalRaised;
        uint balance;
    }

     // Mapping to store animals

    mapping(bytes32 => Animal) public _animals;
    // allows us to keep track of the who donates to a campaign and the amount they donated
    mapping(address=>mapping(bytes32=>uint256)) public userDonations;

    constructor(){

    }

    function generateAnimalId(address recipient, string calldata title, string calldata description) public pure returns(bytes32) {
        bytes32 animalId = keccak256(abi.encodePacked(title, description, recipient ));
        return animalId;
    }

    function AddAnimal(string calldata title, string calldata description, address recipient ) public {
        
        bytes32 animalId = generateAnimalId( recipient, title, description);
       
        Animal storage animal = _animals[animalId];
        animal.title  = title ;
        animal.description = description;
        animal.recipient = recipient;
        animal.totalRaised = 0;
        _animalCount.increment();
         emit AnimalAdded(animalId, recipient);
    }

    function donate(bytes32 animalId, uint256 amount) public payable {
    Animal storage animal = _animals[animalId];

    require(amount > 0, "Donation amount must be greater than 0");
    require(msg.value == amount, "Incorrect ETH value");

    animal.totalRaised += amount;
    animal.balance += amount;

    userDonations[animal.recipient][animalId] += amount;

    emit FundsDonated(animalId, animal.recipient, amount);
    }


    function getAnimal(bytes32 animalId) public view  returns(Animal memory){
        return _animals[animalId];
    }

    function WithdrawAnimalFunds(bytes32 animalId) public {
        Animal storage animal =_animals[animalId];

        require(msg.sender == animal.recipient, "not recipient");
        require(animal.balance > 0, "no funds to withdraw");

        uint256 amountToWithdraw = animal.balance;

        animal.balance = 0;

        payable(animal.recipient).transfer(amountToWithdraw);

        emit WithdrawFunds(animalId, animal.recipient, amountToWithdraw);

    }
}


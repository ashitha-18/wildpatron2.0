/*
// Connect to the Ethereum network using Web3.js
const web3 = new Web3(Web3.givenProvider);

// Replace with your contract address
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [];

/*
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function displayAnimals() {
    const animalCount = await contract.methods._animalCount().call();

    const animalListDiv = document.getElementById('animalList');
    animalListDiv.innerHTML = '';

    for (let i = 0; i < animalCount; i++) {
        const animalId = await contract.methods.generateAnimalId(
            await contract.methods._animals(Object.keys(await contract.methods._animals)[i]).call().recipient,
            await contract.methods._animals(Object.keys(await contract.methods._animals)[i]).call().title,
            await contract.methods._animals(Object.keys(await contract.methods._animals)[i]).call().description
        ).call();
        const animal = await contract.methods.getAnimal(animalId).call();

        const animalDiv = document.createElement('div');
        animalDiv.innerHTML = `
            <h2>${animal.title}</h2>
            <p>${animal.description}</p>
            <p>Recipient: ${animal.recipient}</p>
            <p>Total Raised: ${web3.utils.fromWei(animal.totalRaised.toString(), 'ether')} ETH</p>
            <p>Balance: ${web3.utils.fromWei(animal.balance.toString(), 'ether')} ETH</p>
            <input type="number" id="donationAmount${i}" placeholder="Enter donation amount (ETH)">
            <button onclick="donate('${animalId}', ${i})">Donate</button>
            <hr>
        `;

        animalListDiv.appendChild(animalDiv);
    }
}

async function donate(animalId, index) {
    const donationAmount = document.getElementById(`donationAmount${index}`).value;
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }

    const weiAmount = web3.utils.toWei(donationAmount, 'ether');

    try {
        await contract.methods.donate(animalId).send({ value: weiAmount });
        alert('Donation successful!');
        displayAnimals();
    } catch (error) {
        console.error(error);
        alert('An error occurred while donating.');
    }
}

window.onload = () => {
    displayAnimals();
};
*/

import { useState } from "react";
import { ethers } from "ethers";
import Wildpatron from "artifacts/contracts/wildpatron.sol/Wildpatron.json";
import "./App.css"

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the actual contract address

function App() {
  const [value, setValue] = useState();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      // MetaMask is connected
      const selectedAddress = window.ethereum.selectedAddress;
      console.log(`Connected to MetaMask with address: ${selectedAddress}`);
    } else {
      // MetaMask is not connected
      console.log('MetaMask is not connected');
    }
  }, []);

  async function connectToMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const Accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAddress(Accounts[0]);
        console.log('Connected to MetaMask!', Accounts);
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function disconnectFromMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Disconnect from MetaMask
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        console.log('Disconnected from MetaMask!');
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.error(error);
    }  
}
}





import React, { useState, useEffect } from 'react';
import IncrementDecrement from "/home/ashi_unix/wildpatron2.0/frontend/src/Wildpatron.json";
import ContractInteraction from './contractInteract';
import { ethers } from 'ethers';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const handleAddAnimalsFromJSON = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  try {
    if (!contractAddress || !signer) {
      console.error('Contract address or signer is not defined.');
      return;
    }

    console.log('Adding animals from JSON');

    // Create ContractInteraction instance
    const contractHelper = ContractInteraction(contractAddress, signer);

    // Call the addAnimalsFromJSON function with the JSON file path
    await contractHelper.addAnimalsFromJSON('/path/to/animals.json');

    console.log('Animals added from JSON');
  } catch (error) {
    console.error(error);
  }
};

function DataDisplay({ animals, contractHelper }) {
  const [donationAmount, setDonationAmount] = useState(0); // Initialize with a default value

  const handleDonate = async (animalId) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractHelper = ContractInteraction(contractAddress, signer);
    if (donationAmount <= 0) {
      console.error('Please enter a valid donation amount.');
      return;
    }

    try {
      await contractHelper.donate(animalId, donationAmount);
      console.log(`Donated ${donationAmount} to animal with ID ${animalId}`);
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  return (
    <div>
    <div>
        <h1>Animals and Donations</h1>
        <button onClick={handleAddAnimalsFromJSON}>Add Animals From JSON</button>
        
      </div>



    <div>
      <h1>JSON Data Display</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <strong>Name:</strong> {animal.title}
            <strong>description:</strong> {animal.description}
            <strong>address:</strong> {animal.address}
            <input
              type="number"
              placeholder="Enter amount"
              onChange={(e) => setDonationAmount(Number(e.target.value))}
            />
            <button onClick={() => handleDonate(animal.id)}>Donate</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default DataDisplay;
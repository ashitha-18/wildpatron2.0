import { ethers } from 'ethers';
import Wildpatron from "/home/ashi_unix/wildpatron2.0/frontend/src/Wildpatron.json";

const ContractInteraction = (contractAddress, signer) => {
  const contract = new ethers.Contract(contractAddress, Wildpatron.abi, signer);

  const addAnimal = async (title, description, address) => {
    try {
      const tx = await contract.AddAnimal(title, description, address);
      await tx.wait(); // Wait for the transaction to be mined

      console.log(`Added animal: ${title}`);
    } catch (error) {
      console.error('Error adding animal:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };

  const addAnimalsFromJSON = async (jsonFilePath) => {
    try {
      const animalsData = require(jsonFilePath); // Load the JSON file

      for (const animal of animalsData) {
        const { title, description, address } = animal;
        await addAnimal(title, description, address);
      }

      console.log('All animals added successfully');
    } catch (error) {
      console.error('Error adding animals from JSON:', error);
    }
  };

  const donate = async (animalId, amount) => {
    try {
      const animal = await contract._animals(animalId);

      const amountToDonate = ethers.utils.parseEther(amount.toString()); // Convert amount to wei
      const tx = await contract.donate(animalId, { value: amountToDonate });

      await tx.wait(); // Wait for the transaction to be mined

      console.log(`Donated ${ethers.utils.formatEther(amountToDonate)} ETH to animal ${animalId}`);
    } catch (error) {
      console.error('Error donating:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };

  const getAnimal = async (animalId) => {
    try {
      const animal = await contract.getAnimal(animalId);
      return animal;
    } catch (error) {
      console.error('Error getting animal:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };

  // Export functions for use in other components
  return {
    addAnimal,
    addAnimalsFromJSON,
    donate,
    getAnimal,
  };
};

export default ContractInteraction;

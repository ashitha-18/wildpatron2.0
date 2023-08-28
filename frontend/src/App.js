import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
//import { ethers } from 'ethers';

import DataDisplay from './components/DataDisplay';
//import IncrementDecrement from "/home/ashi_unix/wildpatron2.0/frontend/src/Wildpatron.json";
import "./App.css"

import jsonData from '/home/ashi_unix/wildpatron2.0/frontend/src/animals.json';

//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Function to interact with the smart contract

function App() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(false);

  

  useEffect(() => {
    setData(jsonData);
  }, []);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      const selectedAddress = window.ethereum.selectedAddress;
      console.log(`Connected to MetaMask with address: ${selectedAddress}`);
      setAddress(selectedAddress);
      setConnected(true);

    } else {
      console.log('MetaMask is not connected');
      setConnected(false);
    }
  }, []);

  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAddress(accounts[0]);
        console.log('Connected to MetaMask!', accounts);
        setConnected(true);
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="App">
      <Row className="connectBtns">
        <Col>
          {!connected && (
            <Button className="btn" onClick={connectToMetaMask}>
              Connect To MetaMask
            </Button>
          )}
        </Col>
      </Row>

      {connected && (
        <Row className="display">
          <Col>
            <p className="key">
              Address: <span className="value">{address && `${address} connected!`}</span>
            </p>
          </Col>
        </Row>
      )}
    <h1>Animals and Donationss</h1>
      <Row>
        <Col>
          
          <DataDisplay animals={data} contractHelper />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

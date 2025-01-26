import React, { useState } from "react";
import { ethers } from "ethers";
import TokenABI from "../contract-data/GovToken.json";

const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Token() {
  const [delegatee, setDelegatee] = useState("");

  const delegateVotes = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        TokenABI.abi,
        signer
      );

      const tx = await tokenContract.delegate(delegatee);
      await tx.wait();
      alert("Votes delegated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delegate votes");
    }
  };

  return (
    <div>
      <h2>GovToken Contract</h2>
      <input
        placeholder="Delegatee Address"
        onChange={(e) => setDelegatee(e.target.value)}
      />
      <button onClick={delegateVotes}>Delegate Votes</button>
    </div>
  );
}

export default Token;

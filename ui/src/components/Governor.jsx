import React, { useState } from "react";
import { ethers } from "ethers";
import GovernorABI from "../contract-data/MyGovernor.json";
import CertABI from "../contract-data/Cert.json";

const GOVERNOR_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const CERT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function Governor() {
  const [certId, setCertId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");

  const propose = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const governorContract = new ethers.Contract(
        GOVERNOR_ADDRESS,
        GovernorABI.abi,
        signer
      );
      const certContract = new ethers.Contract(
        CERT_ADDRESS,
        CertABI.abi,
        signer
      );

      // 🌟 Encode the function call dynamically
      const functionCallData = certContract.interface.encodeFunctionData(
        "issue",
        [certId, name, course, grade, date]
      );

      const tx = await governorContract.propose(
        [CERT_ADDRESS],
        [0],
        [functionCallData],
        description
      );

      const receipt = await tx.wait();
      alert(
        `Proposal submitted successfully! Proposal ID: ${receipt.events[0].args.proposalId}`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to submit proposal");
    }
  };

  const vote = async (voteType) => {
    if (!window.ethereum) {
      alert("MetaMask is required");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const governorContract = new ethers.Contract(
        GOVERNOR_ADDRESS,
        GovernorABI.abi,
        signer
      );

      const tx = await governorContract.castVote(proposalId, voteType);
      await tx.wait();
      alert("Vote cast successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to cast vote");
    }
  };

  return (
    <div>
      <h2>Governor Contract</h2>
      <input
        placeholder="Certificate ID"
        onChange={(e) => setCertId(e.target.value)}
      />
      <input
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Course Name"
        onChange={(e) => setCourse(e.target.value)}
      />
      <input placeholder="Grade" onChange={(e) => setGrade(e.target.value)} />
      <input placeholder="Date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={propose}>Submit Proposal</button>

      <button onClick={() => vote(1)}>Vote For</button>
      <button onClick={() => vote(0)}>Vote Against</button>
    </div>
  );
}

export default Governor;

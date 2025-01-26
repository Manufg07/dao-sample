import React, { useState } from "react";
import { ethers } from "ethers";
import CertABI from "../contract-data/Cert.json";

const CERT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function Cert() {
  const [certId, setCertId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");

  const issueCertificate = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const certContract = new ethers.Contract(
        CERT_ADDRESS,
        CertABI.abi,
        signer
      );

      const tx = await certContract.issue(certId, name, course, grade, date);
      await tx.wait();
      alert("Certificate issued successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to issue certificate");
    }
  };

  return (
    <div>
      <h2>Cert Contract</h2>
      <input
        placeholder="Certificate ID"
        onChange={(e) => setCertId(e.target.value)}
      />
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Course" onChange={(e) => setCourse(e.target.value)} />
      <input placeholder="Grade" onChange={(e) => setGrade(e.target.value)} />
      <input placeholder="Date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={issueCertificate}>Issue Certificate</button>
    </div>
  );
}

export default Cert;

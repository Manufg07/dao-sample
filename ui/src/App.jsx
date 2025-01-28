// import { useState, useEffect } from "react";
// import * as React from "react";
// import { ethers, Contract, BrowserProvider } from "ethers";

// import {
//   CertAddr,
//   MyGovernorAddr,
// } from "./contract-data/deployedAddresses.json";
// import { abi as Govabi } from "./contract-data/MyGovernor.json";
// import { abi as Certabi } from "./contract-data/Cert.json";

// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Card,
//   CardActions,
//   CardContent,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";

// function App() {
//   const [loginState, setLoginState] = useState("Connect");
//   const [proposals, setProposals] = useState([]);
//   const [pDescription, setPDescription] = useState("");
//   const [proposalId, setProposalId] = useState("");
//   const [pState, setPState] = useState("");
//   const [open, setOpen] = useState(false);

//   const [provider, setProvider] = useState(null);

//   const connectMetaMask = async () => {
//     try {
//       const browserProvider = new BrowserProvider(window.ethereum);
//       setProvider(browserProvider);

//       const accounts = await browserProvider.send("eth_requestAccounts", []);
//       const signer = await browserProvider.getSigner();
//       const address = await signer.getAddress();

//       alert(`Successfully Connected: ${address}`);
//       setLoginState("Connected");
//     } catch (error) {
//       console.error("Error connecting MetaMask:", error);
//     }
//   };

// const handleProposalSubmit = async () => {
//   if (!provider) {
//     alert("Please connect your wallet first.");
//     return;
//   }

//   const signer = await provider.getSigner();
//   const Govinstance = new Contract(MyGovernorAddr, Govabi, signer);
//   const Certinstance = new Contract(CertAddr, Certabi, signer);

//   const paramsArray = [104, "An", "EDP", "A", "25th June"];
//   const transferCalldata = Certinstance.interface.encodeFunctionData(
//     "issue",
//     paramsArray
//   );

//   try {
//     const proposeTx = await Govinstance.propose(
//       [CertAddr],
//       [0],
//       [transferCalldata],
//       pDescription
//     );
//     await proposeTx.wait();
//     console.log("Proposal transaction successful:", proposeTx.hash);

//     // Add a delay before fetching proposals
//     setTimeout(() => {
//       fetchProposals();
//     }, 5000); // 5-second delay

//     setOpen(false);
//   } catch (error) {
//     console.error("Error proposing transaction:", error);
//   }
// };

// const fetchProposals = async () => {
//   if (!provider) {
//     alert("Please connect your wallet first.");
//     return;
//   }

//   try {
//     const signer = await provider.getSigner();
//     const Govinstance = new Contract(MyGovernorAddr, Govabi, signer);

//     // Optionally, specify block range if needed
//     const currentBlock = await provider.getBlockNumber();
//     const filter = Govinstance.filters.ProposalCreated();

//     // Fetch events from the last N blocks or the entire history
//     const events = await Govinstance.queryFilter(
//       filter,
//       currentBlock - 500,
//       currentBlock
//     );

//     const fetchedProposals = events.map((event) => ({
//       id: event.args.proposalId.toString(),
//       description: event.args.description,
//     }));

//     setProposals(fetchedProposals);
//   } catch (error) {
//     console.error("Error fetching proposals:", error);
//   }
// };

//   const fetchProposalState = async () => {
//     if (!provider) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     try {
//       const signer = await provider.getSigner();
//       const Govinstance = new Contract(MyGovernorAddr, Govabi, signer);

//       const state = await Govinstance.state(proposalId);
//       setPState(state.toString());
//     } catch (error) {
//       console.error("Error fetching proposal state:", error);
//     }
//   };

//   useEffect(() => {
//     if (loginState === "Connected") fetchProposals();
//   }, [loginState]);

// const handlePDescriptionChange = (event) => {
//   const input = event.target.value;
//   if (input.trim() === "") {
//     alert("Description cannot be empty.");
//     return;
//   }
//   setPDescription(input);
// };
// useEffect(() => {
//   console.log("Proposals fetched:", proposals);
// }, [proposals]);


//   const handleProposalIdChange = (event) => {
//     setProposalId(event.target.value);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             DAO: Certi App
//           </Typography>
//           <Button color="inherit" onClick={connectMetaMask}>
//             <b>{loginState}</b>
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Box mt={2}>
//         <Button variant="outlined" onClick={() => setOpen(true)}>
//           New Proposal
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={fetchProposals}
//           style={{ marginLeft: "10px" }}
//         >
//           Fetch Proposals
//         </Button>
//       </Box>

//       <Box mt={4}>
//         <Typography variant="h5">Active Proposals</Typography>
//         <Grid container spacing={2}>
//           {proposals.map((proposal) => (
//             <Grid item xs={12} sm={6} md={4} key={proposal.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="body2">
//                     <b>Proposal ID:</b> {proposal.id}
//                   </Typography>
//                   <Typography variant="body2">
//                     <b>Description:</b> {proposal.description}
//                   </Typography>
//                   <Typography variant="body2">
//                     <b>Proposer:</b> {proposal.proposer}
//                   </Typography>
//                   <Typography variant="body2">
//                     <b>Created On:</b> {proposal.timestamp}
//                   </Typography>
//                   <Typography variant="body2">
//                     <b>State:</b> {proposal.state}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     variant="contained"
//                     onClick={() => setProposalId(proposal.id)}
//                   >
//                     Select
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       <Box mt={4}>
//         <Typography variant="h5">Check Proposal State</Typography>
//         <Box mt={2}>
//           <TextField
//             label="Proposal ID"
//             value={proposalId}
//             onChange={handleProposalIdChange}
//             fullWidth
//           />
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           style={{ marginTop: "10px" }}
//           onClick={fetchProposalState}
//         >
//           Check State
//         </Button>
//         {pState && (
//           <Typography variant="body1" mt={2}>
//             Current State: {pState}
//           </Typography>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Create New Proposal</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Description"
//             fullWidth
//             value={pDescription}
//             onChange={handlePDescriptionChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleProposalSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default App;

// import React from "react";
// import Cert from "./components/Cert";
// import Governor from "./components/Governor";
// import Token from "./components/Token";

// function App() {
//   return (
//     <div>
//       <h1>DAO Frontend</h1>
//       <Token />
//       <Governor />
//       <Cert />
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contracts } from "./config/contractData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [certContract, setCertContract] = useState(null);
  const [governorContract, setGovernorContract] = useState(null);
  const [proposalId, setProposalId] = useState(null);
  const [proposalState, setProposalState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [certificateData, setCertificateData] = useState({
    certId: "",
    name: "",
    program: "",
    grade: "",
    issueDate: "",
  });

useEffect(() => {
  const init = async () => {
    if (window.ethereum) {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signerInstance = await browserProvider.getSigner();

      if (!signerInstance) {
        toast.error("Failed to get signer. Please reconnect your wallet.");
        return;
      }

      setProvider(browserProvider);
      setSigner(signerInstance);

      setCertContract(
        new ethers.Contract(
          contracts.cert.address,
          contracts.cert.abi,
          signerInstance
        )
      );
      setGovernorContract(
        new ethers.Contract(
          contracts.governor.address,
          contracts.governor.abi,
          signerInstance
        )
      );

      fetchCertificates();
    } else {
      toast.error("Please install MetaMask.");
    }
  };
  init();
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData({ ...certificateData, [name]: value });
  };

  const delegateTokens = async () => {
    try {
      setLoading(true);
      const tokenContract = new ethers.Contract(
        contracts.govToken.address,
        contracts.govToken.abi,
        signer
      );

      const userAddress = await signer.getAddress();
      const tx = await tokenContract.delegate(userAddress);
      await tx.wait();

      toast.success("Tokens delegated successfully!");
    } catch (error) {
      console.error("Delegation Error:", error);
      toast.error("Failed to delegate tokens.");
    } finally {
      setLoading(false);
    }
  };

  const proposeCertificate = async () => {
    try {
      setLoading(true);
      const calldata = certContract.interface.encodeFunctionData("issue", [
        Number(certificateData.certId),
        certificateData.name,
        certificateData.program,
        certificateData.grade,
        certificateData.issueDate,
      ]);

      const tx = await governorContract.propose(
        [contracts.cert.address],
        [0],
        [calldata],
        `Issue certificate for ${certificateData.name}`
      );
      const receipt = await tx.wait();

      const events = await governorContract.queryFilter(
        governorContract.filters.ProposalCreated(),
        receipt.blockNumber
      );
      if (events.length > 0) {
        const newProposalId = events[0].args.proposalId;
        setProposalId(newProposalId);
        toast.success(`Proposal Created! ID: ${newProposalId}`);
        fetchProposalState(newProposalId, true);
      } else {
        toast.error("Proposal creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create proposal.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProposalState = async (id, autoRefresh = false) => {
    try {
      const state = await governorContract.state(id);
      const states = [
        "Pending",
        "Active",
        "Canceled",
        "Defeated",
        "Succeeded",
        "Queued",
        "Expired",
        "Executed",
      ];
      setProposalState(states[state]);

      if (autoRefresh && states[state] === "Pending") {
        setTimeout(() => fetchProposalState(id, true), 5000);
      } else if (states[state] === "Active") {
        toast.info("Proposal is now active for voting!");
      }
    } catch (error) {
      console.error("Error fetching proposal state:", error);
    }
  };

const checkVotingPower = async () => {
  try {
    if (!signer) {
      console.error("Error: Signer is not initialized.");
      toast.error("Wallet not connected. Please connect your wallet.");
      return false;
    }

    const tokenContract = new ethers.Contract(
      contracts.govToken.address,
      contracts.govToken.abi,
      signer
    );

    const userAddress = await signer.getAddress();
    console.log("User Address:", userAddress);

    const balance = await tokenContract.getVotes(userAddress);
    console.log("Raw Balance:", balance);

    if (!balance) {
      toast.error("You have no voting power. Delegate your tokens first.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking voting power:", error);
    toast.error("Failed to check voting power.");
    return false;
  }
};


 const voteOnProposal = async () => {
   if (!signer) {
     toast.error("Wallet not connected. Please connect your wallet.");
     return;
   }

   if (!proposalId) {
     toast.error("No active proposal to vote on.");
     return;
   }

   try {
     setLoading(true);

     const hasPower = await checkVotingPower();
     if (!hasPower) return;

     const tx = await governorContract.castVoteWithReason(
       proposalId,
       1, // 1 = "For"
       "Supporting certificate issuance",
       { gasLimit: 500000 }
     );
     await tx.wait();

     fetchProposalState(proposalId);
     toast.success("Vote cast successfully!");
   } catch (error) {
     console.error("Voting Error:", error);
     toast.error("Failed to cast vote.");
   } finally {
     setLoading(false);
   }
 };

  const executeProposal = async () => {
    if (!proposalId) return toast.error("No proposal to execute.");
    try {
      setLoading(true);
      const descriptionHash = ethers.keccak256(
        ethers.toUtf8Bytes(`Issue certificate for ${certificateData.name}`)
      );

      const tx = await governorContract.execute(
        [contracts.cert.address],
        [0],
        [
          certContract.interface.encodeFunctionData("issue", [
            Number(certificateData.certId),
            certificateData.name,
            certificateData.program,
            certificateData.grade,
            certificateData.issueDate,
          ]),
        ],
        descriptionHash
      );
      await tx.wait();
      fetchProposalState(proposalId);
      fetchCertificates();
      toast.success("Proposal executed, certificate issued!");
    } catch (error) {
      console.error("Execution Error:", error);
      toast.error("Execution failed.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      const certificatesList = [];
      for (let i = 1; i <= 10; i++) {
        try {
          const cert = await certContract.certificates(i);
          if (cert.name) {
            certificatesList.push({ id: i, ...cert });
          }
        } catch (error) {
          break;
        }
      }
      setCertificates(certificatesList);
    } catch (error) {
      toast.error("Error fetching certificates.");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h1 className="text-center">DAO Certificate Issuance</h1>

      <div className="row">
        <div className="col-md-6">
          <h3>Propose Certificate</h3>
          <input
            className="form-control mb-2"
            type="text"
            name="certId"
            placeholder="Certificate ID"
            onChange={handleInputChange}
          />
          <input
            className="form-control mb-2"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
          <input
            className="form-control mb-2"
            type="text"
            name="program"
            placeholder="Program"
            onChange={handleInputChange}
          />
          <input
            className="form-control mb-2"
            type="text"
            name="grade"
            placeholder="Grade"
            onChange={handleInputChange}
          />
          <input
            className="form-control mb-2"
            type="date"
            name="issueDate"
            onChange={handleInputChange}
          />
          <button
            className="btn btn-primary w-100"
            onClick={proposeCertificate}
            disabled={loading}
          >
            Propose
          </button>
          <button
            className="btn btn-success w-100 mt-2"
            onClick={voteOnProposal}
            disabled={loading || !proposalId}
          >
            Vote
          </button>
          <button
            className="btn btn-warning w-100 mt-2"
            onClick={executeProposal}
            disabled={loading || !proposalId}
          >
            Execute
          </button>
          <button
            className="btn btn-info w-100 mt-2"
            onClick={() => fetchProposalState(proposalId)}
          >
            Refresh Proposal State
          </button>

          {proposalId && (
            <div className="mt-3">
              <h5>Proposal ID: {proposalId.toString()}</h5>
              <h6>State: {proposalState}</h6>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h3>Certificates</h3>
          {certificates.length === 0 ? (
            <p>No certificates issued yet.</p>
          ) : (
            <ul className="list-group">
              {certificates.map((cert) => (
                <li key={cert.id} className="list-group-item">
                  {cert.id}: {cert.name} - {cert.program} - {cert.grade} (
                  {cert.issueDate})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

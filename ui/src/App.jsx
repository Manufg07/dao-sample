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


// App.jsx

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
  const [isCertificatesLoading, setIsCertificatesLoading] = useState(false);
  const [voteOption, setVoteOption] = useState("1");
  const [voteReason, setVoteReason] = useState("");
  const [currentProposal, setCurrentProposal] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [votingPower, setVotingPower] = useState(0);

  const [certificateData, setCertificateData] = useState({
    certId: "",
    name: "",
    course: "",
    grade: "",
    date: "",
  });

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          const signerInstance = await browserProvider.getSigner();

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
        } catch (error) {
          toast.error("Error connecting to wallet: " + error.message);
        }
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

  const proposeCertificate = async () => {
    if (!certificateData.certId || isNaN(certificateData.certId)) {
      return toast.error("Please enter a valid numeric Certificate ID");
    }
    try {
      const certId = Number(certificateData.certId);
      if (isNaN(certId) || certId <= 0) {
        return toast.error(
          "Please enter a valid certificate ID (positive number)"
        );
      }
      setLoading(true);
      const calldata = certContract.interface.encodeFunctionData("issue", [
        Number(certificateData.certId),
        certificateData.name,
        certificateData.course,
        certificateData.grade,
        certificateData.date,
      ]);

      const description = `Issue certificate for ${certificateData.name}`;
      const tx = await governorContract.propose(
        [contracts.cert.address],
        [0],
        [calldata],
        description
      );

      const receipt = await tx.wait();
      const events = await governorContract.queryFilter(
        governorContract.filters.ProposalCreated(),
        receipt.blockNumber
      );

      if (events.length > 0) {
        const newProposalId = events[0].args.proposalId;
        setProposalId(newProposalId);
        setCurrentProposal({
          ...certificateData,
          description: description,
        });
        toast.success(`Proposal Created! ID: ${newProposalId}`);
        fetchProposalState(newProposalId, true);
      } else {
        toast.error("Proposal creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create proposal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add to useEffect initialization
  const fetchTokenInfo = async () => {
    if (signer && contracts.govToken) {
      const userAddress = await signer.getAddress();
      const tokenContract = new ethers.Contract(
        contracts.govToken.address,
        contracts.govToken.abi,
        signer
      );
      const balance = await tokenContract.balanceOf(userAddress);
      const votes = await tokenContract.getVotes(userAddress);
      setTokenBalance(balance.toString());
      setVotingPower(votes.toString());
    }
  };

  // Add token management functions
  const requestTokens = async () => {
    try {
      const tokenContract = new ethers.Contract(
        contracts.govToken.address,
        contracts.govToken.abi,
        signer
      );
      const tx = await tokenContract.faucet();
      await tx.wait();
      toast.success("Tokens minted successfully!");
      fetchTokenInfo();
    } catch (error) {
      toast.error("Failed to request tokens: " + error.message);
    }
  };

  const delegateVotes = async () => {
    try {
      const tokenContract = new ethers.Contract(
        contracts.govToken.address,
        contracts.govToken.abi,
        signer
      );
      const userAddress = await signer.getAddress();
      const tx = await tokenContract.delegate(userAddress);
      await tx.wait();
      toast.success("Votes delegated successfully!");
      fetchTokenInfo();
    } catch (error) {
      toast.error("Failed to delegate votes: " + error.message);
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
        Number(voteOption),
        voteReason,
        { gasLimit: 500000 }
      );
      await tx.wait();

      fetchProposalState(proposalId);
      toast.success("Vote cast successfully!");
    } catch (error) {
      console.error("Voting Error:", error);
      toast.error("Failed to cast vote: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const queueProposal = async () => {
    if (!currentProposal) {
      return toast.error("No proposal data found.");
    }

    try {
      setLoading(true);
      const descriptionHash = ethers.keccak256(
        ethers.toUtf8Bytes(currentProposal.description)
      );

      const calldata = certContract.interface.encodeFunctionData("issue", [
        Number(currentProposal.certId),
        currentProposal.name,
        currentProposal.course,
        currentProposal.grade,
        currentProposal.date,
      ]);

      const tx = await governorContract.queue(
        [contracts.cert.address],
        [0],
        [calldata],
        descriptionHash
      );
      await tx.wait();

      toast.success("Proposal queued successfully!");
      fetchProposalState(proposalId, true);
    } catch (error) {
      console.error("Queueing Error:", error);
      toast.error("Queueing failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update executeProposal function
  const executeProposal = async () => {
    if (!currentProposal) return toast.error("No proposal data found.");

    try {
      setLoading(true);

      // 1. Verify pre-execution state
      const preState = await governorContract.state(proposalId);
      console.log("Pre-execution state:", Number(preState));

      // 2. Execute proposal
      const descriptionHash = ethers.keccak256(
        ethers.toUtf8Bytes(currentProposal.description)
      );

      const calldata = certContract.interface.encodeFunctionData("issue", [
        Number(currentProposal.certId),
        currentProposal.name,
        currentProposal.course,
        currentProposal.grade,
        currentProposal.date,
      ]);

      const tx = await governorContract.execute(
        [contracts.cert.address],
        [0],
        [calldata],
        descriptionHash,
        { gasLimit: 1_000_000 }
      );

      // 3. Wait for confirmation
      const receipt = await tx.wait(2);
      console.log("Transaction confirmed:", receipt.status);

      // 4. Verify post-execution state
      const postState = await governorContract.state(proposalId);
      console.log("Post-execution state:", Number(postState));

      if (Number(postState) === 7) {
        // 7 = Executed
        toast.success("✅ Execution confirmed!");
        await fetchCertificates();
      } else {
        toast.error("❌ State update failed");
      }
    } catch (error) {
      console.error("Execution Error:", error);
      toast.error(`Execution failed: ${error.code || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced event listener
  useEffect(() => {
    if (!certContract) return;

    const filter = certContract.filters.issued();
    const listener = (...args) => {
      try {
        // Handle different event formats
        const event = args[0].args ? args[0] : { args: args };

        // Convert BigNumber to number safely
        const rawCertId = event.args[0];
        const certId = parseInt(rawCertId.toString(), 10);

        console.log("New certificate processed:", certId);
        toast.success(`New certificate detected: ID ${certId}`);
        fetchCertificates();
      } catch (error) {
        console.error("Event processing error:", error);
      }
    };

    certContract.on(filter, listener);
    return () => certContract.off(filter, listener);
  }, [certContract]);

  // Update fetchCertificates function
  const fetchCertificates = async () => {
    setIsCertificatesLoading(true);
    try {
      const certificatesList = [];
      let id = 1;
      const maxAttempts = 100; // Adjust based on expected certificate count

      while (id <= maxAttempts) {
        try {
          // Use correct capitalization for mapping accessor
          const cert = await certContract.Certificates(id);

          // Check if certificate exists (non-empty name)
          if (cert.name !== "") {
            certificatesList.push({
              id,
              name: cert.name,
              course: cert.course,
              grade: cert.grade,
              date: cert.date,
            });
          }
          id++;
        } catch (error) {
          break; // Stop on error
        }
      }

      setCertificates(certificatesList);
    } catch (error) {
      toast.error("Error fetching certificates: " + error.message);
    } finally {
      setIsCertificatesLoading(false);
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
      const currentState = states[state];
      setProposalState(currentState);

      if (currentState === "Active") {
        toast.info("Proposal is now active for voting!");
      } else if (currentState === "Succeeded") {
        toast.success("Proposal succeeded! You can now queue it.");
      } else if (currentState === "Queued") {
        toast.success("Proposal queued! You can now execute it.");
      } else if (currentState === "Executed") {
        toast.success("Proposal executed! Certificate issued.");
        fetchCertificates();
      }

      if (
        autoRefresh &&
        ["Pending", "Active", "Succeeded", "Queued"].includes(currentState)
      ) {
        setTimeout(() => fetchProposalState(id, true), 5000);
      }
    } catch (error) {
      console.error("Error fetching proposal state:", error);
      toast.error("Failed to fetch proposal state: " + error.message);
    }
  };

const checkVotingPower = async () => {
  try {
    const tokenContract = new ethers.Contract(
      contracts.govToken.address,
      contracts.govToken.abi,
      signer
    );
    const userAddress = await signer.getAddress();
    const balance = await tokenContract.getVotes(userAddress);

    if (balance <= 0) {
      toast.error("Please delegate tokens to activate voting power");
      return false;
    }
    return true;
  } catch (error) {
    toast.error("Error checking voting power");
    return false;
  }
};
  
  // Update the event listener in the useEffect
  useEffect(() => {
    if (!certContract) return;

    const filter = certContract.filters.issued();
    const listener = (...args) => {
      try {
        // Handle both event formats
        const event = args[0].args ? args[0] : { args: args };

        // Convert BigNumber to number safely
        const certId = event.args[0].toNumber();
        console.log("New certificate detected:", certId);
        toast.success(`New certificate detected: ID ${certId}`);
        fetchCertificates();
      } catch (error) {
        console.error("Event processing error:", error);
      }
    };

    certContract.on(filter, listener);
    return () => certContract.off(filter, listener);
  }, [certContract]);

  useEffect(() => {
    const verifyOwnership = async () => {
      if (!certContract || !governorContract) return;

      const owner = await certContract.owner();
      const timelock = await governorContract.timelock();

      if (owner.toLowerCase() !== timelock.toLowerCase()) {
        toast.error("Contract ownership mismatch!");
      }
    };
    verifyOwnership();
  }, [certContract, governorContract]);
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
            name="course"
            placeholder="Course"
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
            name="date"
            onChange={handleInputChange}
          />
          <button
            className="btn btn-primary w-100"
            onClick={proposeCertificate}
            disabled={loading || !certificateData.certId}
          >
            {loading ? "Processing..." : "Propose Certificate"}
          </button>

          <div className="mt-3">
            <h4>Voting Section</h4>
            <div className="mb-2">
              <label>Vote Option:</label>
              <select
                className="form-control"
                value={voteOption}
                onChange={(e) => setVoteOption(e.target.value)}
              >
                <option value="1">For</option>
                <option value="0">Against</option>
                <option value="2">Abstain</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Reason:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter voting reason"
                value={voteReason}
                onChange={(e) => setVoteReason(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={voteOnProposal}
              disabled={loading || !proposalId}
            >
              {loading ? "Voting..." : "Vote"}
            </button>
            <button
              className="btn btn-warning w-100 mb-2"
              onClick={queueProposal}
              disabled={loading || !proposalId}
            >
              {loading ? "Queueing..." : "Queue Proposal"}
            </button>
            <button
              className="btn btn-danger w-100"
              onClick={executeProposal}
              disabled={loading || !proposalId}
            >
              {loading ? "Executing..." : "Execute Proposal"}
            </button>

            {/* Add temporary debug button */}
            <button
              className="btn btn-info mt-2"
              onClick={async () => {
                const testId = 22; // Use your certificate ID
                try {
                  const cert = await certContract.Certificates(testId);
                  console.log("Certificate Verification:", {
                    exists: cert.name !== "",
                    id: testId,
                    name: cert.name,
                    course: cert.course,
                    grade: cert.grade,
                    date: cert.date,
                  });
                } catch (error) {
                  console.error(`Certificate ${testId} check failed:`, error);
                }
              }}
            >
              Debug Certificate
            </button>

            <div className="mt-3">
              <h4>Your Voting Power</h4>
              <p>Token Balance: {tokenBalance}</p>
              <p>Voting Power: {votingPower}</p>
              <button
                className="btn btn-secondary mb-2"
                onClick={requestTokens}
                disabled={!signer || tokenBalance > 0}
              >
                Request Tokens
              </button>
              <button
                className="btn btn-info"
                onClick={delegateVotes}
                disabled={!signer || votingPower > 0}
              >
                Delegate Votes to Yourself
              </button>
            </div>
          </div>

          {proposalId && (
            <div className="mt-3">
              <h5>Proposal ID: {proposalId.toString()}</h5>
              <h6>
                State:{" "}
                {Number(proposalState) === 7 ? "Executed" : proposalState}
              </h6>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h3>Issued Certificates</h3>
          {isCertificatesLoading ? (
            <p>Loading certificates...</p>
          ) : certificates.length === 0 ? (
            <p>No certificates issued yet.</p>
          ) : (
            <ul className="list-group">
              {certificates.map((cert) => (
                <li key={cert.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <strong>ID {cert.id}</strong>
                    <span className="text-muted">{cert.date}</span>
                  </div>
                  <div className="mt-2">
                    <div>Name: {cert.name}</div>
                    <div>Course: {cert.course}</div>
                    <div>Grade: {cert.grade}</div>
                  </div>
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
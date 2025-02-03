import CertABI from "../contract-data/Cert.json";
import GovTokenABI from "../contract-data/GovToken.json";
import MyGovernorABI from "../contract-data/MyGovernor.json";

export const contracts = {
  cert: {
    address: "0xa3772dC2EbAA5B2a51a7842f254a4B071467c9aC",
    abi: CertABI.abi,
  },
  govToken: {
    address: "0xC3F649aDC724F4e038c6975A5695B3D350D36346",
    abi: GovTokenABI.abi,
  },
  governor: {
    address: "0x022a42d3E33C6F4c910476285158f8369Aa2d996",
    abi: MyGovernorABI.abi,
  },
};

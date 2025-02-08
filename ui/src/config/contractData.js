import CertABI from "../contract-data/Cert.json";
import GovTokenABI from "../contract-data/GovToken.json";
import MyGovernorABI from "../contract-data/MyGovernor.json";

export const contracts = {
  cert: {
    address: "0x0AB7A1691AD7063E6dcC756b3DF894F682dC636D",
    abi: CertABI.abi,
  },
  govToken: {
    address: "0x7867A8C31500b37203b38a6698f7aA40FA555bFB",
    abi: GovTokenABI.abi,
  },
  governor: {
    address: "0x3D110414bcd2dA0477053F4Bd64b985802378C62",
    abi: MyGovernorABI.abi,
  },
};

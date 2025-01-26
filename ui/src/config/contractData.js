import CertABI from "../contract-data/Cert.json";
import GovTokenABI from "../contract-data/GovToken.json";
import MyGovernorABI from "../contract-data/MyGovernor.json";

export const contracts = {
  cert: {
    address: "0x8f0D9cfaFD02daF8438abF30fAf2779E43702Afa",
    abi: CertABI.abi,
  },
  govToken: {
    address: "0x93c7142ABe111F07cFd1c1C4590A49980D96E6d7",
    abi: GovTokenABI.abi,
  },
  governor: {
    address: "0xbdc91BE8D6aA6bCcBe6d02021d060C2eDD59F23D",
    abi: MyGovernorABI.abi,
  },
};

import { useState, useEffect } from "react";
import abi from "./contractJson/chai.json";
import { ethers } from "ethers";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xEE230Efba5A10d97a07248031FBF1765d9A467b6";
      const contractABI = abi.abi;
      try {
        // Metamask part
        // 1. In order do transactions on goerli testnet
        // 2. Metamask consists of infure api which actually help in connecting to the blockchain
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum); // read the Blockchain
        const signer = provider.getSigner(); // needed to write to the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("contract here:");
        console.log(contract);

        setState({
          provider,
          signer,
          contract,
        });
      } catch (error) {
        console.log("error:");
        console.log(error);
      }
    };
    template();
  }, []);

  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "#EFEFEF",
          height: "100%",
        }}
      >
        <img src={chai} className="img-fluid" alt=".." width="100%" />
        <p
          className="text-muted lead"
          style={{
            marginTop: "10px",
            marginLeft: "5px",
          }}
        >
          <i>
            {" "}
            Connected Account -{" "}
            <strong>{account ? account : "No Wallet connected yet"}</strong>
          </i>
        </p>
        <div className="container">
          <Buy state={state} />
          <Memos state={state} />
        </div>
      </div>
    </div>
  );
}

export default App;

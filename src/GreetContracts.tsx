import * as React from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

const greeterAddress = process.env.REACT_APP_SMART_ADDRESS!;
export const GreetContracts = () => {
  // store greeting in local state
  const [greeting, setGreetingValue] = React.useState<string | undefined>();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div>
      <Button onClick={fetchGreeting}>Fetch Greeting</Button>
      <Button onClick={setGreeting}>Set Greeting</Button>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setGreetingValue(e.target.value);
        }}
        placeholder="Set greeting"
      />
    </div>
  );
};

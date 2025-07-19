import AvodaWallet from "@/components/AvodaWallet";  // Next.js alias style

// or if that alias doesn't work:
import AvodaWallet from "../components/AvodaWallet"; // Adjust relative path if needed
// src/components/AvodaWallet.jsx
import { useState } from "react";
import { ethers } from "ethers";

export default function AvodaWallet() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("");

  const createWallet = async () => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);

    const provider = new ethers.InfuraProvider("sepolia"); // or mainnet/testnet
    const walletWithProvider = newWallet.connect(provider);
    const bal = await provider.getBalance(newWallet.address);
    setBalance(ethers.formatEther(bal));
  };

  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-xl space-y-4 max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold tracking-wide">AVODA Wallet</h2>

      <button
        onClick={createWallet}
        className="bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Generate Wallet
      </button>

      {wallet && (
        <div className="text-sm mt-4 space-y-2">
          <p><strong>Address:</strong><br /> {wallet.address}</p>
          <p><strong>Balance:</strong><br /> {balance} ETH</p>
        </div>
      )}
    </div>
  );
            }

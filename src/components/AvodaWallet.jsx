// src/components/AvodaWallet.jsx
import { useState } from "react";
import { ethers } from "ethers";

export default function AvodaWallet() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createWallet = async () => {
    setError("");
    setLoading(true);
    try {
      const newWallet = ethers.Wallet.createRandom();
      setWallet(newWallet);

      const provider = new ethers.InfuraProvider("sepolia"); // or "mainnet"
      const balanceBigNumber = await provider.getBalance(newWallet.address);
      setBalance(ethers.utils.formatEther(balanceBigNumber));
    } catch (e) {
      setError("Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-xl max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6">AVODA Wallet 🌿</h2>

      <button
        onClick={createWallet}
        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-xl transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Wallet"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {wallet && (
        <div className="mt-6 text-left bg-gray-900 p-4 rounded-lg break-words">
          <p>
            <strong>Address:</strong> <br /> {wallet.address}
          </p>
          <p className="mt-3">
            <strong>Balance:</strong> <br /> {balance} ETH
          </p>
          <p className="mt-3 text-sm text-gray-400">
            **Save your private key safely:** <br />
            <code>{wallet.privateKey}</code>
          </p>
        </div>
      )}
    </div>
  );
}

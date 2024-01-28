import { useState } from 'react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Keypair, sendAndConfirmTransaction } from "@solana/web3.js";
import axios from 'axios';

function Wallet({ donationAmount, customAmount }) {
  const [txId, setTxId] = useState();
  // get a connection
  const { connection } = useConnection();
  // use the hook in your component
  const { connected, sendTransaction, publicKey } = useWallet();
  // const { sendTransaction } = useWallet();

  const LAMPORTS_PER_SOL = 1000000000;

  const baseURL = "https://mateys.xyz/web_api/";

  const handleDonation = (donationAmount, customAmount) => {
    // Perform any logic here based on donationAmount and customAmount
    // For example, calculate lamports
    const lamports = Math.floor((donationAmount || customAmount) * LAMPORTS_PER_SOL);

    // Return the result or perform other actions
    return lamports;
  };

  const lamports = handleDonation(donationAmount, customAmount);

  // const publicKey = "C79zVCxaueBqMdGyH8pSEWQoVagGbzNcnNUK63YHjhzS";
  //   const connected = true;

  console.log(lamports, connected);

  const sendSolana = async () => {
    if (!connected) {
      // Prompt the user to connect their wallet
      // or provide a UI indicating that the wallet is not connected.
      console.log("Wallet not connected. Please connect your wallet before sending a transaction.");
      return;
    }

    // "F9rXiSZgBuU3iAG6ftfWRGUDucKY38PxBfNpAWNGec1T"

    const toPublicKey = new PublicKey("C5yrAUHXwpguBibfYYnLAoiX2Tz9uv9tgyjewRgrenD4");

    // const signature = await connection.requestAirdrop(toPublicKey, LAMPORTS_PER_SOL);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPublicKey,
        lamports: lamports
      })
    );

    // and then send the transaction:
    const hash = await sendTransaction(transaction, connection);
    setTxId(hash);

    // if (txId) {
    //   const handleHashCall = async (pkey) => {
    //     try {
    //       const formData = new FormData();
    //       formData.append('userId', '2');
    //       formData.append('hash', 'fhgfghd');
    //       formData.append('amount', '22');
    //       formData.append('tmdbId', '454545');

    //       const response = await axios.post(`${baseURL}insert_sol.php`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data', // Set the content type for FormData
    //         },
    //         maxBodyLength: Infinity,
    //       });

    //       console.log(JSON.stringify(response.data));
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    // }
  };

  return (
    <div>
      <button 
        className="bg-dark mb-2" 
        disabled={!publicKey} 
        onClick={sendSolana}
        style={{
          background: 'black',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '20px',
          color: 'white',
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15)'
        }}
      >
          Send transaction
      </button>
      {txId && <p>The transaction hash is {txId}</p>}
    </div>
  );
}

export default Wallet;
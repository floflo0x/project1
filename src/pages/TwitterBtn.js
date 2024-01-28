import React, { useState } from "react";
import { authentication } from './firebase-config';
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";

function TwitterBtn() {
  const signInWithTwitter = () => {
    const provider = new TwitterAuthProvider();

    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <button className="p-2" onClick={signInWithTwitter}>Login with Twitter</button>
  );
};

export default TwitterBtn;
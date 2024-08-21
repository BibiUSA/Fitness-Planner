import "./Account.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const [email, setEmail] = useState("");

  console.log(email);
  useEffect(() => {
    loggingIn();
  }, [email]);

  const loggingIn = async () => {
    console.log("logging In");
    if (email.length > 0) {
      console.log("email sent");
      try {
        const response = await axios.post("http://localhost:3001/account", {
          email: email,
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1>Authentication Page</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          let credentialResponseDecoded = jwtDecode(
            credentialResponse.credential
          );
          setEmail(credentialResponseDecoded.email);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

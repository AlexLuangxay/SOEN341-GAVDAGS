import React from "react";
import { auth, firestore, firebase } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const GoogleLoginButton = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/privatemessage"); // Redirect to the main page
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <MDBBtn
      onClick={handleLogin}
      className="mb-2 w-100"
      size="lg"
      style={{ backgroundColor: "#dd4b39" }}
    >
      <MDBIcon fab icon="google" className="mx-2" />
      Sign in with google
    </MDBBtn>
  );
};

function EmailLoginButton({ email, password, setError }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in with email and password");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("/privatemessage"))
      .catch((error) => {
        console.error("Login failed", error);
        setError(error.message.split("Firebase: ")[1]);
      });
  };

  return <MDBBtn onClick={handleLogin}>Login</MDBBtn>;
}

function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="error-message"
                style={{ fontSize: "12px", color: "red" }}
              >
                {error}
              </div>

              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                className="mb-4"
                label="Remember password"
              />

              <EmailLoginButton
                email={email}
                password={password}
                setError={setError}
              />

              <hr className="my-4" />

              <GoogleLoginButton />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;

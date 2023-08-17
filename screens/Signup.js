import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../utils/axios';
import { AuthContext } from "../store/auth-context";

function Signup() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { idToken } = await createUser(email, password);
      authCtx.authenticate(idToken);
    } catch (error) {
      Alert.alert("User creation failed", "Please try after sometime")
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"creating user..."} />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default Signup;
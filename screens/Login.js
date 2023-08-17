import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { logInUser } from '../utils/axios';

function Login() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signinHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { idToken } = await logInUser(email, password);
      authCtx.authenticate(idToken);
    } catch (error) {
      Alert.alert("Authentication failed", "Please check your credentials or try after sometime")
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging you in..."} />
  }
  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default Login;
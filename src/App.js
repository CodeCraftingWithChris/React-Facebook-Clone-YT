import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  const [user] = useAuthState(auth);
  return (
    <div>
      {
        !user ? <Login /> : <Home />
      }
    </div>
  );
}

export default App;

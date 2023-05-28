
import { Navigate } from "react-router-dom";
import Constants from "./Constants";
const ConsolePage = ({ auth }) => {

  console.log(auth);
  return (
    <>{
      auth ? <Constants /> : <Navigate to="/auth" />

    }
    </>

  );
};

export default ConsolePage;
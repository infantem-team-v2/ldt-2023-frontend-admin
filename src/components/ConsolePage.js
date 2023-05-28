
import { Navigate } from "react-router-dom";
import Constants from "./Constants";
const ConsolePage = ({ auth }) => {

  console.log(auth);
  return (
    <>{
      auth ?
        <div>
          < h1 > Console Page</h1 >
          <Constants />
        </div > : <Navigate to="/auth" />

    }
    </>

  );
};

export default ConsolePage;
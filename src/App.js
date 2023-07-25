import "./App.css";
import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Resetpassword from "./Pages/Resetpassword";
import Forgotpassword from "./Pages/Forgotpassword";
import Register from "./Pages/Register";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/resetpassword" element={<Resetpassword/>} />
        <Route path="/forgotpassword" element={<Forgotpassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/resetpassword" element={<Resetpassword/>} />
        <Route path="/notfound" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registrasi from "./pages/Registrasi";
import Feedback from "./pages/Feedback";
import CustomerSupport from "./pages/CustomerSupport";
import Home from "./pages/Home";
import Laporan from "./pages/Laporan";
import MenuMakanan from "./pages/MenuMakanan";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/Registrasi" element={<Registrasi />} />
        <Route path = "/Feedback" element = {<Feedback/>} />
        <Route path = "/CustomerSupport" element = {<CustomerSupport/>} />
        <Route path = "/Laporan" element = {<Laporan/>} />
        <Route path = "/MenuMakanan" element = {<MenuMakanan/>} />
        <Route path = "/Profile" element = {<Profile/>} />
        <Route path = "/Test" element = {<Test/>} />
        <Route path = "/Test2" element = {<Test2/>} />
      </Routes>
    </Router>
  );
}

export default App;

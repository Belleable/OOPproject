import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Pet from "./pages/home/Pet"
import Addpet from "./pages/Addpet/Addpet"
import Login from "./pages/login/Login"
import Register from "./pages/Register/Register"
import EditUser from "./pages/EditUser/EditUser"
import Articles from "./pages/Articles/Articles"
import Calendar from "./pages/Calendar/Calendar"
import EditPet from "./pages/EditPet/EditPet";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pet />} />
        <Route path="/add-pet" element={<Addpet />} />
        <Route path="/edit-pet" element={<EditPet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-user" element={<EditUser/>} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

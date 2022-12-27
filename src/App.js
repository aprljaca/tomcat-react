import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SavePassword from "./pages/SavePassword/SavePassword";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import UploadImage from "./pages/UploadImage/UploadImage";
import Test from "./pages/Test/Test";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

function App() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:userId" element={<Profile/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/savePassword/token=:token" element={<SavePassword />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/uploadImage" element={<UploadImage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/changePassword" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;

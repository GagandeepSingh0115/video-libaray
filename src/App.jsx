import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./Context/AuthContext";
import { useSnakbarContext } from "./Context/SnakbarContext";
import { Navbar } from "./Components/Navbar";
import { Snakbar } from "./Components/Snakbar";
import { Home } from "./pages/Home";
import { LikeVideos } from "./pages/LikeVideos";
import { VideoWatch } from "./pages/VideoWatch";
import { Playlist } from "./pages/Playlist";
import { SaveVideos } from "./pages/SaveVideos";
import { Login } from "./pages/Login";
const ProtectedRoute = ({ path, ...props }) => {
  const { user } = useAuthContext();
  return user ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
function App() {
  const [isNavbarOpen, setNavbarToggle] = useState();
  const { snakbarStatus } = useSnakbarContext();
  return (
    <div
      className={` dis-grid body-layout  ${
        isNavbarOpen ? "aside-expand " : "aside-shrink"
      } `}>
      <Navbar isNavbarOpen={isNavbarOpen} setNavbarToggle={setNavbarToggle} />
      <main className="column padding-16 w12">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/watch/:id" element={<VideoWatch />}></Route>
          <Route path="/playlist/:id" element={<Playlist />}></Route>
          <Route path="/savedvideos" element={<SaveVideos />} />
          <Route path="/likedVideos" element={<LikeVideos />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </div>
  );
}

export default App;
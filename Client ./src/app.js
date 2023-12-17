import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Assignment from "./pages/assignment"
import Exercise from "./pages/exercise"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Profile from "./pages/profile";
import Leaderboard from "./pages/leaderboard";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  //routes all the path to be used in the website
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
          <CssBaseline />
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="Exercise" element={<Exercise/>} />
          <Route path="Assignment" element={<Assignment/>} />
          <Route path="Signup" element={<Signup />} /> 
          <Route path="Login" element={<Login />} /> 
          <Route path="Profile" element={<Profile/>}/>
          <Route path="Leaderboard" element={<Leaderboard/>}/>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

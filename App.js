import React, { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const App = () => {
  const [activePage, setActivePage] = useState("film");

  return activePage === "profile" ? <ProfileScreen /> : <HomeScreen />;
};

export default App;

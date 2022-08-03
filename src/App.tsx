import { Routes, Route } from "react-router-dom";

import Homepage from "views/Homepage";
import Checkers from "views/Checkers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/game" element={<Checkers />} />
    </Routes>
  );
};

export default App;

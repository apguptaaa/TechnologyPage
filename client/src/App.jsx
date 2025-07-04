import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import this
import Technology from './component/Technology';
import DisplayTechnology from './component/DisplayTechno';

function App() {
  console.log('✅ App component rendered');

  return (
        <Routes>
      <Route path="/addtechnology" element={<Technology/>} />
      <Route path="/displaytech" element={<DisplayTechnology />} />
    </Routes>
    
  
  
  );
}

export default App;

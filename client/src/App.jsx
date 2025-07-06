import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import this
import Technology from './component/Technology';
import EditTechno from './component/EditTechno';
import ViewTechno from './component/ViewTechno';

function App() {
  console.log('✅ App component rendered');

  return (
    <Routes>
      <Route path="/" element={<Technology />} />
      <Route path="/edit/:id" element={<EditTechno />} />
      <Route path="/view/:id" element={<ViewTechno />} />
    </Routes>



  );
}

export default App;

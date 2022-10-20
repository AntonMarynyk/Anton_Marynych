import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Paint from "./Paint";

function App() {
    return (
      <BrowserRouter>
              <Routes>
                  <Route path='/:id' element={<Paint/>}/>
                  <Route path='/' element={<Navigate to={`/f${(+new Date()).toString(16)}`}/>}/>
              </Routes>
      </BrowserRouter>
  );
}

export default App;

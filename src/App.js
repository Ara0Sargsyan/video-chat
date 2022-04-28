import {BrowserRouter, Route, Routes} from "react-router-dom";
import Room from "./pages/Room";
import Main from "./pages/Main";
import NotFound404 from "./pages/NotFound404";

function App() {
    return (
        <div style={{display: "flex", justifyContent: "center"}} className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/room/:id" element={<Room/>}/>
                    <Route path="/" element={<Main/>}/>
                    <Route path="" element={<NotFound404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

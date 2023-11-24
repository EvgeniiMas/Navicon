import Header from './Header';
import Articles from './Articles/Articles';
import Users from './Users/Users';
import Photos from './Photos/Photos';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/users" element={<Users/>} />
                <Route path="/photos" element={<Photos/>} />
                <Route path="/articles" element={<Articles/>} />
            </Routes>
        </>
    )
}

export default App

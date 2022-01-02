import { useState } from "react";
import './App.css';

import Sidebar from "./components/Sidebar";

function App() {
    const [isModalView, setIsModalView] = useState(false)
    return <div className="centered">
        <button onClick={() => setIsModalView(prev => !prev)} className="btn-save">Save Segment</button>
        <Sidebar view={isModalView} />
    </div>
}

export default App;
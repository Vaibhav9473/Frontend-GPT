import './App.css'
import Sidebar from './Sidebar.jsx'
import ChatWindow from './ChatWindow.jsx'
import { MyContext } from './MyContext.jsx'
import { useState } from 'react'
import {v1 as uuidv1} from 'uuid'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";





function App() {
const [prompt, setPrompt] = useState("");
const [reply, setReply] = useState(null);
const [currThreadId, setCurrThreadId] = useState(uuidv1());
const [preChats, setPreChats] = useState([]); // stores all chats of threads
const [newChat, setNewChat] = useState(true);
const [allThreads, setAllThreads] = useState([])

const providerValues = {
  prompt, setPrompt,
  reply, setReply,
  currThreadId, setCurrThreadId,
  preChats, setPreChats,
  newChat, setNewChat,
  allThreads, setAllThreads
};
  return (
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* SIGNUP PAGE */}
        <Route path="/signup" element={<Signup />} />

        {/* CHAT UI */}
        <Route
          path="/"
          element={
            <div className="main">
              <MyContext.Provider value={providerValues}>
                <Sidebar />
                <ChatWindow />
              </MyContext.Provider>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App

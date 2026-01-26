import './ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import { useContext, useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";





function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setPreChats, setNewChat, setSidebarOpen } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { token, logout } = useContext(AuthContext);



  const getReply = async () => {
    if (!token) {
      toast.error("Please login to start chatting ");
      navigate("/login"); // optional (recommended)
      return;
    }

    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options)
      const res = await response.json()
      console.log(res);
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully ");
    navigate("/login");
  };

  //Append new chat to prechat
  useEffect(() => {
    if (prompt && reply) {
      setPreChats(preChats =>
        [...preChats,
        {
          role: "user",
          content: prompt
        },
        {
          role: "assistant",
          content: reply
        }
        ]);

    }
    setPrompt("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen)
  }

  return (

    <div className='chatwindow'>

      <div className="navbar">
        <span
          className="menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          ☰
        </span>
        <span>AIChat <i className="fa-solid fa-angle-down"></i></span>
        <div className="usericon" onClick={handleProfileClick}>
          <span className='iconuser'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {
        isOpen && (
          <div className="dropdown">
            <div className="dropdownItem">Upgrade plan</div>
            {/*  NOT LOGGED IN */}
            {!token && (
              <>
                <div
                  className="dropdownItem"
                  onClick={() => navigate("/login")}
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </div>

                <div
                  className="dropdownItem"
                  onClick={() => navigate("/signup")}
                >
                  <i className="fa-solid fa-user-plus"></i> Signup
                </div>
              </>
            )}

            {/*  LOGGED IN */}
            {token && (
              <>
                <div className="dropdownItem">
                  <i className="fa-solid fa-gear"></i> Settings
                </div>

                <div
                  className="dropdownItem"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </div>
              </>
            )}

          </div>
        )
      }


      <Chat></Chat>

      <FadeLoader color='#fff' loading={loading}></FadeLoader>

      <div className="chatinput">

        <div className="inputbox">
          <input placeholder='Ask Anything'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}></input>
          <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>

        <p className='info'>
          ChatGPT can make mistakes. Check important info. See Cookie Preferences.
        </p>

      </div>

    </div>
  )
}

export default ChatWindow;
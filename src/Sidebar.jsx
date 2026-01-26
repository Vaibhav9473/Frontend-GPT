import './Sidebar.css';
import { useContext, useEffect } from 'react';
import { MyContext } from './MyContext.jsx';
import {v1 as uuidv1} from 'uuid';




function Sidebar() {
 const {allThreads, setAllThreads, setNewChat, setPrompt, setReply, setCurrThreadId, setPreChats, currThreadId, sidebarOpen} = useContext(MyContext);
 const API = import.meta.env.VITE_API_URL;

  
 const getallThreads = async () =>{
   try {
    const response = await fetch(`${API}/api/thread`);
    const res = await response.json();
    const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title}));
    setAllThreads(filteredData);

   } catch (error) {
      console.log(error);
   }

 }

 useEffect(()=>{
 getallThreads()
 
// eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);

const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPreChats([]);
}

const changeThread = async (newThreadId) =>{
  setCurrThreadId(newThreadId);

  try {
   const response = await fetch(
    `${API}/api/thread/${newThreadId}`
);
   const res = await response.json();
   setPreChats(res);
   setNewChat(false);
   setReply(null);
  } catch (error) {
    console.log(error);
  }
}

const deleteThread = async (threadId) =>{
  try {
    const response = await fetch(`${API}/api/thread/${threadId}`, {method: "DELETE"});
    const res = await response.json();
    console.log(res);
    setAllThreads(pre => pre.filter(thread => thread.threadId !== threadId));

  if(threadId === currThreadId){
    createNewChat();
  }

  } catch (error) {
    console.log(error);
  }
}

    return (
        <section className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <button onClick={createNewChat}>
                <img src="src/assets/blacklogo.png" alt="logo" className='logo' />
                <span>new<i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <ul className='history'>
              {
                allThreads?.map((thread, idx)=>(
                    <li key={idx} onClick={()=> changeThread(thread.threadId)}
                     className={thread.threadId === currThreadId ? "highlighted" : ""}>
                        {thread.title}
                        <i className="fa-solid fa-trash-can"
                        onClick={(e)=>{
                            e.stopPropagation(); // to stop event bubbling
                            deleteThread(thread.threadId)
                        }}>

                        </i>
                        </li>
                ))
              }
            </ul>

            <div className="sign">
                <p>by vaibhav &copy;</p>
            </div>
        </section>
    )
}

export default Sidebar;
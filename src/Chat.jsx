import './Chat.css';
import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from './MyContext';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

function Chat() {
    const { newChat, preChats, reply } = useContext(MyContext);
    const [latestReply, setLastestReply] = useState(null);

    useEffect(() => {
     if(!reply || typeof reply !== "string") {
        setLastestReply(null);
        return;
     }

        if (!preChats || preChats.length === 0) return;

        const content = reply.split(" ");
        let idx = 0;
        setLastestReply("");
        const interval = setInterval(() => {
            setLastestReply(prev =>
                prev ? prev + " " + content[idx] : content[idx]
            );

            idx++;

            if (idx >= content.length) {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);

    }, [preChats, reply]);

    return (
        <>
            {newChat && preChats.length === 0 && (
                <h2>Start a new Chat!</h2>
            )}
            <div className="chats">
                {
                    preChats?.slice(0, -1).map((chat, idx) =>
                        <div className={chat.role === "user" ? "userdiv" : "gptdiv"}
                            key={idx}>
                            {
                                chat.role === "user" ?
                                    <p className='usermessage'>{chat.content}</p> :
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                <div className="userdiv">
                    <p className="usermessage"></p>
                </div>

                <div className="gptdiv">
                    <p className="gptmessage"></p>
                </div>
               
               {
                 preChats.length > 0 && (
                    <>
                    {
                        latestReply === null ? (
                    <div className='gptdiv' key={'non-typing'}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{preChats[preChats.length -1].content}</ReactMarkdown>

                    </div>
                        ) :(
                     <div className='gptdiv' key={'typing'}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>

                    </div>
                        )
                    }
                    </>
                 )
               }

               
            </div>



        </>
    )
}

export default Chat;

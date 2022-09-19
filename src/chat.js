import React, { useEffect, useState } from 'react'
import "./App.css"
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket,username,room}) => {
    const [currentmseesage, setCurrentmessage] = useState("");
    const [mseesagelist, setMessagelist] = useState([]);

    const sendMessage = async() => {
        if(currentmseesage !== ""){
            const messageData = {
                room:room,
                username:username,
                message: currentmseesage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData);
            setMessagelist((list)=>[...list, messageData]);
            setCurrentmessage("");
        }
    }

    useEffect(()=>{
           socket.on("receive_message", (data) => {
               setMessagelist((list)=>[...list, data]);
           })
    },[socket])
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className="message-container">
        {mseesagelist.map((messageContent)=>{
            return (<div className='message' id={username === messageContent.username ? "you" : "other"}>
                <div>
                <div className='message-content' >
                    <p>{messageContent.message}</p>
                </div>
                <div className='message-meta'>
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.username}</p>
                </div>
                </div>
                </div>)

        })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input type="text" value={currentmseesage} placeholder='Type your message...' onChange={(event)=>setCurrentmessage(event.target.value)} onKeyPress={(event)=>{event.key === "Enter" && sendMessage() }}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
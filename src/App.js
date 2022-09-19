import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import Chat from './chat';

const socket = io.connect("https://kusumakrishna.herokuapp.com/");

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);

  const joinRoom = () => {
    if(username !=="" && room!==""){
      socket.emit("join_room", room);
      setShowchat(true);
    }
  }
  return (
    <div className="App">
    { !showchat ? (
      <div className='joinChatContainer'>
      {/* <img src='http://il3.picdn.net/shutterstock/videos/7183609/thumb/1.jpg?i10c=img.resize(height:160)' alt='chatimage' style={{height:"100px",width:"200px"}}/> */}
      <h3>Join A Chat</h3>
      <input type="text" placeholder="Username" onChange={(event)=>{setUsername(event.target.value)}}/>
      <input type="text" placeholder="Room Id" onChange={(event)=>{setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>Join A Room</button>
    </div>
    ):(
      <Chat socket={socket} username={username} room={room}/>
    )}
    </div>
  );
}

export default App;

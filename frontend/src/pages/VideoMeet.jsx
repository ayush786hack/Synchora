import React from 'react';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
const server_url = "http://localhost:8000";

const peerConfigConnections = {
  "iceServers": [
    {
      "urls": "stun:stun.l.google.com:19302"
    }
  ]
}

export default function VideoMeet() {
  var connections = useRef({});

  var socketRef = useRef();
  var socketIdRef = useRef();

  let localVideoRef = useRef();
  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);
  let [video, setVideo] = useState();
  let [audio, setAudio] = useState();
  let [screen, setScreen] = useState();
  let [showModal, setModal] = useState();
  let [screenAvailable, setScreenAvailable] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");
  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);
  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }
      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      } if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }
      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.error("Error occurred while fetching media permissions:", error);
    }
  }
  useEffect(() => {
    getPermissions();
  }, [])

  let getUserMediaSuccess =(stream)=>{
   
  }

  let getUserMedia = async () => {
    if((video && videoAvailable||audio && audioAvailable)){
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
      .then(getUserMediaSuccess)
      .then((stream)=>{})
      .catch((e)=>console.log(e))
    }else{
      try{
        let tracks=localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track=>track.stop());

      }catch(e){

      }
    }
  }
useEffect(()=>{
  if(video!==undefined && audio!==undefined){
    getUserMedia();
  }
},[video,audio])

  let getMedia = () => {

    setVideo(videoAvailable);
    setAudio(audioAvailable);
    
    connectToSocketServer();
  }
  //todo 
  let gotMessageFromServer =(fromId,message)=>{

  }
  let addMessage =(message)=>{
    setMessages((prevMessages)=>[...prevMessages,message]);
  }
  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url,{secure:false});
    socketRef.current.on('signal',gotMessageFromServer);
    socketRef.current.on('connect',()=>{
      socketRef.current.emit('join-call',window.location.href);
      socketIdRef.current = socketRef.current.id;
      socketRef.current.on("chat-message",addMessage);
      socketRef.current.on("user-left",(id)=>{
        setVideos((videos)=>videos.filter(video=>video.socketId!==id));
      })
      socketRef.current.on("user-joined",(id,clients)=>{
        clients.forEach((socketListId)=>{
           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
        })
      })
    })
  }
  let connect = () => {
    setAskForUsername(false);
    getMedia();

  }
  return (
    <div>
      {askForUsername === true ?
        <div>
          <h2>Enter in to Lobby</h2>
          <input
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="button" className="btn-solid" onClick={connect}>
            Connect
          </button>

          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>


        </div> : <></>
      }

    </div>
  )
}
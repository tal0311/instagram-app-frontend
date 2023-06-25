import store from "./../store/index.js";
import { userService } from "./user.service.js";
import Peer from "peerjs";

// Function to handle the call stream service
function handleCallStreamService(localVideoElement, remoteVideoElement) {
 let localStream;

 // const user = store.getters['user/getUser']
 const loggedUser = userService.getLoggedinUser()
 const peer = new Peer(loggedUser._id);

 // Request access to the user's media devices
 navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then((stream) => {
   // Store the local stream
   localStream = stream;
   localVideoElement.srcObject = localStream;
  })
  .catch((error) => {
   console.error('Error accessing media devices:', error);
  });

 // Handle incoming call requests
 peer.on('call', (incomingCall) => {
  // Answer the call by providing the local media stream
  incomingCall.answer(localStream);

  // Handle the call stream
  incomingCall.on('stream', (remoteStream) => {
   remoteVideoElement.srcObject = remoteStream;
  });
 });

 // Function to initiate a call to a remote peer
 function initiateCall(remotePeerId) {
  if (!localStream) {
   console.error('Local stream is not available');
   return;
  }

  // Establish a media connection with the remote peer
  const call = peer.call(remotePeerId, localStream);

  // Handle the call stream
  call.on('stream', (remoteStream) => {
   remoteVideoElement.srcObject = remoteStream;
  });
 }

 // Function to end the call and release resources
 function endCall() {
  // Close the peer connection
  peer.destroy();

  // Release the media stream resources
  if (localStream) {
   localStream.getTracks().forEach((track) => {
    track.stop();
   });
  }
 }

 // Return the public API of the service
 return {
  initiateCall,
  endCall,
 };
}

// Example usage:
// const localVideoElement = document.getElementById('local-video');
// const remoteVideoElement = document.getElementById('remote-video');

// const callService = handleCallStreamService(localVideoElement, remoteVideoElement);

// Initiate a call
// callService.initiateCall(remotePeerId);

// End the call
// callService.endCall();

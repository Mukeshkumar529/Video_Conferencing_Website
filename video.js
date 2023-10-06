const myVideo = document.getElementById('myVideo');
const otherVideo = document.getElementById('otherVideo');
const CallstartButton = document.getElementById('btn_start');
const CallstopButton = document.getElementById('btn_end');

const stopCall = document.getElementById('cut_call')


let myStream;
let otherStream;
let peerConnection;


async function startVideo() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        myVideo.srcObject = myStream;
    } catch (error) {
        console.error('Error accessing local media:', error);
    }
}

function createPeerConnection() {
    peerConnection = new RTCPeerConnection();

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            
        }
    };

    peerConnection.ontrack = (event) => {
        otherVideo.srcObject = event.streams[0];
    };

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, myStream);
    });
}


async function startVideoOther() {
    try {
        otherStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
        otherVideo.srcObject = myStream;
    } catch (error) {
        console.error('Error accessing local media:', error);
    }
}

async function stopVideoOther() {
    try {
        otherStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: false });
        otherVideo.srcObject = myStream;
    } catch (error) {
        console.error('Error accessing local media:', error);
    }
}


function createPeerConnectionStop() {
    peerConnection = new RTCPeerConnection();

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
             
        }
    };

    peerConnection.ontrack = (event) => {
        myVideo.srcObject = event.streams[0];
    };

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, myStream);
    });
}



CallstartButton.addEventListener('click', () => {
    CallstartButton.disabled = true;
    CallstopButton.disabled = false;
    startVideo();
    createPeerConnection();
});


CallstopButton.addEventListener('click', () => {
    CallstopButton.disabled = true;
    CallstartButton.disabled = false;
    startVideoOther()
    createPeerConnection();
    
});







stopCall.addEventListener('click', () => {
    stopCall.disabled = true;
    CallstartButton.disabled = false;
    CallstopButton.disabled = false;
    createPeerConnectionStop()
    stopVideoOther()
    myStream.getTracks().forEach((track) => {
        track.stop();
    });
    myVideo.srcObject = null;
    otherVideo.srcObject = null;
    peerConnection.close();
})

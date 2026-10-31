// -------------------------- header socketttttttttttttttttt-----------------------------
// -------------------------- header socketttttttttttttttttt-----------------------------
// -------------------------- header socketttttttttttttttttt-----------------------------
// -------------------------- header socketttttttttttttttttt-----------------------------
// -------------------------- header socketttttttttttttttttt-----------------------------
// -------------------------- header socketttttttttttttttttt-----------------------------
// -------------------------- header socketttttttttttttttttt-----------------------------

// join session when connected
socket.on('connect', () => {
    statusElem.textContent = 'Connected';
    statusElem.classList.remove('disconnected');
    statusElem.classList.add('connected');

    // join the session
    socket.emit('join-session', sessionCode);
});

socket.on('disconnect', () => {
    statusElem.textContent = 'Disconnected - Reconnecting...';
    statusElem.classList.remove('connected');
    statusElem.classList.add('disconnected');
});

socket.on('reconnect', () => {
    statusElem.textContent = 'Connected';
    statusElem.classList.remove('disconnected');
    statusElem.classList.add('connected');

    // rejoin the session
    socket.emit('join-session', sessionCode);
});
socket.on('user-count', (data) => {
    usersCountElem.textContent = `Users: ${data.count}`;
});
// // detecting text changes and emit to server
// editorInstance.on("change", () => {
//     socket.emit("code-update", editorInstance.getValue());
// });

// // listen for updates from the server
// socket.on("code-update", (content) => {
//     if (editorInstance.getValue() !== content) {
//         editorInstance.setValue(content);
//     }
// });


// room ID
const urlParams = new URLSearchParams(window.location.search);
let roomId = urlParams.get("room") || Math.random().toString(36).substr(2, 8);



//********************************** Voice chat **********************************
//********************************** Voice chat **********************************
//********************************** Voice chat **********************************
//********************************** Voice chat **********************************
//********************************** Voice chat **********************************
//********************************** Voice chat **********************************
//********************************** Voice chat **********************************
//********************************** Voice chat **********************************


let peerConnection;
let localStream;
let pendingIceCandidates = [];
// socket noe defined cz its already defined above
let remoteAudio = new Audio();
remoteAudio.controls = true; 
document.getElementById('callrec').appendChild(remoteAudio); // just to check the duration of timings

// web socket to connect
function connectSocket() {
    socket.on('connect', () => {
        document.getElementById('status-chitchatV').textContent = 'Connected';
        document.getElementById('status-chitchatV').style.color = 'var(--accent-green)';
    });

    socket.on('offer', (offer) => {
        showIncomingCall(offer);
    });

    socket.on('answer', async (answer) => {
        if (!peerConnection) return;
        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            await flushPendingIceCandidates();
        } catch (error) {
            console.error('Error handling call answer:', error);
            setCallStatus('Could not connect the call');
        }
    });

    socket.on('ice-candidate', async (candidate) => {
        if (!peerConnection || !peerConnection.remoteDescription) {
            pendingIceCandidates.push(candidate);
            return;
        }

        try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    });

    socket.on('end-call', () => endCall(false));
    socket.on('disconnect', () => {
        endCall(false);
    });
}

function setCallStatus(message, color) {
    const status = document.getElementById('status-chitchatV');
    status.textContent = message;
    if (color) status.style.color = color;
}

async function flushPendingIceCandidates() {
    if (!peerConnection?.remoteDescription) return;
    const candidates = pendingIceCandidates;
    pendingIceCandidates = [];
    for (const candidate of candidates) {
        try {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
            console.error('Error adding queued ICE candidate:', error);
        }
    }
}

// initiate web socket connection
async function initializePeerConnection() {
    peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };

    peerConnection.ontrack = (event) => {
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play().catch((err) => console.error('Audio autoplay issue:', err));
    };

    peerConnection.onconnectionstatechange = () => {
        if (peerConnection?.connectionState === 'connected') {
            setCallStatus('Call connected', 'var(--accent-green)');
        } else if (peerConnection?.connectionState === 'failed') {
            setCallStatus('Call connection failed', 'var(--accent-red)');
        }
    };
}

// start call ka kaam
async function startCall() {
    try {
        if (!socket.connected) {
            throw new Error('You are disconnected from the session. Reconnect and try again.');
        }
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error('Microphone access requires HTTPS or localhost. Open this page using a secure connection and allow microphone access.');
        }

        pendingIceCandidates = [];
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        await initializePeerConnection();
        
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer);

        document.getElementById('startCall-chitchatV').disabled = true;
        document.getElementById('endCall-chitchatV').disabled = false;
        setCallStatus('Calling…', 'var(--accent-yellow)');
    } catch (error) {
        console.error('Error starting call:', error);
        cleanupCall();
        setCallStatus(error.message || 'Could not start the call');
    }
}

// end call ka kaam
function cleanupCall() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    pendingIceCandidates = [];
    remoteAudio.srcObject = null;
    document.getElementById('startCall-chitchatV').disabled = false;
    document.getElementById('endCall-chitchatV').disabled = true;
}

function endCall(notifyPeer = true) {
    cleanupCall();
    document.getElementById('incomingCall-chitchatV').style.display = 'none';
    setCallStatus('Call ended', 'var(--accent-red)');
    if (notifyPeer && socket.connected) socket.emit('end-call');
}

// popup hai ye
function showIncomingCall(offer) {
    if (peerConnection) endCall(false);
    setCallStatus('Incoming call');
    document.getElementById('incomingCall-chitchatV').style.display = 'block';
    document.getElementById('acceptCall-chitchatV').onclick = () => acceptCall(offer);
}


// agar except kiya toh
async function acceptCall(offer) {
    try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error('Microphone access requires HTTPS or localhost. Open this page using a secure connection and allow microphone access.');
        }

        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        await initializePeerConnection();
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        await flushPendingIceCandidates();
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
        document.getElementById('incomingCall-chitchatV').style.display = 'none';
        document.getElementById('startCall-chitchatV').disabled = true;
        document.getElementById('endCall-chitchatV').disabled = false;
        setCallStatus('Call connected', 'var(--accent-yellow)');
    } catch (error) {
        console.error('Error accepting call:', error);
        cleanupCall();
        if (socket.connected) socket.emit('end-call');
        setCallStatus(error.message || 'Could not accept the call');
    }
}

// call cut kiya
function rejectCall() {
    document.getElementById('incomingCall-chitchatV').style.display = 'none';
    endCall();
}


document.getElementById('startCall-chitchatV').addEventListener('click', startCall);
document.getElementById('endCall-chitchatV').addEventListener('click', endCall);
document.getElementById('rejectCall-chitchatV').addEventListener('click', rejectCall);

// initial connection
connectSocket();

//********************************** chit - chat **********************************
//********************************** chit - chat **********************************
//********************************** chit - chat **********************************
//********************************** chit - chat **********************************
//********************************** chit - chat **********************************
//********************************** chit - chat **********************************
//********************************** chit - chat **********************************
//********************************** chit - chat **********************************

// DOM elements
const loginScreen = document.getElementById('login-screen-chitchat');
const chatScreen = document.getElementById('chat-screen-chitchat');
const usernameInput = document.getElementById('username-input-chitchat');
const joinButton = document.getElementById('join-button-chitchat');
const messageInput = document.getElementById('message-input-chitchat');
const sendButton = document.getElementById('send-button-chitchat');
const messagesContainer = document.getElementById('messages-container-chitchat');
const usersList = document.getElementById('users-list-chitchat');
const typingIndicator = document.getElementById('typing-indicator-chitchat');
const fileUpload = document.getElementById('file-upload-chitchat');
const filePreviewContainer = document.getElementById('file-preview-container-chitchat');
const audioPreviewContainer = document.getElementById('audio-preview-container-chitchat');
const progressBar = document.getElementById('file-upload-progress-bar-chitchat');
const progressContainer = document.querySelector('.file-upload-progress-chitchat');
const recordButton = document.getElementById('record-button-chitchat');
const audioTime = document.getElementById('audio-time-chitchat');

let username = '';
let typingTimeout = null;
let currentFile = null;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let recordingStartTime = 0;
let recordingTimer = null;
let audioBlob = null;

// Join chat function
joinButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('join', username);
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'grid';
        messageInput.focus();
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinButton.click();
    }
});

// File upload handling
fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        currentFile = file;

        filePreviewContainer.innerHTML = '';
        const previewElement = document.createElement('div');
        previewElement.className = 'file-preview-chitchat';

        const fileNameElement = document.createElement('div');
        fileNameElement.textContent = file.name;
        fileNameElement.style.flex = '1';

        const clearButton = document.createElement('span');
        clearButton.textContent = '✖';
        clearButton.className = 'clear-file-chitchat';
        clearButton.addEventListener('click', () => {
            filePreviewContainer.innerHTML = '';
            currentFile = null;
            fileUpload.value = '';
        });

        previewElement.appendChild(fileNameElement);
        previewElement.appendChild(clearButton);
        filePreviewContainer.appendChild(previewElement);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.style.maxHeight = '100px';
                img.style.borderRadius = '4px';
                img.style.marginTop = '5px';
                filePreviewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }
});

// Audio recording functionality
recordButton.addEventListener('click', () => {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
});

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            createAudioPreview(audioBlob);
        });

        mediaRecorder.start();
        isRecording = true;
        recordButton.classList.add('recording');
        recordButton.textContent = '⏹️';
        recordButton.title = 'Stop recording';

        recordingStartTime = Date.now();
        updateRecordingTime();
        recordingTimer = setInterval(updateRecordingTime, 1000);   
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Unable to access microphone. Please make sure you have given permission.');
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());

        isRecording = false;
        recordButton.classList.remove('recording');
        recordButton.textContent = '🎤';
        recordButton.title = 'Record audio';

        clearInterval(recordingTimer);
        audioTime.textContent = '';
    }
}

function updateRecordingTime() {
    const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
    const seconds = (duration % 60).toString().padStart(2, '0');
    audioTime.textContent = `${minutes}:${seconds}`;
}

function createAudioPreview(blob) {
    audioBlob = blob;
    audioPreviewContainer.innerHTML = '';
    const previewElement = document.createElement('div');
    previewElement.className = 'audio-preview-chitchat';

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = URL.createObjectURL(blob);
    audio.className = 'audio-player-chitchat';

    const clearButton = document.createElement('span');
    clearButton.textContent = '✖';
    clearButton.className = 'clear-file-chitchat';
    clearButton.addEventListener('click', () => {
        audioPreviewContainer.innerHTML = '';
        audioBlob = null;
    });

    previewElement.appendChild(audio);
    previewElement.appendChild(clearButton);
    audioPreviewContainer.appendChild(previewElement);
}

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                progressBar.style.width = percentComplete + '%';
            }
        };

        xhr.onloadstart = () => {
            progressContainer.style.display = 'block';
            progressBar.style.width = '0%';
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                progressContainer.style.display = 'none';
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('Upload failed'));
            }
        };

        xhr.onerror = () => {
            progressContainer.style.display = 'none';
            reject(new Error('Network error'));
        };

        xhr.open('POST', '/upload', true);
        xhr.send(formData);
    });
};

const sendMessage = async () => {
    const message = messageInput.value.trim();

    try {
        if (currentFile) {
            sendButton.disabled = true;
            const fileData = await uploadFile(currentFile);

            socket.emit('sendFile', {
                filePath: fileData.filePath,
                fileType: fileData.fileType,
                originalName: fileData.originalName
            });

            filePreviewContainer.innerHTML = '';
            currentFile = null;
            fileUpload.value = '';
        }

        if (audioBlob) {
            sendButton.disabled = true;
            const audioFile = new File([audioBlob], 'audio-message.webm', { 
                type: audioBlob.type 
            });

            const audioData = await uploadFile(audioFile);

            socket.emit('sendFile', {
                filePath: audioData.filePath,
                fileType: 'audio',
                originalName: 'Audio Message'
            });

            audioPreviewContainer.innerHTML = '';
            audioBlob = null;
        }

        if (message) {
            socket.emit('sendMessage', message);
            messageInput.value = '';
        }

        socket.emit('typing', false);
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send file or audio. Please try again.');
    } finally {
        sendButton.disabled = false;
    }
};

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

messageInput.addEventListener('input', () => {
    clearTimeout(typingTimeout);
    socket.emit('typing', true);

    typingTimeout = setTimeout(() => {
        socket.emit('typing', false);
    }, 2000);
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    const messageInfo = document.createElement('div');
    messageInfo.className = 'message-info-chitchat';
    messageInfo.textContent = message.user;

    messageElement.appendChild(messageInfo);

    const messageText = document.createElement('div');
    messageText.textContent = message.text;
    messageElement.appendChild(messageText);

    if (message.user === 'System') {
        messageElement.className = 'message-chitchat system-message-chitchat';
    } else if (message.user === username) {
        messageElement.className = 'message-chitchat user-message-chitchat';
    } else {
        messageElement.className = 'message-chitchat other-message-chitchat';
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('fileMessage', (data) => {
    const messageElement = document.createElement('div');
    const messageInfo = document.createElement('div');
    messageInfo.className = 'message-info-chitchat';
    messageInfo.textContent = data.user;

    messageElement.appendChild(messageInfo);

    if (data.user === username) {
        messageElement.className = 'message-chitchat user-message-chitchat';
    } else {
        messageElement.className = 'message-chitchat other-message-chitchat';
    }

    const fileContent = document.createElement('div');
    fileContent.className = 'file-message-chitchat';

    if (data.fileType === 'image') {
        const img = document.createElement('img');
        img.src = data.filePath;
        img.className = 'file-message-image-chitchat';
        img.alt = data.originalName;

        const downloadLink = document.createElement('a');
        downloadLink.href = data.filePath;
        downloadLink.className = 'file-download-link-chitchat';
        downloadLink.download = data.originalName;
        downloadLink.appendChild(img);

        fileContent.appendChild(downloadLink);
    } else if (data.fileType === 'audio') {
        const audioElement = document.createElement('div');
        audioElement.className = 'audio-message-chitchat';

        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = data.filePath;
        audio.className = 'audio-player-chitchat';

        audioElement.appendChild(audio);
        fileContent.appendChild(audioElement);
    } else {
        const fileElement = document.createElement('div');
        fileElement.className = 'file-message-file-chitchat';

        const downloadLink = document.createElement('a');
        downloadLink.href = data.filePath;
        downloadLink.className = 'file-download-link-chitchat';
        downloadLink.download = data.originalName;

        const fileIcon = document.createElement('span');
        fileIcon.className = 'file-icon-chitchat';
        fileIcon.textContent = '📄';

        const fileName = document.createElement('span');
        fileName.textContent = data.originalName;

        downloadLink.appendChild(fileIcon);
        downloadLink.appendChild(fileName);
        fileElement.appendChild(downloadLink);
        fileContent.appendChild(fileElement);
    }

    messageElement.appendChild(fileContent);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('usersList', (users) => {
    usersList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user;
        usersList.appendChild(userItem);
    });
});

socket.on('userTyping', (data) => {
    if (data.isTyping) {
        typingIndicator.textContent = `${data.user} is typing...`;
    } else {
        typingIndicator.textContent = '';
    }
});

//********************************** whiteboard **********************************
//********************************** whiteboard **********************************
//********************************** whiteboard **********************************
//********************************** whiteboard **********************************
//********************************** whiteboard **********************************
//********************************** whiteboard **********************************
//********************************** whiteboard **********************************
//********************************** whiteboard **********************************

document.addEventListener('DOMContentLoaded', () => {
  const createButton = document.getElementById('create-button');
  const codeDisplay = document.getElementById('code-display');
  const codeValue = document.getElementById('code-value');
  const shareLink = document.getElementById('share-link');
  const enterEditor = document.getElementById('enter-editor');
  const joinCode = document.getElementById('join-code');
  const joinButton = document.getElementById('join-button');
  const errorMessage = document.getElementById('error-message');
  const username = document.getElementById('username');
  var DP = document.getElementById('displayPicture');

  let boys = ['/dp/boy1.jpg', '/dp/boy2.jpg', '/dp/boy3.jpg',, '/dp/boy4.jpg', '/dp/boy5.jpg', '/dp/boy6.jpg'];
  let girls = ['/dp/girl1.jpg', '/dp/girl2.jpg', '/dp/girl3.jpg', '/dp/girl4.jpg', '/dp/girl5.jpg', '/dp/girl6.jpg', '/dp/ehe1.jpg', '/dp/ehe2.jpg'];
  const languages = ['/dp/1.png', '/dp/2.png', '/dp/3.png', '/dp/4.png', '/dp/6.png', '/dp/7.png',
      '/dp/8.png', '/dp/9.png', '/dp/11.png', '/dp/12.jpg', '/dp/13.png', '/dp/21.png',
      '/dp/15.png', '/dp/16.png', '/dp/17.png', '/dp/18.png', '/dp/19.png', '/dp/20.png'];
  
  function updateDP(){
      localStorage.setItem('mydp',DP.src)
  }
  document.getElementById('male').addEventListener('click', () => {
      var number = Math.floor(Math.random() * boys.length);
      DP.src = boys[number];
      updateDP();
  });
  
  document.getElementById('female').addEventListener('click', () => {
      var number = Math.floor(Math.random() * girls.length);
      DP.src = girls[number];
      updateDP();
  });
                 
  // caputing the input and setting it in localstorage as 'myName'
  username.addEventListener('input', () => {
      localStorage.setItem('myName', username.value);
  });
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('error') === 'invalid') {
      errorMessage.style.display = 'block';
  }
  
  // new session
  createButton.addEventListener('click', async () => {
      try {
          createButton.disabled = true;
          createButton.textContent = 'Generating...';
          if(username.value === '') {
              alert('Please enter a Username');
              return;
          }
          const response = await fetch('/generate-session');
          const data = await response.json();

          if (data.sessionCode) {
              codeValue.textContent = data.sessionCode;
              const editorUrl = `${window.location.origin}/editor/${data.sessionCode}`;
              shareLink.textContent = editorUrl;
              codeDisplay.style.display = 'block';  //enter editor 

              enterEditor.addEventListener('click', () => {
                window.location.href = editorUrl;
              });
          }
      } catch (error) {
          console.error('Error generating session:', error);
          alert('Failed to generate session. Please try again.');
      } finally {
          createButton.disabled = false;
          createButton.textContent = 'Generate New Session';
      }
  });
  
  joinButton.addEventListener('click', () => {
      const code = joinCode.value.trim();
      if (code && code.length === 2 && !isNaN(code)) {
          window.location.href = `/editor/${code}`;
      } else {
          alert('Please enter a valid username and 2-digit code');
      }
  });
  
  joinCode.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          joinButton.click();
      }
  });
});



// Create tech background
function createTechBackground() {
    const techBg = document.getElementById('tech-bg');
    
    // Create horizontal lines
    for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.classList.add('grid-line', 'horizontal');
        line.style.top = `${i * 7}%`;
        techBg.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.classList.add('grid-line', 'vertical');
        line.style.left = `${i * 5}%`;
        techBg.appendChild(line);
    }
    
    // Create circuit nodes
    for (let i = 0; i < 30; i++) {
        const node = document.createElement('div');
        node.classList.add('circuit-node');
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.opacity = Math.random() * 0.5 + 0.1;
        node.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        techBg.appendChild(node);
    }
}

// Initialize
createTechBackground();
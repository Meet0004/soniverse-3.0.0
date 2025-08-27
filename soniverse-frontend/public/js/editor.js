

const socket = io();
const ngrokLink = socket;
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('container-dev').style.display = 'none';
    document.getElementById('settings-panel').style.display = 'none';
    document.getElementById('VC-panel').style.display = 'none';
    document.getElementById('AI-chatbot').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('chitchat-container').style.display = 'none';
    document.getElementById('realWhiteboard').style.display = 'none';
    initParticles();
    initTypingAnimation();
    document.getElementById('enter-editor-btn').addEventListener('click', function() {
        console.log("Enter button clicked");
        let whatTheTheme = editorInstance.getOption("theme")
        console.log("CodeMirror theme is:", whatTheTheme);

        document.getElementById('welcome-page-wp').style.display = 'none';

        const mainContent = document.getElementById('main-content');
        mainContent.style.display = 'flex';
        mainContent.style.flexDirection = 'column';
        mainContent.style.width = 'calc(100vw - 50px)';
        mainContent.style.height = 'calc(100vh)';

        const topSection = document.getElementById('top-section');
        topSection.style.display = 'flex';
        topSection.style.flex = '1';

        const bottomSection = document.getElementById('bottom-section');
        bottomSection.style.display = 'flex';

        window.dispatchEvent(new Event('resize'));

        initializeResizers();
        applyBlackboardTheme();
        document.getElementById('theme-cssSheet').href = '/css/m5new.css';
        document.getElementById('chahiyeTab').href = '';
        if(whatTheTheme == 'neo'){
            applyNeoTheme();
            console.log("heres the change");
            document.getElementById('theme-cssSheet').href = '/css/m5W.css';
            document.getElementById('chahiyeTab').href = '/css/solarized.css';
        }
    });
});

// ----------------------------------- Home Page -----------------------------------
// ----------------------------------- Home Page -----------------------------------
// ----------------------------------- Home Page -----------------------------------
// ----------------------------------- Home Page -----------------------------------
// ----------------------------------- Home Page -----------------------------------
// ----------------------------------- Home Page -----------------------------------
// ----------------------------------- Home Page -----------------------------------
function initTypingAnimation() {
    const text = "Soniverse";
    const typingText = document.getElementById('typing-text');
    let direction = 'forward';
    let charIndex = 0;
    let eraseDelay = 0;

    function updateText() {
        if (direction === 'forward') {
            charIndex++;
            typingText.textContent = text.substring(0, charIndex);

            if (charIndex === text.length) {
                direction = 'pause';
                setTimeout(() => {
                    direction = 'backward';
                    updateText();
                }, 2000);
                return;
            }
            setTimeout(updateText, 100 + Math.random() * 150);
        } else if (direction === 'backward') {
            charIndex--;
            typingText.textContent = text.substring(0, charIndex);

            if (charIndex === 0) {
                direction = 'pause';
                setTimeout(() => {
                    direction = 'forward';
                    updateText();
                }, 500);
                return;
            }

            setTimeout(updateText, 50 + Math.random() * 100);
        }
    }

    updateText();
}

function initParticles() {
    const particlesContainer = document.getElementById('particles-wp');
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}
function createParticle(container) {
    const particle = document.createElement('div');

    const binaryStrings = [
        '100001', '1111000', '110000', '101010', '111111',
        '000111', '010101', '110011', '001100', '101101',
        '0010', '1001', '1100', '0011', '1010', '0101',
        '011001', '100110', '111000', '000111', '101100',
        '011110', '000000', '111111', '100000', '000001',
        '110110', '001111', '111001', '100111', '011011',
        '010010', '110101', '101011', '111010', '011100',
        '001001', '010110', '001101', '110010', '101001',
        '011111', '111011', '000011', '100101', '011000',
        '101111', '000110', '111100', '001110', '110111',
        '011101', '010100', '111110', '100011', '001000'  ];

    const randomBinary = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
    
    particle.textContent = randomBinary;
    
    Object.assign(particle.style, {
        position: 'absolute',
        fontSize: Math.random() * 8 + 8 + 'px', // Size between 8-16px
        color: 'rgba(0, 200, 255, ' + (Math.random() * 0.5 + 0.1) + ')',
        fontFamily: 'monospace',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        transform: 'translate(-50%, -50%)',
        textShadow: '0 0 5px rgba(0, 200, 255, 0.8)',
        animation: `particle-animation-${Math.floor(Math.random() * 4) + 1} ${Math.random() * 20 + 15}s linear infinite`,
        pointerEvents: 'none' // So they don't interfere with clicks
    });
  container.appendChild(particle);
}

const style = document.createElement('style');
style.textContent = `
@keyframes particle-animation-1 {
  0% {
      transform: translate(-50%, -50%) translateY(0) translateX(0);
      opacity: 1;
  }
  50% {
      opacity: 0.5;
  }
  100% {
      transform: translate(-50%, -50%) translateY(-100vh) translateX(20vw);
      opacity: 0;
  }
}

@keyframes particle-animation-2 {
  0% {
      transform: translate(-50%, -50%) translateY(0) translateX(0);
      opacity: 1;
  }
  50% {
      opacity: 0.7;
  }
  100% {
      transform: translate(-50%, -50%) translateY(-100vh) translateX(-20vw);
      opacity: 0;
  }
}

@keyframes particle-animation-3 {
  0% {
      transform: translate(-50%, -50%) translateY(100vh) translateX(0);
      opacity: 0;
  }
  20% {
      opacity: 1;
  }
  80% {
      opacity: 0.7;
  }
  100% {
      transform: translate(-50%, -50%) translateY(-100vh) translateX(30vw);
      opacity: 0;
  }
}

@keyframes particle-animation-4 {
  0% {
      transform: translate(-50%, -50%) translateY(100vh) translateX(0);
      opacity: 0;
  }
  20% {
      opacity: 0.5;
  }
  80% {
      opacity: 0.3;
  }
  100% {
      transform: translate(-50%, -50%) translateY(-100vh) translateX(-30vw);
      opacity: 0;
  }
}
`;
document.head.appendChild(style);


// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
const setupVerticalResize = (divider, leftPanel, rightPanel) => {
    let isDragging = false;
    let startX, leftWidth, rightWidth;

    divider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        leftWidth = leftPanel.offsetWidth;
        rightWidth = rightPanel.offsetWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        divider.style.background = '#aaa';
        e.preventDefault();
    });

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const container = divider.parentNode;
        const containerWidth = container.offsetWidth;
        
        const newLeftWidth = leftWidth + dx;
        const newRightWidth = rightWidth - dx;
        
        const leftMin = parseInt(leftPanel.style.minWidth) || 100;
        const rightMin = parseInt(rightPanel.style.minWidth) || 100;
        
        if (newLeftWidth >= leftMin && newRightWidth >= rightMin) {
          leftPanel.style.flex = '0 0 ' + newLeftWidth + 'px';
          rightPanel.style.flex = '0 0 ' + newRightWidth + 'px';
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        divider.style.background = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};

const setupHorizontalResize = (divider, topSection, bottomSection) => {
    let isDragging = false;
    let startY, topHeight, bottomHeight;

    divider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      topHeight = topSection.offsetHeight;
      bottomHeight = bottomSection.offsetHeight;
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      
      divider.style.background = '#aaa';
      
      e.preventDefault();
    });

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const dy = e.clientY - startY;
        const container = divider.parentNode;
        const containerHeight = container.offsetHeight;
        
        const newTopHeight = topHeight + dy;
        const newBottomHeight = bottomHeight - dy;
        
        const minHeight = 50;
        
        if (newTopHeight >= minHeight && newBottomHeight >= minHeight) {
            topSection.style.flex = '0 0 ' + newTopHeight + 'px';
            bottomSection.style.height = newBottomHeight + 'px';
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        divider.style.background = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};

function initializeResizers() {
    // vertical resizers
    setupVerticalResize(document.getElementById('divider1'),
                      document.getElementById('directory-panel'),
                      document.getElementById('code-panel'));
  
    setupVerticalResize(document.getElementById('divider2'),
                      document.getElementById('code-panel'),
                      document.getElementById('duplicate-panel'));
  
    setupVerticalResize(document.getElementById('divider3'),
                      document.getElementById('duplicate-panel'),
                      document.getElementById('minimap-panel'));
  
    setupVerticalResize(document.getElementById('divider4'),
                      document.getElementById('output-panel'),
                      document.getElementById('input-panel'));
  
    // horizontal resizer
    setupVerticalResize(
      document.getElementById('divider1-dev'),
      document.getElementById('directory-panel-dev'),
      document.getElementById('html-panel-dev')
    );

    setupVerticalResize(
      document.getElementById('divider2-dev'),
      document.getElementById('html-panel-dev'),
      document.getElementById('css-panel-dev')
    );

    setupHorizontalResize(
      document.getElementById('divider3-dev'),
      document.getElementById('top-section-dev'),
      document.getElementById('js-panel-dev')
    );

    setupVerticalResize(
      document.getElementById('divider-main-dev'),
      document.getElementById('left-side-dev'),
      document.getElementById('right-side-dev')
    );
}
initializeResizers();

// ----------------------------------- icons and it's behavior -----------------------------------
// ----------------------------------- icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
let isCode2 = false;
let isSettings = false;
let VCModeActive = false;
let AIModeActive = false;
let isConverter = false; // or false depending on the initial state
let isCallChat = false;
let isWhiteboard = false;

const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
    icon.addEventListener('click', () => {
        icons.forEach(i => i.classList.remove('active'));
        
        icon.classList.add('active');
        
        const title = icon.getAttribute('title');
        console.log(`${title} icon clicked`);
        
        if (title === "File Explorer") {
            document.getElementById('directory-panel').classList.toggle('hidden');
        }
        if (title === "Code-2") {
          isCode2 = !isCode2; // toggle the state
        
          if (isCode2) {
            document.getElementById('duplicate-panel').style.display = 'block';
          } else {
            document.getElementById('duplicate-panel').style.display = 'none';
          }
        }
        
        if (title === "Minimap") {
            document.getElementById('minimap-panel').classList.toggle('hidden');
        }
        if (title === "Output") {
            document.getElementById('output-panel').classList.toggle('hidden');
            checkBottomSectionVisibility();
        }
        if (title === "Input") {
            document.getElementById('input-panel').classList.toggle('hidden');
            checkBottomSectionVisibility();   
        }
        if(title === "File Explorer Dev"){
            document.getElementById('directory-panel-dev').classList.toggle('hidden');
        }
        // if  (title === "HTML") {
        //     document.getElementById('html-panel-dev').classList.toggle('hidden');
        // }
        if (title === "CSS") {
            document.getElementById('css-panel-dev').classList.toggle('hidden');
        }
        if (title === "JS") {
            document.getElementById('js-panel-dev').classList.toggle('hidden');
        }
        // if (title === "Preview") {
        //     document.getElementById('preview-panel-dev').classList.toggle('hidden');
        //     
        // }

        if (title === "VC") {
            const vcPanel = document.getElementById('VC-panel');
            const mainContent = document.getElementById('main-content');
            const devContainer = document.getElementById('container-dev');
            const settingsPanel = document.getElementById('settings-panel');
            const iconSidebar = document.getElementById('icon-sidebar');
            document.getElementById('AI-chatbot').style.display = 'none';
            document.getElementById('chitchat-container').style.display = 'none';
            document.getElementById('realWhiteboard').style.display = 'none';
            VCModeActive = !VCModeActive;
        
            if (VCModeActive) {
                vcPanel.style.display = 'flex';
                mainContent.style.display = 'none';
                devContainer.style.display = 'none';
                settingsPanel.style.display = 'none';
        
                DevModeActive = false;
                SettingsActive = false;
                iconSidebar.classList.remove('show-dev');
                iconSidebar.classList.remove('show-settings');
            } else {
                vcPanel.style.display = 'none';
                mainContent.style.display = 'flex';
            }
        
            initializeResizers(); // optional if needed
        }
        
        if (title === "AI") {
            const aiPanel = document.getElementById('AI-chatbot');
            const mainContent = document.getElementById('main-content');
            const devContainer = document.getElementById('container-dev');
            const settingsPanel = document.getElementById('settings-panel');
            const vcPanel = document.getElementById('VC-panel');
            const iconSidebar = document.getElementById('icon-sidebar');
            document.getElementById('VC-panel').style.display = 'none';
            document.getElementById('chitchat-container').style.display = 'none';
            document.getElementById('realWhiteboard').style.display = 'none';
            AIModeActive = !AIModeActive;
        
            if (AIModeActive) {
                aiPanel.style.display = 'flex';
                mainContent.style.display = 'none';
                devContainer.style.display = 'none';
                settingsPanel.style.display = 'none';
                vcPanel.style.display = 'none';
        
                DevModeActive = false;
                SettingsActive = false;
                VCModeActive = false;
        
                iconSidebar.classList.remove('show-dev');
                iconSidebar.classList.remove('show-settings');
            } else {
                aiPanel.style.display = 'none';
                mainContent.style.display = 'flex';
            }
        
            initializeResizers(); // optional
        }
        
        if(title === 'Compile'){
            compilation();
            document.getElementById('compilekaDiv').style.display = 'block';
            document.getElementById('outputkadiv').style.display = 'none';
        }
        if(title === 'Run'){
            runCode();
            document.getElementById('compilekaDiv').style.display = 'none';
            document.getElementById('outputkadiv').style.display = 'block';
        }
        if(title === 'Sample-HTML'){
            htmlEditor.setValue(sampleCode['html']);
            cssEditor.setValue(sampleCode['css']);
            jsEditor.setValue(sampleCode['js']);
        }

        if(title === 'Save'){
            saveCode();
        }
        if(title === 'converter'){
            isConverter = !isConverter;
            if(isConverter) {
                document.getElementById('converter-container').style.display = 'flex';
                document.getElementById('container-dev').style.display = 'none';
                document.getElementById('settings-panel').style.display = 'none';
            } else {
                document.getElementById('converter-container').style.display = 'none';
                document.getElementById('container-dev').style.display = 'flex';
            }
        }

        if (title === 'call-chat') {
            isCallChat = !isCallChat;
            hideAllPanels(); // Optional: use if you're hiding all others
            document.getElementById('chitchat-container').style.display = isCallChat ? 'flex' : 'none';
            if (!isCallChat) document.getElementById('main-content').style.display = 'flex';

        }
        
        if (title === 'whiteboard') {
            isWhiteboard = !isWhiteboard;
            hideAllPanels(); // Optional
            document.getElementById('realWhiteboard').style.display = isWhiteboard ? 'flex' : 'none';
            if (!isWhiteboard) document.getElementById('main-content').style.display = 'flex';
        }
        
    });
});

const bottomSection = document.getElementById('bottom-section');
const horizontalDivider = document.getElementById('horizontal-divider');

function checkBottomSectionVisibility() {
    const outputHidden = document.getElementById('output-panel').classList.contains('hidden');
    const inputHidden = document.getElementById('input-panel').classList.contains('hidden');
    
    if (outputHidden && inputHidden) {
        bottomSection.classList.add('hidden');
        horizontalDivider.classList.add('hidden');
    } else {
        bottomSection.classList.remove('hidden');
        horizontalDivider.classList.remove('hidden');
    }
}
function hideAllPanels() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('container-dev').style.display = 'none';
    document.getElementById('settings-panel').style.display = 'none';
    document.getElementById('VC-panel').style.display = 'none';
    document.getElementById('AI-chatbot').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('chitchat-container').style.display = 'none';
    document.getElementById('realWhiteboard').style.display = 'none';
}


// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// Store panel states before dev mode
let savedPanelStates = {
    outputHidden: false,
    inputHidden: false
};

document.getElementById('container-dev').style.display = 'none';
let DevModeActive = false;

document.getElementById('dev-mode').addEventListener('click',  () => {
    const iconSidebar = document.getElementById('icon-sidebar');
    const mainContent = document.getElementById('main-content');
    const devContainer = document.getElementById('container-dev');
    const bottomSection = document.getElementById('bottom-section');
    const horizontalDivider = document.getElementById('horizontal-divider');
    const outputPanel = document.getElementById('output-panel');
    const inputPanel = document.getElementById('input-panel');
    document.getElementById('chitchat-container').style.display = 'none';
    document.getElementById('realWhiteboard').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('VC-panel').style.display = 'none';
    VCModeActive = false;
    document.getElementById('AI-chatbot').style.display = 'none';
    AIModeActive = false;
    
    if (!DevModeActive) {
        iconSidebar.classList.add('show-dev');

        // Save current panel states
        savedPanelStates.outputHidden = outputPanel.classList.contains('hidden');
        savedPanelStates.inputHidden = inputPanel.classList.contains('hidden');

        // Show dev panels
        outputPanel.classList.remove('hidden');
        inputPanel.classList.remove('hidden');
        bottomSection.classList.remove('hidden');
        horizontalDivider.classList.remove('hidden');

        // Switch views
        mainContent.style.display = 'none';
        devContainer.style.display = 'flex';
        DevModeActive = true;
    } else {
        iconSidebar.classList.remove('show-dev');

        // Exit dev mode
        devContainer.style.display = 'none';
        mainContent.style.display = 'flex';
        DevModeActive = false;

        // Restore panel visibility
        if (savedPanelStates.outputHidden) outputPanel.classList.add('hidden');
        if (savedPanelStates.inputHidden) inputPanel.classList.add('hidden');

        checkBottomSectionVisibility();
    }

    // Always reinitialize resizers after switching modes
    initializeResizers();
});


// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
let SettingsActive = false;
const savedPanelStatesSettings = {
    outputHidden: false,
    inputHidden: false
};

document.getElementById('settings-panel').style.display = 'none';

document.getElementById('settings-mode').addEventListener('click', () => {
    const iconSidebar = document.getElementById('icon-sidebar');
    const mainContent = document.getElementById('main-content');
    const settingsPanel = document.getElementById('settings-panel');
    const bottomSection = document.getElementById('bottom-section');
    const horizontalDivider = document.getElementById('horizontal-divider');
    const outputPanel = document.getElementById('output-panel');
    const inputPanel = document.getElementById('input-panel');
    document.getElementById('chitchat-container').style.display = 'none';
    document.getElementById('realWhiteboard').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('VC-panel').style.display = 'none';
    document.getElementById('AI-chatbot').style.display = 'none';
    if (!SettingsActive) {
        iconSidebar.classList.add('show-settings');
        savedPanelStatesSettings.outputHidden = outputPanel.classList.contains('hidden');
        savedPanelStatesSettings.inputHidden = inputPanel.classList.contains('hidden');

        outputPanel.classList.remove('hidden');
        inputPanel.classList.remove('hidden');
        bottomSection.classList.remove('hidden');
        horizontalDivider.classList.remove('hidden');

        mainContent.style.display = 'none';
        settingsPanel.style.display = 'flex';
        SettingsActive = true;
    } else {
        iconSidebar.classList.remove('show-settings');

        settingsPanel.style.display = 'none';
        mainContent.style.display = 'flex';
        SettingsActive = false;

        if (savedPanelStatesSettings.outputHidden) outputPanel.classList.add('hidden');
        if (savedPanelStatesSettings.inputHidden) inputPanel.classList.add('hidden');

        checkBottomSectionVisibility();
    }

    initializeResizers();
});

function adjustDevPanels() {
    const html = document.getElementById('html-panel-dev');
    const css = document.getElementById('css-panel-dev');
    const js = document.getElementById('js-panel-dev');
    const preview = document.getElementById('preview-panel-dev');

    const allPanels = [html, css, js, preview];
    const visiblePanels = allPanels.filter(panel => !panel.classList.contains('hidden'));
    const panelWidth = 100 / visiblePanels.length + '%';

    visiblePanels.forEach(panel => {
        panel.style.flex = `0 0 ${panelWidth}`;
    });
}


// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------

const settingsButtons = document.querySelectorAll('.eachsettings');
const contentPanels = document.querySelectorAll('.content');

settingsButtons.forEach(button => {
    button.addEventListener('click', function() {
        settingsButtons.forEach(btn => btn.classList.remove('active'));
        contentPanels.forEach(panel => panel.classList.remove('active'));
        this.classList.add('active');
        
        //data-settings attribute value
        const settingsNumber = this.getAttribute('data-settings');
        
        const activeContent = document.querySelector(`.content-${settingsNumber}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});


// ----------------------------------- Version Control -----------------------------------
// ----------------------------------- Version Control -----------------------------------
// ----------------------------------- Version Control -----------------------------------
// ----------------------------------- Version Control -----------------------------------
// ----------------------------------- Version Control -----------------------------------
// ----------------------------------- Version Control -----------------------------------
// ----------------------------------- Version Control -----------------------------------

  
function mediumEncryptKar(message) {
    let encrypted = '';
    const shifts = [3, 5, 7];
    const xorKeys = [111, 123, 145];
    for (let i = 0; i < message.length; i++) {
        let shift = shifts[i % shifts.length];
        let xorKey = xorKeys[i % xorKeys.length];
        let shiftedChar = String.fromCharCode(message.charCodeAt(i) + shift);
        let encryptedChar = String.fromCharCode(shiftedChar.charCodeAt(0) ^ xorKey);
        encrypted += encryptedChar;
    }
    return toBase64(encrypted);
}
  
function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}
  
function fromBase64(base64) {
    return decodeURIComponent(escape(atob(base64)));
}
  
function mediumDecryptKar(encryptedMessage) {
      let encrypted = fromBase64(encryptedMessage);
      let decrypted = '';
      const shifts = [3, 5, 7]; 
      const xorKeys = [111, 123, 145]; 
      for (let i = 0; i < encrypted.length; i++) {
          let shift = shifts[i % shifts.length];
          let xorKey = xorKeys[i % xorKeys.length];
  
          let xorDecryptedChar = String.fromCharCode(encrypted.charCodeAt(i) ^ xorKey);
  
          let originalChar = String.fromCharCode(xorDecryptedChar.charCodeAt(0) - shift);
  
          decrypted += originalChar;
      }
    return decrypted;
}
  
// const personalAccessToken = document.getElementById('personalAccessToken').value;
// var encryptedPersonalAccessToken = mediumEncryptKar(personalAccessToken) // encrypt kiya
// localStorage.setItem('personalAccessToken', encryptedPersonalAccessToken);  // encrypted store kiya
// var decryptedPersonalAccessToken = mediumDecryptKar(encryptedPersonalAccessToken); // decrypt kiya

// console.log("OG key: "+personalAccessToken)
// console.log("Encrypted : "+encryptedPersonalAccessToken)
// console.log("Decrypted : "+decryptedPersonalAccessToken)
  
document.getElementById('commitForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusDiv = document.getElementById('commit_status');
    statusDiv.innerHTML = 'Processing...';
    statusDiv.classList.remove('hide');
    statusDiv.classList.add('show');
  
    const personalAccessToken = document.getElementById('personalAccessToken').value;
    const repoOwner = document.getElementById('repoOwner').value;
    const repoName = document.getElementById('repoName').value;
    const filePath = document.getElementById('filePath').value;
    const commitMessage = document.getElementById('commitMessage').value;
    
    const formData = {
        personalAccessToken,
        repoOwner,
        repoName,
        filePath,
        commitMessage,
        fileContent: editorInstance.getValue()
    };
    const formattedTime = new Date().toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }) + ' ' + new Date().toLocaleDateString('en-GB');
  
    let encryptedPersonalAccessToken = mediumEncryptKar(personalAccessToken)
    console.log(encryptedPersonalAccessToken)
    localStorage.setItem('personalAccessToken', encryptedPersonalAccessToken);
    localStorage.setItem('repoOwner', repoOwner);
    localStorage.setItem('repoName', repoName);
    localStorage.setItem('filePath', filePath);
    localStorage.setItem('commitMessage', commitMessage);
    localStorage.setItem('CommitTimings', formattedTime);
    
    document.getElementById('OwnerName').innerText = localStorage.getItem('repoOwner');
    document.getElementById('RepoName').innerText = localStorage.getItem('repoName');
    document.getElementById('FilePath').innerText = localStorage.getItem('filePath');
    document.getElementById('CommitMessage').innerText = localStorage.getItem('commitMessage');
    document.getElementById('CommitTimings').innerText = localStorage.getItem('CommitTimings');
    
    async function commitToGitHub(formData) {
        const { personalAccessToken, repoOwner, repoName, filePath, commitMessage, fileContent=editor.getValue() } = formData;
  
        try {
            // Fetch file details to get SHA
            const fileResponse = await fetch(
                `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `token ${personalAccessToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );
  
            if (!fileResponse.ok) throw new Error('Failed to fetch file details');
  
            const fileData = await fileResponse.json();
            const sha = fileData.sha;
  
            // Commit payload
            const commitPayload = {
                message: commitMessage,
                content: btoa(fileContent),
                sha,
                branch: 'main'
            };
  
            // Commit file
            const commitResponse = await fetch(
                `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${personalAccessToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commitPayload)
                }
            );
  
            const result = await commitResponse.json();
  
            if (commitResponse.ok) {
                statusDiv.innerHTML = 'Wohoo! Commit successful!';
                statusDiv.style.color = 'var(--success-light)';
            } else {
                statusDiv.innerHTML = `Commit failed: ${result.message}`;
                statusDiv.style.color = 'var(--error-dark)';
            }
  
            setTimeout(() => {
                statusDiv.classList.remove('show');
                statusDiv.classList.add('hide');
            }, 2500);
            setTimeout(() => {
                statusDiv.innerText = '';
            }, 3000);
        } catch (error) {
            console.error('GitHub Commit Error:', error.message);
            statusDiv.innerHTML = 'Error: Please try again!';
            statusDiv.style.color = 'red';
        }
    }
    commitToGitHub(formData);
});
  
document.getElementById('getHistory').addEventListener('click', () => {
    try {
        console.log("dab rah hai");
        const elements = ['history-1', 'history-2', 'history-3'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
        });
      
        document.getElementById('personalAccessToken').value = mediumDecryptKar(localStorage.getItem('personalAccessToken'));
        document.getElementById('OwnerName').innerText = localStorage.getItem('repoOwner');
        document.getElementById('RepoName').innerText = localStorage.getItem('repoName');
        document.getElementById('FilePath').innerText = localStorage.getItem('filePath');
        document.getElementById('CommitMessage').innerText = localStorage.getItem('commitMessage');
        document.getElementById('CommitTimings').innerText = localStorage.getItem('CommitTimings');
      
    } catch (error) {
        console.log(error);
    }
});
  
document.getElementById('fill-details-btn').addEventListener('click',() =>{
    document.getElementById('personalAccessToken').value = mediumDecryptKar(localStorage.getItem('personalAccessToken'));
    document.getElementById('repoOwner').value = document.getElementById('OwnerName').innerText;
    document.getElementById('repoName').value = document.getElementById('RepoName').innerText;
    document.getElementById('filePath').value = document.getElementById('FilePath').innerText;
    document.getElementById('commitMessage').value = document.getElementById('CommitMessage').innerText;
});
  
document.getElementById('resetVCBtn').addEventListener('click', () => {
    document.getElementById('personalAccessToken').value = '';
    document.getElementById('repoOwner').value  = '';
    document.getElementById('repoName').value = '';
    document.getElementById('filePath').value = '';
    document.getElementById('commitMessage').value = '';
});


// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------
// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------
// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------
// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------
// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------
// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------
// ----------------------------------- chat botttttttttttttttttttttttttt -----------------------------------

const chatMessagesAI = document.getElementById('chat-messages-AI');
const messageInputAI = document.getElementById('message-input-AI');
const sendButtonAI = document.getElementById('send-button-AI');
const apiKeyInputAI = document.getElementById('api-key-AI');
const modelSelectAI = document.getElementById('model-select-AI');

function addMessageAI(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-AI ${isUser ? 'user-message-AI' : 'ai-message-AI'}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content-AI';
    messageContent.textContent = text;

    messageDiv.appendChild(messageContent);
    chatMessagesAI.appendChild(messageDiv);
    chatMessagesAI.scrollTop = chatMessagesAI.scrollHeight;
}

function showTypingIndicatorAI() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-AI ai-message-AI typing-AI';
    typingDiv.id = 'typing-indicator-AI';

    const typingContent = document.createElement('div');
    typingContent.className = 'message-content-AI';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot-AI';
        typingContent.appendChild(dot);
    }

    typingDiv.appendChild(typingContent);
    chatMessagesAI.appendChild(typingDiv);
    chatMessagesAI.scrollTop = chatMessagesAI.scrollHeight;
}

function removeTypingIndicatorAI() {
    const typingIndicator = document.getElementById('typing-indicator-AI');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function sendToAIAssistant(message) {
    const apiKey = document.getElementById('api-key-AI').value.trim();

    if (!apiKey) {
        addMessageAI("Please enter your Cohere API key to continue.", false);
        return;
    }

    showTypingIndicatorAI();

    try {
        const payload = JSON.stringify({
            message: message,
            chat_history: [],
            connectors: [],
        });

        const response = await fetch("https://api.cohere.ai/v1/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: payload
        });

        removeTypingIndicatorAI();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }

        const data = await response.json();
        const aiResponse = data.text;

        addMessageAI(aiResponse.trim(), false);
    } catch (error) {
        removeTypingIndicatorAI();
        addMessageAI(`Error: ${error.message}`, false);
    }
}


sendButtonAI.addEventListener('click', () => {
    const message = messageInputAI.value.trim();
    if (message) {
        addMessageAI(message, true);
        messageInputAI.value = '';
        sendToAIAssistant(message);
    }
});

messageInputAI.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButtonAI.click();
    }
});



// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------

let editor = document.getElementById("editor");
let editor5 = document.getElementById("editor5");
const enteredData = document.getElementById("input");
const output = document.getElementById("Output");
let language = document.getElementById("language");
const extension = document.getElementById("extension");

// COde mirrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
let editorInstance, editorInstance5
let isUpdating2 = false;  // taaki no infinite loopsssssss

//editorInstance5.setValue(editorInstance.getValue())

editorInstance = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'Blackboard',
    mode: 'python',
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

editorInstance.setSize(null, "100%");

editorInstance5 = CodeMirror.fromTextArea(document.getElementById('editor5'), {
    // lineNumbers: true,
    theme: 'blackboard',
    mode: 'python',
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

editorInstance5.setSize(null, "100%");
// Minimap (Read-Only Clone)
let minimap = CodeMirror(document.getElementById("minimap"), {
    mode: "python",
    theme: "dracula",
    readOnly: "nocursor",
    lineNumbers: false,
    viewportMargin: Infinity,
    lineWrapping: false
});

// Sync content
editorInstance.on("change", () => {
    minimap.setValue(editorInstance.getValue());
    editorInstance5.setValue(editorInstance.getValue());
});

// Sync scroll
editorInstance.on("scroll", () => {
    let scrollInfo = editorInstance.getScrollInfo();
    minimap.scrollTo(0, scrollInfo.top);
});
const breakpoints = new Set();

function toggleBreakpoint(cm, line) {
    const info = cm.lineInfo(line);
    if (info.gutterMarkers && info.gutterMarkers.breakpoints) {
        cm.setGutterMarker(line, "breakpoints", null);
        breakpoints.delete(line);
    } else {
        const marker = document.createElement("div");
        marker.className = "breakpoint";
        cm.setGutterMarker(line, "breakpoints", marker);
        breakpoints.add(line);
    }
    console.log("Breakpoints:", Array.from(breakpoints));
}

editorInstance.on("gutterClick", function(cm, line) {
    toggleBreakpoint(cm, line);
});

// ----------------------------------- Dropdown -----------------------------------
// ----------------------------------- Dropdown -----------------------------------
// ----------------------------------- Dropdown -----------------------------------
// ----------------------------------- Dropdown -----------------------------------
// ----------------------------------- Dropdown -----------------------------------
// ----------------------------------- Dropdown -----------------------------------
// ----------------------------------- Dropdown -----------------------------------


// Toggle dropdown menu
const dropdownToggle = document.getElementById('language-dropdown-toggle');
const dropdownMenu = document.getElementById('language-dropdown-menu');
const selectedLangImg = document.getElementById('selected-lang-img');
const selectedLangText = document.getElementById('selected-lang-text');

dropdownToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-container')) {
        dropdownMenu.classList.remove('show');
    }
});

// Handle language selection
const languageButtons = document.querySelectorAll('.language-btn');
languageButtons.forEach(button => {
    button.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const langName = this.textContent.trim();
        
        selectedLangImg.src = imgSrc;
        selectedLangText.textContent = langName;
        dropdownMenu.classList.remove('show');
    });
});



// ----------------------------------- working of Dropwdown -----------------------------------
// ----------------------------------- working of Dropwdown -----------------------------------
// ----------------------------------- working of Dropwdown -----------------------------------
// ----------------------------------- working of Dropwdown -----------------------------------
// ----------------------------------- working of Dropwdown -----------------------------------
// ----------------------------------- working of Dropwdown -----------------------------------
// ----------------------------------- working of Dropwdown -----------------------------------


languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedLang = btn.id;
        const code = sampleCode[selectedLang];
        setEditorMode(selectedLang);
        // Update selected language UI
        document.getElementById('selected-lang-text').innerText = btn.innerText.trim();
        document.getElementById('selected-lang-img').src = btn.querySelector('img').src;

        // Set sample code in editor
        if (typeof editorInstance !== 'undefined') {
            editorInstance.setValue(code); // If using Monaco or Ace editor
        } else {
            editor.value = code; // Fallback for <textarea>
        }

        // Close dropdown (optional)
        document.getElementById('language-dropdown-menu').style.display = 'none';
    });
});

// sample code
const sampleCode = {
    // Programmer mode
    c: `// C language ----------------\n\n#include <stdio.h>\n#include <string.h>\nint main() {\n    char str[] = "Hello SoniVerse by C";\n    printf("%s", str);\nreturn 0;\n}`,
    cpp: `// C++ Language ---------------\n\n#include <iostream>\nint main() {\n    std::string str = "Hello SoniVerse by C++";\n    std::cout << str;\nreturn 0;\n}`,
    java: `// Java Language ---------------\n\npublic class Main {\n    public static void main(String[] args) {\n        String str = "Hello SoniVerse by Java";\n        System.out.println(str);\n    }\n}`,
    python: `# Python Language ------------\n\nprint("Hello SoniVerse by Python")`,
    javascript: `// JavaScript Language ------------\n\nconsole.log("Hello SoniVerse by JavaScript");`,
    dart: `// Dart Language ------------\n\nvoid main() {\n    print("Hello SoniVerse by Dart");\n}`,
    typescript: `// TypeScript Language ------------\n\nconsole.log('Hello SoniVerse by TypeScript');`,
    go: `// Go Language ------------\n\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello SoniVerse by Go")\n}`,
    rust: `// Rust Language ------------\n\nfn main() {\n    println!("Hello SoniVerse by Rust");\n}`,
    r: `# R Language ------------\n\nprint("Hello SoniVerse by R")`,
    php: `<?php\n// PHP Language ------------\n\necho "Hello SoniVerse by PHP";\n?>`,
    ruby: `# Ruby Language ------------\n\nputs "Hello SoniVerse by Ruby"`,
    swift: `// Swift Language ------------\n\nimport Swift\n\nprint("Hello SoniVerse by Swift")`,
    kotlin: `// Kotlin Language ------------\n\nfun main() {\n    println("Hello SoniVerse by Kotlin")\n}`,

    // Dev Mode
    html:`<!-- HTML Language ------------ -->\n\n<html>\n	<head>\n		<title>Soniverse</title>\n		<link rel="stylesheet" href="style.css">\n	</head>\n	<body>\n		<h1 id="heading">Hello World</h1>\n		<button id="wish"> Click to wish </button>\n\n		<script src="script.js"></script>\n     </body>\n</html> `,
    css:`/* CSS Language -------------*/\n\n#heading{\n    color: green;\n}\n#wish{\n    border: none;\n    border: 1px solid black;\n    border-radius: 15px;\n    padding: 10px;\n}`,
    js:`// JavaScript Language ------------\n\nconst wishBtn = document.getElementById("wish");\nconst h1 = document.getElementById('heading');\nlet isWish = true;\nwishBtn.addEventListener('click', () =>{\n    if(isWish){\n        isWish = false;\n        h1.innerText = "Hello Soniverse";\n    }else{\n        isWish = true;\n        h1.innerText = "Hello World";\n    }\n})`
};
const toggle = document.getElementById('language-dropdown-toggle');
const menu = document.getElementById('language-dropdown-menu');

toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    const isVisible = menu.style.display === 'block';
    menu.style.display = isVisible ? 'none' : 'block';
});

editorInstance.setValue(sampleCode['java']);


function setEditorMode(language) {
    const modeMap = {
        'c': 'text/x-csrc',
        'cpp': 'text/x-c++src',
        'java': 'text/x-java',
        'python': 'text/x-python',
        'javascript': 'text/javascript',
        'typescript': 'text/typescript',
        'dart': 'application/dart',
        'go': 'text/x-go',
        // 'rust': 'text/x-rust',
        // 'r': 'text/x-r',
        'rust': 'text/x-rustsrc', // Correct MIME type for Rust
        'r': 'text/x-rsrc', // Correct MIME type for R
        'php': 'application/x-httpd-php',
        'ruby': 'text/x-ruby',
        'swift': 'text/x-swift',
        'kotlin': 'text/x-kotlin'
    };
    
    editorInstance.setOption('mode', modeMap[language] || 'text/plain');
}



// ---------------------------- Compilation and Execution ----------------------------
// ---------------------------- Compilation and Execution ----------------------------
// ---------------------------- Compilation and Execution ----------------------------
// ---------------------------- Compilation and Execution ----------------------------
// ---------------------------- Compilation and Execution ----------------------------
// ---------------------------- Compilation and Execution ----------------------------

async function compilation() {
    let status = document.getElementById('compile-status');
    let errorOutput = document.getElementById('error-output');
    status.innerText = "Compiling...";
    status.style.color = "black";
    document.getElementById('compilation-time').innerText = "Calculating...";
    const startTime = performance.now();

    const language = document.getElementById('selected-lang-text').innerText.toLowerCase();
    const fileName = getFileName(language);
    const version = getLatestVersion(language);

    const requestData = {
        code: editorInstance.getValue(),
        language,
        input: enteredData.value
    };

    console.log("Sending data:", requestData);
    const apiUrl = "https://emkc.org/api/v2/piston/execute";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language,
                version,
                files: [{ name: fileName, content: requestData.code }],
                stdin: requestData.input
            })
        });

        const data = await response.json();
        const executionTime = (performance.now() - startTime).toFixed(2) + " ms";
        console.log("Response data:", data);

        if (data.run?.stderr) {
            status.innerText = "Compilation Error!";
            status.style.color = "red";
            errorOutput.innerText = formatErrorMessage(data.run.stderr);

            const lineNumber = extractErrorLine(data.run.stderr);
            if (lineNumber) highlightErrorLine(lineNumber);
        } else {
            status.innerText = "Compiled successfully!";
            status.style.color = "green";
            errorOutput.innerText = "";
        }

        document.getElementById('compilation-time').innerText = executionTime;
    } catch (error) {
        console.error("Compilation error:", error);
        status.innerText = "Compilation failed!";
        status.style.color = "red";
        const executionTime = (performance.now() - startTime).toFixed(2) + " ms";
        document.getElementById('compilation-time').innerText = executionTime;
    }
}

  
function extractErrorLine(errorMessage) {
    const match = errorMessage.match(/main:(\d+):/); 
    return match ? parseInt(match[1], 10) : null;
}
  
function highlightErrorLine(lineNumber) {
    let lines = editor.value.split("\n");
    let highlightedText = lines.map((line, index) => {
        return index + 1 === lineNumber ? `>> ${line}` : line; //  '>>' before the error line
    }).join("\n");
  
    editorInstance.setValue(highlightedText);
}
  
function formatErrorMessage(errorMsg) {
      return errorMsg.replace(/\n/g, "\n➡ "); 
}

const selectedLanguage = document.getElementById('selected-lang-text').innerText.toLowerCase();
// run code
async function runCode() {
    const code = editorInstance.getValue().trim();
    const output = document.getElementById('output');
    document.getElementById('output').innerText = 'Executing....';
    document.getElementById('execution-time').innerText = "Calculating...";

    const startTime = performance.now();

    if (!code) {
        output.innerText = 'Please enter some code before running';
        return;
    }
    
    
    const payload = {
        language: document.getElementById('selected-lang-text').innerText.toLowerCase(),
        version: getLatestVersion(document.getElementById('selected-lang-text').innerText.toLowerCase()),
        files: [
            {
                name: getFileName(selectedLanguage),
                content: editorInstance.getValue()
            }
        ],
        stdin: enteredData.value,
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000
    };

    console.log("Payload : ", payload);
    
    try {
        // Make API request using fetch instead of axios
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Payload response : ", data);
        const executionTime = (performance.now() - startTime).toFixed(2) + " ms";
        let resultText = '';

        if (data.compile && data.compile.stderr) {
            resultText += data.compile.stderr;
        }
        
        // Add output if available
        if (data.run) {
            if (data.run.stdout) {
                resultText += data.run.stdout;
            }
            
            if (data.run.stderr) {
                resultText += data.run.stderr;
            }
        }
        
        output.innerText = resultText || 'No output';
        document.getElementById('execution-time').innerText = executionTime;
        
    } catch (error) {
        console.error('Error executing code:', error);
        output.innerHTML = error.message;
        const executionTime = (performance.now() - startTime).toFixed(2) + " ms";
        document.getElementById('execution-time').innerText = executionTime;
    }
}

// niche wala func will get the file name according to the language
function getFileName(language) {
    const fileExtensions = {
        c: 'main.c',
        cpp: 'main.cpp',
        java: 'Main.java',
        python: 'main.py',
        javascript: 'main.js',
        dart: 'main.dart',
        typescript: 'main.ts',
        go: 'main.go',
        rust: 'main.rs',
        r: 'main.r',
        php: 'main.php',
        ruby: 'main.rb',
        swift: 'main.swift',
        kotlin: 'Main.kt'
    };
    
    return fileExtensions[language] || 'main.txt';
}

// niche wala func will get the latest version of the language
function getLatestVersion(language) {
    const versions = {
        c: '10.2.0',
        cpp: '10.2.0',
        java: '15.0.2',
        python: '3.10.0',
        javascript: '18.15.0',
        dart: '2.19.6',
        typescript: '5.0.3',
        go: '1.16.2',
        rust: '1.68.2',
        r: '4.1.1',
        php: '8.2.3',
        ruby: '3.0.1',
        swift: '5.3.3',
        kotlin: '1.8.20'
    };
    return versions[language] || '';
}

// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------

let htmlEditor, cssEditor, jsEditor;
let isUpdatinghtml = false;
let isUpdatingcss = false;
let isUpdatingjs = false;
let htmlCssJsSampleCode = document.getElementById('html-css-js')
// htmlCssJsSampleCode.addEventListener('click', () => {
//     setupHtmlEditor();
//     setupCssEditor();
//     setupJsEditor();
// })

function setupHtmlEditor() {
    htmlEditor.setValue(sampleCode.html);
}
function setupCssEditor() {
    cssEditor.setValue(sampleCode.css);
}
function setupJsEditor() {
    jsEditor.setValue(sampleCode.js);
}

htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
    mode: 'htmlmixed',  // Mixed mode for HTML, CSS and JavaScript
    theme: 'dracula',   // Theme
    //lineNumbers: true,  // Show line numbers
    autoCloseTags: true,
    // {
    //     whenOpening: true,   // Auto-close only when opening a tag
    //     whenClosing: true,   // Auto-close when closing a tag
    //     indentTags: []       // Prevent extra indentation
    // },        
    autoCloseBrackets: true,
    matchTags: {bothTags: true},
    matchBrackets: true,
    indentUnit: 4,      // Indent by 4 spaces
    tabSize: 4,
    indentWithTabs: true,
    lineWrapping: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Enter": function(cm) {
            cm.execCommand("newlineAndIndent");
        }
    }
    
});
htmlEditor.setSize(null, "480px");
htmlEditor.on("change", updatePreview);

cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
    mode: "css",
    //lineNumbers: true,
    theme: "dracula",
    autoCloseBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
});
// cssEditor.on("change", updatePreview);
cssEditor.setSize(null, "480px");
cssEditor.on("change", updatePreview);


jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
    mode: "javascript",
    //lineNumbers: true,
    theme: "dracula",
    autoCloseBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
});
jsEditor.setSize(null, "185px")
jsEditor.on("change", updatePreview);


function updatePreview() {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>setTimeout(() => { ${jsEditor.getValue()} }, 0);<\/script>`;
    
    const iframe = document.getElementById("live-preview").contentWindow.document;
    iframe.open();
    iframe.write(html + css + js);
    iframe.close();
}

htmlEditor.on("change", () => {
    updatePreview();
    if (!isUpdatinghtml) {
        socket.emit("code-update-html", htmlEditor.getValue());
    }
});

socket.on("code-update-html", (contenttt) => {
    if (htmlEditor.getValue() !== contenttt) {
        isUpdatinghtml = true;
        htmlEditor.setValue(contenttt);
        setTimeout(() => { isUpdatinghtml = false; }, 50); 
    }
});
cssEditor.on("change", () => {
    updatePreview();
    if (!isUpdatingcss) {
        socket.emit("code-update-css", cssEditor.getValue());
    }
})
socket.on("code-update-css", (contentcss) => {
    if (cssEditor.getValue() !== contentcss) {
        isUpdatingcss = true;
        cssEditor.setValue(contentcss);
        setTimeout(() => { isUpdatingcss = false; }, 50); 
    }
});
jsEditor.on("change", () => {
    updatePreview();
    if (!isUpdatingjs) {
        socket.emit("code-update-js", jsEditor.getValue());
    }
})

socket.on("code-update-js", (contentjs) => {
    if (jsEditor.getValue() !== contentjs) {
        isUpdatingjs = true;
        jsEditor.setValue(contentjs);
        setTimeout(() => { isUpdatingjs = false; }, 50); 
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('html', htmlEditor.getValue());
    localStorage.setItem('css', cssEditor.getValue());
    localStorage.setItem('js', jsEditor.getValue());
});

window.addEventListener('load', () => {
    // setTimeout(() => {
    //     window.scrollTo(0, 0); // Force reset after rendering
    // }, 0);
    htmlEditor.setValue(localStorage.getItem('html') || '');
    cssEditor.setValue(localStorage.getItem('css') || '');
    jsEditor.setValue(localStorage.getItem('js') || '');
     
});


//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
// save to local one
async function saveCode() {
    try {
        // const editor = document.getElementById("editor");
        let code = editorInstance.getValue();
        const handle = await window.showSaveFilePicker({
            suggestedName: "code.txt",
            types: [
                {
                    description: "Text Files",
                    accept: { "text/plain": [".txt", ".java", ".py"] },
                },
            ],
        });

        const writable = await handle.createWritable();
        await writable.write(code);
        await writable.close();

        //clearing localstorage after saving
        localStorage.removeItem("savedCode");

        alert("File saved successfully and local storage cleared!");
    } catch (error) {
        console.error("Save cancelled or failed:", error);
    }
}


// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// Update language icons when selections change
document.getElementById('sourceLanguage').addEventListener('change', function() {
    updateLanguageIcon('sourceLanguageIcon-cc', this.value);
});

document.getElementById('targetLanguage').addEventListener('change', function() {
    updateLanguageIcon('targetLanguageIcon-cc', this.value);
});

function updateLanguageIcon(elementId, language) {
    const iconElement = document.querySelector(`#${elementId} .language-icon-cc`);

    iconElement.classList.remove('html-icon-cc', 'css-icon-cc', 'js-icon-cc');

    if (language === 'html') {
        iconElement.classList.add('html-icon-cc');
    } else if (language === 'css') {
        iconElement.classList.add('css-icon-cc');
    } else if (language === 'javascript') {
        iconElement.classList.add('js-icon-cc');
    }
}

// Initialize icons on page load
updateLanguageIcon('sourceLanguageIcon-cc', document.getElementById('sourceLanguage').value);
updateLanguageIcon('targetLanguageIcon-cc', document.getElementById('targetLanguage').value);
    
function convertCode() {
    const sourceLanguage = document.getElementById('sourceLanguage').value;
    const targetLanguage = document.getElementById('targetLanguage').value;
    const sourceCode = document.getElementById('sourceCode').value.trim();
    const targetCodeElement = document.getElementById('targetCode');
    const explanationElement = document.getElementById('conversionExplanation');
    const explanationTextElement = document.getElementById('explanationText');
    const messageElement = document.getElementById('message');

    messageElement.className = 'message hidden';
    
    if (!sourceCode) {
        showMessage('Please enter some code to convert.', 'error');
        return;
    }
    
    if (sourceLanguage === targetLanguage) {
        targetCodeElement.value = sourceCode;
        showMessage('Source and target languages are the same.', 'success');
        explanationElement.className = 'explanation hidden';
        return;
    }
    
    try {
        const { convertedCode, explanation } = performConversion(sourceLanguage, targetLanguage, sourceCode);

        targetCodeElement.value = convertedCode;
        explanationTextElement.textContent = explanation;
        explanationElement.className = 'explanation';

        showMessage('Code converted successfully!', 'success');
    } catch (error) {
        targetCodeElement.value = '';
        explanationElement.className = 'explanation hidden';
        showMessage('Error converting code: ' + error.message, 'error');
    }
}
  
function performConversion(sourceLanguage, targetLanguage, sourceCode) {

    let convertedCode = '';
    let explanation = '';
    
    if (sourceLanguage === 'html' && targetLanguage === 'javascript') {
      convertedCode = htmlToJavaScript(sourceCode);
      explanation = "Converted HTML to JavaScript DOM creation code. Each HTML element is created using document.createElement() and properties are set accordingly.";
    }
    // javaScript to TYYpeScript
    else if (sourceLanguage === 'javascript' && targetLanguage === 'typescript') {
      convertedCode = javascriptToTypeScript(sourceCode);
      explanation = "Converted JavaScript to TypeScript by adding type annotations where possible and updating the syntax to TypeScript standards.";
    }
    // css to JavaScript
    else if (sourceLanguage === 'css' && targetLanguage === 'javascript') {
      convertedCode = cssToJavaScript(sourceCode);
      explanation = "Converted CSS to JavaScript style objects. CSS properties are converted to camelCase format as required by JavaScript.";
    }
    // python to JavaScript
    else if (sourceLanguage === 'python' && targetLanguage === 'javascript') {
      convertedCode = pythonToJavaScript(sourceCode);
      explanation = "Converted Python to JavaScript. Functions, loops, and conditionals are transformed to their JavaScript equivalents.";
    }
    // javaScript to Python
    else if (sourceLanguage === 'javascript' && targetLanguage === 'python') {
      convertedCode = javascriptToPython(sourceCode);
      explanation = "Converted JavaScript to Python. Functions, loops, and conditionals are transformed to their Python equivalents.";
    }
    // HTML to CSS (basic skeleton)
    else if (sourceLanguage === 'html' && targetLanguage === 'css') {
      convertedCode = htmlToCss(sourceCode);
      explanation = "Generated CSS skeleton based on HTML elements, classes and IDs.";
    }
    else {
      convertedCode = `// Conversion from ${sourceLanguage} to ${targetLanguage}\n// This is a placeholder. Full conversion would require a more complex tool.\n\n`;
      convertedCode += `/* Original ${sourceLanguage} code:\n${sourceCode}\n*/\n\n`;

      if (targetLanguage === 'javascript') {
        convertedCode += '// JavaScript equivalent code would be something like:\n\nfunction convertedFunction() {\n  console.log("Converted code");\n  // Implementation would go here\n}\n';
      } else if (targetLanguage === 'python') {
        convertedCode += '# Python equivalent code would be something like:\n\ndef converted_function():\n    print("Converted code")\n    # Implementation would go here\n';
      } else if (targetLanguage === 'java') {
        convertedCode += '// Java equivalent code would be something like:\n\npublic class Converter {\n    public static void main(String[] args) {\n        System.out.println("Converted code");\n        // Implementation would go here\n    }\n}\n';
      } else if (targetLanguage === 'html') {
        convertedCode += '<!-- HTML equivalent structure would be something like: -->\n<div class="container">\n  <h1>Converted Structure</h1>\n  <p>Implementation would go here</p>\n</div>\n';
      } else if (targetLanguage === 'css') {
        convertedCode += '/* CSS equivalent styling would be something like: */\n.container {\n  display: flex;\n  flex-direction: column;\n}\n\nh1 {\n  color: #333;\n}\n';
      }
      
      explanation = `Complete conversion from ${sourceLanguage} to ${targetLanguage} would require a specialized translator. This is a simplified placeholder showing the general structure of the target language.`;
    }
    return { convertedCode, explanation };
}
  
function htmlToJavaScript(html) {
    html = html.trim();
    let js = '// Generated JavaScript DOM code\n';
    js += 'function createElements() {\n';
    
    const lines = html.split('\n');
    let indentLevel = 1;
    let elementCount = 0;
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('<') && !trimmedLine.startsWith('</')) {
            // open ka tag
            const match = trimmedLine.match(/<([a-zA-Z0-9]+)([^>]*)>/);
            if (match) {
                const tagName = match[1];
                const attributes = match[2];
              
                elementCount++;
                const elementVar = `element${elementCount}`;
              
                js += `${' '.repeat(indentLevel * 2)}const ${elementVar} = document.createElement('${tagName}');\n`;
              
                // extract 
                if (attributes) {
                    const classMatch = attributes.match(/class=["']([^"']*)["']/);
                    if (classMatch) {
                        js += `${' '.repeat(indentLevel * 2)}${elementVar}.className = '${classMatch[1]}';\n`;
                    }
                
                    const idMatch = attributes.match(/id=["']([^"']*)["']/);
                    if (idMatch) {
                        js += `${' '.repeat(indentLevel * 2)}${elementVar}.id = '${idMatch[1]}';\n`;
                    }
                
                    // id, and class attributes
                    const otherAttrs = attributes.match(/([a-zA-Z-]+)=["']([^"']*)["']/g);
                    if (otherAttrs) {
                        otherAttrs.forEach(attr => {
                          const [name, value] = attr.split('=');
                          if (name !== 'class' && name !== 'id') {
                              js += `${' '.repeat(indentLevel * 2)}${elementVar}.setAttribute('${name}', ${value});\n`;
                          }
                        });
                    }
              }

              if (elementCount > 1) {
                js += `${' '.repeat(indentLevel * 2)}element${elementCount - 1}.appendChild(${elementVar});\n`;
              }

              indentLevel++;
            }
        } else if (trimmedLine.startsWith('</')) {
            // closing tag
            indentLevel = Math.max(1, indentLevel - 1);
        } else {
            // text content
            js += `${' '.repeat(indentLevel * 2)}element${elementCount}.textContent = '${trimmedLine.replace(/'/g, "\\'")}';\n`;
        }
    }
  
    js += '  return element1;\n';
    js += '}\n\n';
    js += '// Append to the document\n';
    js += 'document.body.appendChild(createElements());';
    
    return js;
}

function htmlToCss(html) {
    let css = '/* CSS skeleton generated from HTML */\n\n';
    const elements = new Set();
    const classes = new Set();
    const ids = new Set();
    
    const elementRegex = /<([a-zA-Z0-9]+)/g;
    const classRegex = /class=["']([^"']*)["']/g;
    const idRegex = /id=["']([^"']*)["']/g;
    
    let match;
    
    while (match = elementRegex.exec(html)) {
        elements.add(match[1]);
    }
    
    while (match = classRegex.exec(html)) {
        match[1].split(/\s+/).forEach(cls => {
            if (cls) classes.add(cls);
        });
    }
    
    while (match = idRegex.exec(html)) {
        ids.add(match[1]);
    }
    
    // CSS for elements
    elements.forEach(element => {
        css += `${element} {\n  /* Element styles */\n}\n\n`;
    });
    
    // CSS for classes
    classes.forEach(cls => {
        css += `.${cls} {\n  /* Class styles */\n}\n\n`;
    });
    
    // CSS for IDs
    ids.forEach(id => {
        css += `#${id} {\n  /* ID styles */\n}\n\n`;
    });
    
    return css;
}

function copyText(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy");
    
    showMessage('Copied to clipboard!', 'success');
}

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    
    setTimeout(() => {
      messageElement.className = 'message hidden';
    }, 3000);
}



// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
// ===================================== Drag & Drop and Directory Stucture ===========================================
const hasFileSystemAccess = 'showOpenFilePicker' in window;
const hasFolderSystemAccess = 'showDirectoryPicker' in window;
const warningBanner = document.getElementById('compatibility-warning');

if (!hasFileSystemAccess || !hasFolderSystemAccess) {
    //warningBanner.style.display = 'block';
}

const dropArea = document.getElementById('drop-area');
const filesList = document.getElementById('files-list');
const noFilesText = document.getElementById('no-files');
// const codeEditor = document.getElementById('code-editor');
const saveBtn = document.getElementById('save-btn-new');
const clearBtnFile = document.getElementById('clear-btn');
const fileInfo = document.getElementById('file-info');
const selectFolderBtn = document.getElementById('select-folder-btn');
const selectFilesBtn = document.getElementById('select-files-btn');
const createFileBtn = document.getElementById('create-file-btn');
const newFileModal = document.getElementById('new-file-modal');
const newFileName = document.getElementById('new-file-name');
const folderSelect = document.getElementById('folder-select');
const cancelCreateBtn = document.getElementById('cancel-create-btn');
const confirmCreateBtn = document.getElementById('confirm-create-btn');



let directoryHandles = new Map();
let loadedFiles = [];
let folderStructure = {}; // keep track of folder structure
let activeFile = null;
let openFolders = new Set(); //kkeep track of which folders are open
        
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);

selectFilesBtn.addEventListener('click', selectFiles);
selectFolderBtn.addEventListener('click', selectFolder);
clearBtnFile.addEventListener('click', clearAllFiles);
saveBtn.addEventListener('click', saveChanges);
createFileBtn.addEventListener('click', showCreateFileModal);
cancelCreateBtn.addEventListener('click', hideCreateFileModal);
confirmCreateBtn.addEventListener('click', createNewFile);

async function selectFiles() {
    if (hasFileSystemAccess) {
        try {
            // File System Access API
            const fileHandles = await window.showOpenFilePicker({
                multiple: true,
                types: [
                    {
                        description: 'Text Files',
                        accept: {
                            'text/*': ['.txt', '.js', '.html', '.css', '.json', '.md']
                        }
                    }
                ]
            });
            
            for (const fileHandle of fileHandles) {
                const file = await fileHandle.getFile();
                
                const existingFileIndex = loadedFiles.findIndex(f => f.name === file.name);
                
                if (existingFileIndex >= 0) {
                    loadedFiles[existingFileIndex].file = file;
                    loadedFiles[existingFileIndex].handle = fileHandle;
                    loadedFiles[existingFileIndex].content = await file.text();
                } else {
                    loadedFiles.push({
                        name: file.name,
                        type: file.type || getFileTypeFromExtension(file.name),
                        size: file.size,
                        content: await file.text(),
                        file: file,
                        handle: fileHandle,
                        path: file.name 
                    });
                }
            }
            
            updateFilesList();
        } catch (err) {
            console.error('Error selecting files:', err);
        }
    } else {

        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => {
            handleFiles(e.target.files);
        };
        input.click();
    }
}

async function selectFolder() {
    if (hasFolderSystemAccess) {
        try {
            const directoryHandle = await window.showDirectoryPicker();
            
            directoryHandles.set(directoryHandle.name, directoryHandle);
            
            await processDirectoryHandle(directoryHandle, '');
            
            //root folder by default
            openFolders.add(directoryHandle.name);
            
            updateFilesList();
        } catch (err) {
            console.error('Error selecting folder:', err);
        }
    } else {
        alert('Folder selection is only supported in Chrome, Edge, and other Chromium-based browsers.');
    }
}
        
       

async function processDirectoryHandle(directoryHandle, path) {
    const folderPath = path ? path : directoryHandle.name;
    folderStructure[folderPath] = { name: directoryHandle.name, files: [], folders: [] };

    directoryHandles.set(folderPath, directoryHandle);
    
    for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file') {
            try {
                const file = await entry.getFile();
                const newPath = folderPath ? `${folderPath}/${file.name}` : file.name;
                
                const existingFileIndex = loadedFiles.findIndex(f => f.path === newPath);
                
                if (existingFileIndex >= 0) {
                    loadedFiles[existingFileIndex].file = file;
                    loadedFiles[existingFileIndex].handle = entry;
                    loadedFiles[existingFileIndex].content = await file.text();
                } else {
                    const fileObj = {
                        name: file.name,
                        type: file.type || getFileTypeFromExtension(file.name),
                        size: file.size,
                        content: await file.text(),
                        file: file,
                        handle: entry,
                        path: newPath
                    };
                    
                    loadedFiles.push(fileObj);
                    folderStructure[folderPath].files.push(fileObj);
                }
            } catch (e) {
                console.error('Error processing file:', e);
            }
        } else if (entry.kind === 'directory') {
            const newPath = folderPath ? `${folderPath}/${entry.name}` : entry.name;
            folderStructure[folderPath].folders.push(newPath);
            await processDirectoryHandle(entry, newPath);
        }
    }
}
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const items = dt.items;
    
    if (items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
                const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
                
                if (entry) {
                    if (entry.isFile) {
                        entry.file(file => {
                            handleFiles([file]);
                        });
                    } else if (entry.isDirectory) {
                        // Add the folder to open folders list
                        openFolders.add(entry.name);
                        processEntry(entry, '');
                    }
                } else {
                    // Fallback
                    handleFiles([item.getAsFile()]);
                }
            }
        }
    } else {

        handleFiles(dt.files);
    }
}

function processEntry(entry, path) {
    const reader = entry.createReader();
    
    reader.readEntries(entries => {
        entries.forEach(entry => {
            const newPath = path ? `${path}/${entry.name}` : entry.name;
            
            if (entry.isFile) {
                entry.file(file => {
                    readFileContent(file).then(content => {
                        const fileObj = {
                            name: file.name,
                            type: file.type || getFileTypeFromExtension(file.name),
                            size: file.size,
                            content: content,
                            file: file,
                            path: newPath
                        };
                        
                        loadedFiles.push(fileObj);
                        updateFilesList();
                    });
                });
            } else if (entry.isDirectory) {
                // Create folder in our structure
                if (!folderStructure[newPath]) {
                    folderStructure[newPath] = { name: entry.name, files: [], folders: [] };
                    
                    // If we have a parent folder, add this as a subfolder
                    if (path) {
                        if (!folderStructure[path]) {
                            folderStructure[path] = { name: path.split('/').pop(), files: [], folders: [] };
                        }
                        folderStructure[path].folders.push(newPath);
                    }
                }
                
                processEntry(entry, newPath);
            }
        });
        
        if (entries.length >= 100) {
            processEntry(entry, path);
        } else {
            updateFilesList();
        }
    });
}

async function handleFiles(fileList) {
    if (fileList.length === 0) return;
    
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        
        const existingFileIndex = loadedFiles.findIndex(f => f.name === file.name);
        
        if (existingFileIndex >= 0) {
            const content = await readFileContent(file);
            loadedFiles[existingFileIndex].file = file;
            loadedFiles[existingFileIndex].content = content;
            loadedFiles[existingFileIndex].size = file.size;
        } else {
            loadFile(file);
        }
    }
    
    // Update UI
    updateFilesList();
}

async function loadFile(file) {
    const content = await readFileContent(file);
    
    const fileObj = {
        name: file.name,
        type: file.type || getFileTypeFromExtension(file.name),
        size: file.size,
        content: content,
        file: file,
        path: file.name 
    };
    
    loadedFiles.push(fileObj);
    updateFilesList();
}

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        
        reader.onerror = function(e) {
            reject(new Error('Error reading file'));
        };
        
        reader.readAsText(file);
    });
}

function getFileTypeFromExtension(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const typeMap = {
        'js': 'application/javascript',
        'html': 'text/html',
        'css': 'text/css',
        'txt': 'text/plain',
        'json': 'application/json',
        'md': 'text/markdown'
    };
    
    return typeMap[ext] || 'text/plain';
}

function updateFilesList() {
    while (filesList.firstChild) {
        filesList.removeChild(filesList.firstChild);
    }
    
    if (loadedFiles.length === 0) {
        filesList.appendChild(noFilesText);
        return;
    }
    
    const hasFolders = Object.keys(folderStructure).length > 0;
    
    if (hasFolders) {
        createTreeView();
    } else {
        createFlatFilesList();
    }
}

function createTreeView() {
    // First, find root folders (those that don't have a parent)
    const rootFolders = [];
    const processedPaths = new Set();
    
    // Add all folders that are not clearly inside another folder
    for (const path in folderStructure) {
        const pathParts = path.split('/');
        if (pathParts.length === 1 && path !== '') {
            rootFolders.push(path);
            processedPaths.add(path);
        }
    }
    
    // Also handle files that aren't in any folder
    const rootFiles = loadedFiles.filter(file => !file.path.includes('/'));
    
    // Create the tree, starting with root elements
    for (const rootFolder of rootFolders) {
        createFolderElement(rootFolder, filesList);
    }
    
    // Add root files
    for (const file of rootFiles) {
        createFileElement(file, filesList);
    }
}

function createFolderElement(folderPath, parentElement) {
    const folder = folderStructure[folderPath];
    if (!folder) return;
    
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder-container';
    
    const folderItem = document.createElement('div');
    folderItem.className = 'folder-item';
    folderItem.innerHTML = `
        <span class="file-icon">📁</span>
        <span class="file-name">${folder.name}</span>
    `;
    
    const folderContent = document.createElement('div');
    folderContent.className = 'folder-content';
    
    const isOpen = openFolders.has(folderPath);
    folderContent.style.display = isOpen ? 'block' : 'none';
    
    folderItem.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        if (folderContent.style.display === 'none') {
            folderContent.style.display = 'block';
            openFolders.add(folderPath);
        } else {
            folderContent.style.display = 'none';
            openFolders.delete(folderPath);
        }
    });
    
    folderDiv.appendChild(folderItem);
    folderDiv.appendChild(folderContent);
    
    // Add subfolders
    for (const subfolderPath of folder.folders) {
        createFolderElement(subfolderPath, folderContent);
    }
    
    // Add files
    const filesInFolder = loadedFiles.filter(file => {
        const filePath = file.path;
        const folderPrefix = folderPath + '/';
        return filePath.startsWith(folderPrefix) && filePath.indexOf('/', folderPrefix.length) === -1;
    });
    
    for (const file of filesInFolder) {
        createFileElement(file, folderContent);
    }
    
    parentElement.appendChild(folderDiv);
}

function createFileElement(file, parentElement) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    if (activeFile && activeFile.path === file.path) {
        fileItem.classList.add('active');
    }
    
    fileItem.innerHTML = `
        <span class="file-icon">📄</span>
        <span class="file-name">${file.name}</span>
    `;
    
    fileItem.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        setActiveFile(file);
    });
    
    parentElement.appendChild(fileItem);
}

function createFlatFilesList() {
    loadedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        if (activeFile && activeFile.path === file.path) {
            fileItem.classList.add('active');
        }
        
        fileItem.innerHTML = `
            <span class="file-icon">📄</span>
            <span class="file-name">${file.name}</span>
        `;
        
        fileItem.addEventListener('click', () => {
            setActiveFile(file);
        });
        
        filesList.appendChild(fileItem);
    });
}

// function setActiveFile(file) {
//     activeFile = file;
    
//     if (file.path.includes('/')) {
//         const pathParts = file.path.split('/');
//         let currentPath = '';
        
//         for (let i = 0; i < pathParts.length - 1; i++) {
//             if (i === 0) {
//                 currentPath = pathParts[0];
//             } else {
//                 currentPath += '/' + pathParts[i];
//             }
//             openFolders.add(currentPath);
//         }
//     }
    
//     editorInstance.setValue(file.content);
//     //codeEditor.disabled = false;
//     saveBtn.disabled = false;
//     fileInfo.textContent = `${file.path} (${formatFileSize(file.size)})`;
    
//     updateFilesList();
// }

function setActiveFile(file) {
    activeFile = file;
    
    if (file.path.includes('/')) {
        const pathParts = file.path.split('/');
        let currentPath = '';
        
        for (let i = 0; i < pathParts.length - 1; i++) {
            if (i === 0) {
                currentPath = pathParts[0];
            } else {
                currentPath += '/' + pathParts[i];
            }
            openFolders.add(currentPath);
        }
    }
    
    // 3no alag alag editor pe emit hoge
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    switch (fileExtension) {
        case 'html':
            htmlEditor.setValue(file.content);
            break;
        case 'css':
            cssEditor.setValue(file.content);
            break;
        case 'js':
            jsEditor.setValue(file.content);
            break;
        default:
            editorInstance.setValue(file.content);
    }
    
    saveBtn.disabled = false;
    fileInfo.textContent = `${file.path} (${formatFileSize(file.size)})`;
    
    updateFilesList();
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// async function saveChanges() {
//     if (!activeFile) return;
    
//     activeFile.content = editorInstance.getValue();
//     activeFile.size = new Blob([editorInstance.getValue()]).size;
    
//     if (hasFileSystemAccess && activeFile.handle) {
//         try {
//             const writable = await activeFile.handle.createWritable();
//             await writable.write(editorInstance.getValue());
//             await writable.close();
//             showSaveConfirmation();
//         } catch (err) {
//             console.error('Error writing to file:', err);
//             alert('Failed to save to the file: ' + err.message);
//             fallbackSave();
//         }
//     } else if (hasFileSystemAccess && activeFile.path.includes('/')) {
//         // Try to get a handle for this file if it's in a folder
//         const folderPath = activeFile.path.substring(0, activeFile.path.lastIndexOf('/'));
//         let folderHandle = null;
        
//         // Similar to the code in createNewFile, traverse to find the folder handle
//         // [Code omitted for brevity - use the same folder handle finding logic as above]
        
//         if (folderHandle) {
//             try {
//                 const fileHandle = await folderHandle.getFileHandle(activeFile.name, { create: true });
//                 activeFile.handle = fileHandle;
                
//                 const writable = await fileHandle.createWritable();
//                 await writable.write(editorInstance.getValue());
//                 await writable.close();
                
//                 showSaveConfirmation();
//                 return;
//             } catch (e) {
//                 console.error('Error getting/creating file handle:', e);
//             }
//         }
//         fallbackSave();
//     } else {
//         fallbackSave();
//     }
// }

async function saveChanges() {
    if (!activeFile) return;
    
    // .extension nakalna ppapdega
    const fileExtension = activeFile.name.split('.').pop().toLowerCase();
    let content;
    
    switch (fileExtension) {
        case 'html':
            content = htmlEditor.getValue();
            break;
        case 'css':
            content = cssEditor.getValue();
            break;
        case 'js':
            content = jsEditor.getValue();
            break;
        default:
            content = editorInstance.getValue();
    }
    
    activeFile.content = content;
    activeFile.size = new Blob([content]).size;
    
    if (hasFileSystemAccess && activeFile.handle) {
        try {
            const writable = await activeFile.handle.createWritable();
            await writable.write(content);
            await writable.close();
            showSaveConfirmation();
        } catch (err) {
            console.error('Error writing to file:', err);
            alert('Failed to save to the file: ' + err.message);
            fallbackSave();
        }
    } else if (hasFileSystemAccess && activeFile.path.includes('/')) {
       const folderPath = activeFile.path.substring(0, activeFile.path.lastIndexOf('/'));
       let folderHandle = null;
       
       // Similar to the code in createNewFile, traverse to find the folder handle
       // [Code omitted for brevity - use the same folder handle finding logic as above]
       
       if (folderHandle) {
           try {
               const fileHandle = await folderHandle.getFileHandle(activeFile.name, { create: true });
               activeFile.handle = fileHandle;
               
               const writable = await fileHandle.createWritable();
               await writable.write(editorInstance.getValue());
               await writable.close();
               
               showSaveConfirmation();
               return;
           } catch (e) {
               console.error('Error getting/creating file handle:', e);
           }
       }
       fallbackSave();
    } else {
        fallbackSave();
    }
}

// function fallbackSave() {
//     const blob = new Blob([activeFile.content], { type: activeFile.type });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = activeFile.name;
//     document.body.appendChild(a);
//     a.click();
    
//     document.body.removeChild(a);
//     URL.revoObjectURL(a.href);
//     showSaveConfirmation();
// }

function fallbackSave() {
    // sameeeeeee
    const fileExtension = activeFile.name.split('.').pop().toLowerCase();
    let content;
    
    switch (fileExtension) {
        case 'html':
            content = htmlEditor.getValue();
            break;
        case 'css':
            content = cssEditor.getValue();
            break;
        case 'js':
            content = jsEditor.getValue();
            break;
        default:
            content = editorInstance.getValue();
    }
    
    const blob = new Blob([content], { type: activeFile.type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revoObjectURL(a.href);
    showSaveConfirmation();
}

function showSaveConfirmation() {
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    setTimeout(() => {
        saveBtn.textContent = originalText;
    }, 2000);
}

function clearAllFiles() {
    if (confirm('Are you sure you want to clear all files?')) {
        loadedFiles = [];
        folderStructure = {};
        openFolders = new Set();
        activeFile = null;
        editorInstance.setValue('');
        //codeEditor.disabled = true;
        saveBtn.disabled = true;
        fileInfo.textContent = 'No file selected';
        updateFilesList();
    }
}

function showCreateFileModal() {

    populateFolderDropdown();

    newFileModal.style.display = 'flex';
    newFileName.value = '';
    

    if (activeFile && activeFile.path.includes('/')) {
        const folderPath = activeFile.path.substring(0, activeFile.path.lastIndexOf('/'));
        if (Array.from(folderSelect.options).some(opt => opt.value === folderPath)) {
            folderSelect.value = folderPath;
        }
    }
}
    
function hideCreateFileModal() {
    newFileModal.style.display = 'none';
}

function showCreateFileModal() {
    newFileModal.style.display = 'flex';
    newFileName.value = '';
    
    let folderPath = '';
    
    if (activeFile && activeFile.path.includes('/')) {
        folderPath = activeFile.path.substring(0, activeFile.path.lastIndexOf('/'));
    }
    
    currentFolder.value = folderPath || 'Root Directory';
}

function hideCreateFileModal() {
    newFileModal.style.display = 'none';
}

async function createNewFile() {
    const fileName = newFileName.value.trim();
    
    if (!fileName) {
        alert('Please enter a file name');
        return;
    }

    if (!/^[a-zA-Z0-9_\-\.]+$/.test(fileName)) {
        alert('File name can only contain letters, numbers, underscores, hyphens, and periods');
        return;
    }
    
    const selectedFolder = folderSelect.value;
    let folderPath = selectedFolder === 'root' ? '' : selectedFolder;
    
    const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
    
    if (loadedFiles.some(file => file.path === filePath)) {
        alert('A file with this name already exists');
        return;
    }
    
    let fileHandle = null;
    let dirHandle = null;
    
    if (selectedFolder !== 'root') {
        dirHandle = directoryHandles.get(selectedFolder);
    } else if (directoryHandles.size > 0) {
    
        for (const [path, handle] of directoryHandles.entries()) {
            if (!path.includes('/')) {
                dirHandle = handle;
                break;
            }
        }
    }

    if (dirHandle) {
        try {
            fileHandle = await dirHandle.getFileHandle(fileName, { create: true });

            const writable = await fileHandle.createWritable();
            await writable.write('');
            await writable.close();

            console.log('Successfully created file:', fileName);
        } catch (e) {
            console.error('Error creating file:', e);
            alert(`Could not create file in selected location: ${e.message}`);
            return;
        }
    } else {
        console.warn('No directory handle available for the selected folder');
    }

    // new file objectttttttttttttttt
    const newFile = {
        name: fileName,
        type: getFileTypeFromExtension(fileName),
        size: 0,
        content: '',
        path: filePath,
        handle: fileHandle
    };

    loadedFiles.push(newFile);

    if (folderPath && folderStructure[folderPath]) {
        folderStructure[folderPath].files.push(newFile);
    }

    setActiveFile(newFile);

    updateFilesList();
    hideCreateFileModal();
}
function showCreateFileModal() {
    populateFolderDropdown();
    
    newFileModal.style.display = 'flex';
    newFileName.value = '';

    if (activeFile && activeFile.path.includes('/')) {
        const folderPath = activeFile.path.substring(0, activeFile.path.lastIndexOf('/'));
        if (Array.from(folderSelect.options).some(opt => opt.value === folderPath)) {
            folderSelect.value = folderPath;
        }
    }
}

// to populate folder dropdown
function populateFolderDropdown() {
    while (folderSelect.options.length > 1) {
        folderSelect.remove(1);
    }
    
    for (const path in folderStructure) {
        if (path !== '' && directoryHandles.has(path)) {
            const option = document.createElement('option');
            option.value = path;
            option.textContent = path;
            folderSelect.appendChild(option);
        }
    }
}

// ------------------------ Directory Structure for Dev Mode -------------------------
// ------------------------ Directory Structure for Dev Mode -------------------------
// ------------------------ Directory Structure for Dev Mode -------------------------
// ------------------------ Directory Structure for Dev Mode -------------------------
// ------------------------ Directory Structure for Dev Mode -------------------------
// ------------------------ Directory Structure for Dev Mode -------------------------
const warningBannerDev = document.getElementById('compatibility-warning-devMode');
const dropAreaDev = document.getElementById('drop-area-devMode');
const filesListDev = document.getElementById('files-list-devMode');
const noFilesTextDev = document.getElementById('no-files-devMode');
const saveBtnDev = document.getElementById('save-btn-new-devMode');
const clearBtnDev = document.getElementById('clear-btn-devMode');
const fileInfoDev = document.getElementById('file-info-devMode');
const selectFolderBtnDev = document.getElementById('select-folder-btn-devMode');
const selectFilesBtnDev = document.getElementById('select-files-btn-devMode');
const createFileBtnDev = document.getElementById('create-file-btn-devMode');
const newFileModalDev = document.getElementById('new-file-modal-devMode');
const newFileNameDev = document.getElementById('new-file-name-devMode');
const folderSelectDev = document.getElementById('folder-select-devMode');
const cancelCreateBtnDev = document.getElementById('cancel-create-btn-devMode');
const confirmCreateBtnDev = document.getElementById('confirm-create-btn-devMode');

selectFilesBtnDev.addEventListener('click', selectFilesDev);
selectFolderBtnDev.addEventListener('click', selectFolderDev);
clearBtnDev.addEventListener('click', clearAllFilesDev);
saveBtnDev.addEventListener('click', saveChangesDev);
createFileBtnDev.addEventListener('click', showCreateFileModalDev);
cancelCreateBtnDev.addEventListener('click', hideCreateFileModalDev);
confirmCreateBtnDev.addEventListener('click', createNewFileDev);

// Dev Mode Variables
let directoryHandlesDev = new Map();
let loadedFilesDev = [];
let folderStructureDev = {};
let activeFileDev = null;
let openFoldersDev = new Set();

// Dev Mode Event Listeners for Drag & Drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropAreaDev.addEventListener(eventName, preventDefaultsDev, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropAreaDev.addEventListener(eventName, highlightDev, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropAreaDev.addEventListener(eventName, unhighlightDev, false);
});

dropAreaDev.addEventListener('drop', handleDropDev, false);

// Dev Mode Helper Functions
function preventDefaultsDev(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlightDev() {
    dropAreaDev.classList.add('highlight');
}

function unhighlightDev() {
    dropAreaDev.classList.remove('highlight');
}

// Dev Mode File Operations
async function selectFilesDev() {
    if (hasFileSystemAccess) {
        try {
            const fileHandles = await window.showOpenFilePicker({
                multiple: true,
                types: [{
                    description: 'Text Files',
                    accept: {
                        'text/*': ['.txt', '.js', '.html', '.css', '.json', '.md']
                    }
                }]
            });
            
            for (const fileHandle of fileHandles) {
                const file = await fileHandle.getFile();
                await processFileDev(file, fileHandle);
            }
            
            updateFilesListDev();
        } catch (err) {
            console.error('Error selecting files:', err);
        }
    } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => handleFilesDev(e.target.files);
        input.click();
    }
}

async function selectFolderDev() {
    if (hasFolderSystemAccess) {
        try {
            const directoryHandle = await window.showDirectoryPicker();
            directoryHandlesDev.set(directoryHandle.name, directoryHandle);
            await processDirectoryHandleDev(directoryHandle, '');
            openFoldersDev.add(directoryHandle.name);
            updateFilesListDev();
        } catch (err) {
            console.error('Error selecting folder:', err);
        }
    } else {
        alert('Folder selection is only supported in Chrome, Edge, and other Chromium-based browsers.');
    }
}

async function processDirectoryHandleDev(directoryHandle, path) {
    const folderPath = path ? path : directoryHandle.name;
    folderStructureDev[folderPath] = { name: directoryHandle.name, files: [], folders: [] };

    directoryHandlesDev.set(folderPath, directoryHandle);
    
    for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file') {
            try {
                const file = await entry.getFile();
                const newPath = folderPath ? `${folderPath}/${file.name}` : file.name;
                await processFileDev(file, entry, newPath, folderPath);
            } catch (e) {
                console.error('Error processing file:', e);
            }
        } else if (entry.kind === 'directory') {
            const newPath = folderPath ? `${folderPath}/${entry.name}` : entry.name;
            folderStructureDev[folderPath].folders.push(newPath);
            await processDirectoryHandleDev(entry, newPath);
        }
    }
}

async function processFileDev(file, handle, path = file.name, folderPath = '') {
    const existingIndex = loadedFilesDev.findIndex(f => f.path === path);
    const fileObj = {
        name: file.name,
        type: file.type || getFileTypeFromExtension(file.name),
        size: file.size,
        content: await file.text(),
        file: file,
        handle: handle,
        path: path
    };
    
    if (existingIndex >= 0) {
        loadedFilesDev[existingIndex] = fileObj;
    } else {
        loadedFilesDev.push(fileObj);
        if (folderPath && folderStructureDev[folderPath]) {
            folderStructureDev[folderPath].files.push(fileObj);
        }
    }
}

function handleDropDev(e) {
    const dt = e.dataTransfer;
    const items = dt.items;
    
    if (items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
                const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
                if (entry) {
                    if (entry.isFile) {
                        entry.file(file => handleFilesDev([file]));
                    } else if (entry.isDirectory) {
                        openFoldersDev.add(entry.name);
                        processEntryDev(entry, '');
                    }
                } else {
                    handleFilesDev([item.getAsFile()]);
                }
            }
        }
    } else {
        handleFilesDev(dt.files);
    }
}

async function handleFilesDev(fileList) {
    if (fileList.length === 0) return;
    
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const existingIndex = loadedFilesDev.findIndex(f => f.name === file.name);
        
        if (existingIndex >= 0) {
            loadedFilesDev[existingIndex].content = await readFileContentDev(file);
            loadedFilesDev[existingIndex].size = file.size;
        } else {
            await loadFileDev(file);
        }
    }
    
    updateFilesListDev();
}

async function loadFileDev(file) {
    const content = await readFileContentDev(file);
    loadedFilesDev.push({
        name: file.name,
        type: file.type || getFileTypeFromExtension(file.name),
        size: file.size,
        content: content,
        file: file,
        path: file.name
    });
}

function readFileContentDev(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = e => reject(new Error('Error reading file'));
        reader.readAsText(file);
    });
}

// Dev Mode UI Updates
function updateFilesListDev() {
    filesListDev.innerHTML = '';
    
    if (loadedFilesDev.length === 0) {
        filesListDev.appendChild(noFilesTextDev);
        return;
    }
    
    Object.keys(folderStructureDev).length > 0 
        ? createTreeViewDev() 
        : createFlatFilesListDev();
}

function createTreeViewDev() {
    const rootFolders = [];
    for (const path in folderStructureDev) {
        if (path.split('/').length === 1 && path !== '') {
            rootFolders.push(path);
        }
    }
    
    const rootFiles = loadedFilesDev.filter(file => !file.path.includes('/'));
    
    rootFolders.forEach(folder => createFolderElementDev(folder, filesListDev));
    rootFiles.forEach(file => createFileElementDev(file, filesListDev));
}

function createFolderElementDev(folderPath, parentElement) {
    const folder = folderStructureDev[folderPath];
    if (!folder) return;
    
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder-container';
    
    const folderItem = document.createElement('div');
    folderItem.className = 'folder-item';
    folderItem.innerHTML = `
        <span class="file-icon">📁</span>
        <span class="file-name">${folder.name}</span>
    `;
    
    const folderContent = document.createElement('div');
    folderContent.className = 'folder-content';
    folderContent.style.display = openFoldersDev.has(folderPath) ? 'block' : 'none';
    
    folderItem.addEventListener('click', (e) => {
        e.stopPropagation();
        folderContent.style.display = folderContent.style.display === 'none' ? 'block' : 'none';
        folderContent.style.display === 'block' 
            ? openFoldersDev.add(folderPath) 
            : openFoldersDev.delete(folderPath);
    });
    
    folder.folders.forEach(subfolder => createFolderElementDev(subfolder, folderContent));
    
    loadedFilesDev
        .filter(file => file.path.startsWith(`${folderPath}/`) && 
                       file.path.indexOf('/', folderPath.length + 1) === -1)
        .forEach(file => createFileElementDev(file, folderContent));
    
    folderDiv.appendChild(folderItem);
    folderDiv.appendChild(folderContent);
    parentElement.appendChild(folderDiv);
}

function createFileElementDev(file, parentElement) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item' + (activeFileDev?.path === file.path ? ' active' : '');
    fileItem.innerHTML = `
        <span class="file-icon">📄</span>
        <span class="file-name">${file.name}</span>
    `;
    
    fileItem.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveFileDev(file);
    });
    
    parentElement.appendChild(fileItem);
}

function createFlatFilesListDev() {
    loadedFilesDev.forEach(file => {
        createFileElementDev(file, filesListDev);
    });
}

function setActiveFileDev(file) {
    activeFileDev = file;
    
    if (file.path.includes('/')) {
        const pathParts = file.path.split('/');
        let currentPath = '';
        for (let i = 0; i < pathParts.length - 1; i++) {
            currentPath = i === 0 ? pathParts[0] : `${currentPath}/${pathParts[i]}`;
            openFoldersDev.add(currentPath);
        }
    }
    
    // Update editor content based on file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    switch (fileExtension) {
        case 'html': htmlEditor.setValue(file.content); break;
        case 'css': cssEditor.setValue(file.content); break;
        case 'js': jsEditor.setValue(file.content); break;
        default: editorInstance.setValue(file.content);
    }
    
    saveBtnDev.disabled = false;
    fileInfoDev.textContent = `${file.path} (${formatFileSizeDev(file.size)})`;
    updateFilesListDev();
}

function formatFileSizeDev(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Dev Mode File Management
async function saveChangesDev() {
    if (!activeFileDev) return;
    
    const fileExtension = activeFileDev.name.split('.').pop().toLowerCase();
    let content;
    switch (fileExtension) {
        case 'html': content = htmlEditor.getValue(); break;
        case 'css': content = cssEditor.getValue(); break;
        case 'js': content = jsEditor.getValue(); break;
        default: content = editorInstance.getValue();
    }
    
    activeFileDev.content = content;
    activeFileDev.size = new Blob([content]).size;
    
    if (hasFileSystemAccess && activeFileDev.handle) {
        try {
            const writable = await activeFileDev.handle.createWritable();
            await writable.write(content);
            await writable.close();
            showSaveConfirmationDev();
        } catch (err) {
            console.error('Error writing to file:', err);
            alert('Failed to save to the file: ' + err.message);
            fallbackSaveDev();
        }
    } else {
        fallbackSaveDev();
    }
}

function fallbackSaveDev() {
    const fileExtension = activeFileDev.name.split('.').pop().toLowerCase();
    let content;
    switch (fileExtension) {
        case 'html': content = htmlEditor.getValue(); break;
        case 'css': content = cssEditor.getValue(); break;
        case 'js': content = jsEditor.getValue(); break;
        default: content = editorInstance.getValue();
    }
    
    const blob = new Blob([content], { type: activeFileDev.type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = activeFileDev.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    showSaveConfirmationDev();
}

function showSaveConfirmationDev() {
    const originalText = saveBtnDev.textContent;
    saveBtnDev.textContent = 'Saved!';
    setTimeout(() => saveBtnDev.textContent = originalText, 2000);
}

function clearAllFilesDev() {
    if (confirm('Are you sure you want to clear all files?')) {
        loadedFilesDev = [];
        folderStructureDev = {};
        openFoldersDev = new Set();
        activeFileDev = null;
        editorInstance.setValue('');
        saveBtnDev.disabled = true;
        fileInfoDev.textContent = 'No file selected';
        updateFilesListDev();
    }
}

// Dev Mode File Creation
function showCreateFileModalDev() {
    populateFolderDropdownDev();
    newFileModalDev.style.display = 'flex';
    newFileNameDev.value = '';
    
    if (activeFileDev?.path.includes('/')) {
        const folderPath = activeFileDev.path.substring(0, activeFileDev.path.lastIndexOf('/'));
        if (Array.from(folderSelectDev.options).some(opt => opt.value === folderPath)) {
            folderSelectDev.value = folderPath;
        }
    }
}

function hideCreateFileModalDev() {
    newFileModalDev.style.display = 'none';
}

function populateFolderDropdownDev() {
    while (folderSelectDev.options.length > 1) {
        folderSelectDev.remove(1);
    }
    
    for (const path in folderStructureDev) {
        if (path !== '' && directoryHandlesDev.has(path)) {
            const option = document.createElement('option');
            option.value = path;
            option.textContent = path;
            folderSelectDev.appendChild(option);
        }
    }
}

async function createNewFileDev() {
    const fileName = newFileNameDev.value.trim();
    if (!fileName) return alert('Please enter a file name');
    if (!/^[\w\-\.]+$/.test(fileName)) return alert('Invalid file name');
    
    const selectedFolder = folderSelectDev.value;
    const folderPath = selectedFolder === 'root' ? '' : selectedFolder;
    const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
    
    if (loadedFilesDev.some(file => file.path === filePath)) {
        return alert('A file with this name already exists');
    }
    
    let fileHandle = null;
    if (selectedFolder !== 'root' && directoryHandlesDev.has(selectedFolder)) {
        try {
            fileHandle = await directoryHandlesDev.get(selectedFolder).getFileHandle(fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write('');
            await writable.close();
        } catch (e) {
            console.error('Error creating file:', e);
        }
    }
    
    const newFile = {
        name: fileName,
        type: getFileTypeFromExtension(fileName),
        size: 0,
        content: '',
        path: filePath,
        handle: fileHandle
    };
    
    loadedFilesDev.push(newFile);
    if (folderPath && folderStructureDev[folderPath]) {
        folderStructureDev[folderPath].files.push(newFile);
    }
    
    setActiveFileDev(newFile);
    updateFilesListDev();
    hideCreateFileModalDev();
}


// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------


// UI Elements
const themeSelector = document.getElementById('theme-selector');
const themeCSS = document.getElementById('theme-css');
const tabSizeInput = document.getElementById('tab-size');
const lineNumbersCheckbox = document.getElementById('line-numbers');
const lineWrappingCheckbox = document.getElementById('line-wrapping');
const autoCloseBracketsCheckbox = document.getElementById('auto-close-brackets');
const matchBracketsCheckbox = document.getElementById('match-brackets');
const applyBtn = document.getElementById('apply-settings');



// Apply and save settings
applyBtn.addEventListener('click', () => {
    const selectedTheme = themeSelector.value;
    const tabSize = parseInt(tabSizeInput.value, 10);
    const lineNumbers = lineNumbersCheckbox.checked;
    const lineWrapping = lineWrappingCheckbox.checked;
    const autoCloseBrackets = autoCloseBracketsCheckbox.checked;
    const matchBrackets = matchBracketsCheckbox.checked;
    const feedback = document.querySelector('.apply-feedback-progMode');
    feedback.textContent = 'Applied!';
    feedback.classList.add('show');
    // Apply to CodeMirror
    editorInstance.setOption("theme", selectedTheme);
    editorInstance.setOption("tabSize", tabSize);
    editorInstance.setOption("indentUnit", tabSize);
    editorInstance.setOption("lineNumbers", lineNumbers);
    editorInstance.setOption("lineWrapping", lineWrapping);
    editorInstance.setOption("autoCloseBrackets", autoCloseBrackets);
    editorInstance.setOption("matchBrackets", matchBrackets);

    // Update CSS
    themeCSS.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/${selectedTheme}.min.css`;

    if(selectedTheme == 'blackboard'){
        applyBlackboardTheme();
    }
    if(selectedTheme == "neo"){
        applyNeoTheme();
    }

    // Save settings
    const settings = {
        theme: selectedTheme,
        tabSize,
        lineNumbers,
        lineWrapping,
        autoCloseBrackets,
        matchBrackets
    };
    localStorage.setItem('editor-settings', JSON.stringify(settings));
    console.log("Settings saved:", settings);

    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2500);
});





// UI Elements for HTML Editor
const htmlThemeSelector = document.getElementById('theme-selector-htmlEditor');
const htmlTabSizeInput = document.getElementById('tab-size-htmlEditor');
const htmlLineNumbersCheckbox = document.getElementById('line-numbers-htmlEditor');
const htmlLineWrappingCheckbox = document.getElementById('line-wrapping-htmlEditor');
const htmlAutoCloseBracketsCheckbox = document.getElementById('auto-close-brackets-htmlEditor');
const htmlMatchBracketsCheckbox = document.getElementById('match-brackets-htmlEditor');
const htmlAutoCloseTagsCheckbox = document.getElementById('auto-close-tags-htmlEditor');
const htmlApplyBtn = document.getElementById('apply-settings-htmlEditor');

// UI Elements for CSS Editor
const cssThemeSelector = document.getElementById('theme-selector-cssEditor');
const cssTabSizeInput = document.getElementById('tab-size-cssEditor');
const cssLineNumbersCheckbox = document.getElementById('line-numbers-cssEditor');
const cssLineWrappingCheckbox = document.getElementById('line-wrapping-cssEditor');
const cssAutoCloseBracketsCheckbox = document.getElementById('auto-close-brackets-cssEditor');
const cssMatchBracketsCheckbox = document.getElementById('match-brackets-cssEditor');
const cssAutoCloseTagsCheckbox = document.getElementById('auto-close-tags-cssEditor');
const cssApplyBtn = document.getElementById('apply-settings-cssEditor');

// UI Elements for JS Editor
const jsThemeSelector = document.getElementById('theme-selector-jsEditor');
const jsTabSizeInput = document.getElementById('tab-size-jsEditor');
const jsLineNumbersCheckbox = document.getElementById('line-numbers-jsEditor');
const jsLineWrappingCheckbox = document.getElementById('line-wrapping-jsEditor');
const jsAutoCloseBracketsCheckbox = document.getElementById('auto-close-brackets-jsEditor');
const jsMatchBracketsCheckbox = document.getElementById('match-brackets-jsEditor');
const jsAutoCloseTagsCheckbox = document.getElementById('auto-close-tags-jsEditor');
const jsApplyBtn = document.getElementById('apply-settings-jsEditor');


// Apply and save HTML Editor settings
htmlApplyBtn.addEventListener('click', () => {
    const selectedTheme = htmlThemeSelector.value;
    const tabSize = parseInt(htmlTabSizeInput.value, 10);
    const lineNumbers = htmlLineNumbersCheckbox.checked;
    const lineWrapping = htmlLineWrappingCheckbox.checked;
    const autoCloseBrackets = htmlAutoCloseBracketsCheckbox.checked;
    const matchBrackets = htmlMatchBracketsCheckbox.checked;
    const autoCloseTags = htmlAutoCloseTagsCheckbox.checked;
    const feedback = document.querySelector('.apply-feedback-htmlEditor');
    
    feedback.textContent = 'Applied!';
    feedback.classList.add('show');
    
    // Apply to HTML Editor
    htmlEditor.setOption("theme", selectedTheme);
    htmlEditor.setOption("tabSize", tabSize);
    htmlEditor.setOption("indentUnit", tabSize);
    htmlEditor.setOption("lineNumbers", lineNumbers);
    htmlEditor.setOption("lineWrapping", lineWrapping);
    htmlEditor.setOption("autoCloseBrackets", autoCloseBrackets);
    htmlEditor.setOption("matchBrackets", matchBrackets);
    htmlEditor.setOption("autoCloseTags", autoCloseTags);

    // Save settings
    const settings = {
        theme: selectedTheme,
        tabSize,
        lineNumbers,
        lineWrapping,
        autoCloseBrackets,
        matchBrackets,
        autoCloseTags
    };
    localStorage.setItem('html-editor-settings', JSON.stringify(settings));

    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2500);
});

// Apply and save CSS Editor settings
cssApplyBtn.addEventListener('click', () => {
    const selectedTheme = cssThemeSelector.value;
    const tabSize = parseInt(cssTabSizeInput.value, 10);
    const lineNumbers = cssLineNumbersCheckbox.checked;
    const lineWrapping = cssLineWrappingCheckbox.checked;
    const autoCloseBrackets = cssAutoCloseBracketsCheckbox.checked;
    const matchBrackets = cssMatchBracketsCheckbox.checked;
    const autoCloseTags = cssAutoCloseTagsCheckbox.checked;
    const feedback = document.querySelector('.apply-feedback-cssEditor');
    
    feedback.textContent = 'Applied!';
    feedback.classList.add('show');
    
    // Apply to CSS Editor
    cssEditor.setOption("theme", selectedTheme);
    cssEditor.setOption("tabSize", tabSize);
    cssEditor.setOption("indentUnit", tabSize);
    cssEditor.setOption("lineNumbers", lineNumbers);
    cssEditor.setOption("lineWrapping", lineWrapping);
    cssEditor.setOption("autoCloseBrackets", autoCloseBrackets);
    cssEditor.setOption("matchBrackets", matchBrackets);
    cssEditor.setOption("autoCloseTags", autoCloseTags);

    // Save settings
    const settings = {
        theme: selectedTheme,
        tabSize,
        lineNumbers,
        lineWrapping,
        autoCloseBrackets,
        matchBrackets,
        autoCloseTags
    };
    localStorage.setItem('css-editor-settings', JSON.stringify(settings));

    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2500);
});

// Apply and save JS Editor settings
jsApplyBtn.addEventListener('click', () => {
    const selectedTheme = jsThemeSelector.value;
    const tabSize = parseInt(jsTabSizeInput.value, 10);
    const lineNumbers = jsLineNumbersCheckbox.checked;
    const lineWrapping = jsLineWrappingCheckbox.checked;
    const autoCloseBrackets = jsAutoCloseBracketsCheckbox.checked;
    const matchBrackets = jsMatchBracketsCheckbox.checked;
    const autoCloseTags = jsAutoCloseTagsCheckbox.checked;
    const feedback = document.querySelector('.apply-feedback-jsEditor');
    
    feedback.textContent = 'Applied!';
    feedback.classList.add('show');
    
    // Apply to JS Editor
    jsEditor.setOption("theme", selectedTheme);
    jsEditor.setOption("tabSize", tabSize);
    jsEditor.setOption("indentUnit", tabSize);
    jsEditor.setOption("lineNumbers", lineNumbers);
    jsEditor.setOption("lineWrapping", lineWrapping);
    jsEditor.setOption("autoCloseBrackets", autoCloseBrackets);
    jsEditor.setOption("matchBrackets", matchBrackets);
    jsEditor.setOption("autoCloseTags", autoCloseTags);

    // Save settings
    const settings = {
        theme: selectedTheme,
        tabSize,
        lineNumbers,
        lineWrapping,
        autoCloseBrackets,
        matchBrackets,
        autoCloseTags
    };
    localStorage.setItem('js-editor-settings', JSON.stringify(settings));

    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2500);
});



// Load saved settings on startup
window.addEventListener('DOMContentLoaded', () => {
    const savedSettings = JSON.parse(localStorage.getItem('editor-settings'));
    if (savedSettings) {
        // Apply settings to CodeMirror
        editorInstance.setOption("theme", savedSettings.theme);
        editorInstance.setOption("tabSize", savedSettings.tabSize);
        editorInstance.setOption("indentUnit", savedSettings.tabSize);
        editorInstance.setOption("lineNumbers", savedSettings.lineNumbers);
        editorInstance.setOption("lineWrapping", savedSettings.lineWrapping);
        editorInstance.setOption("autoCloseBrackets", savedSettings.autoCloseBrackets);
        editorInstance.setOption("matchBrackets", savedSettings.matchBrackets);
        editorInstance5.setOption("theme", savedSettings.theme);
        // Apply theme CSS
        themeCSS.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/${savedSettings.theme}.min.css`;

        // Update UI
        themeSelector.value = savedSettings.theme;
        tabSizeInput.value = savedSettings.tabSize;
        lineNumbersCheckbox.checked = savedSettings.lineNumbers;
        lineWrappingCheckbox.checked = savedSettings.lineWrapping;
        autoCloseBracketsCheckbox.checked = savedSettings.autoCloseBrackets;
        matchBracketsCheckbox.checked = savedSettings.matchBrackets;
        if(themeSelector.value == 'neo'){
            applyNeoTheme();
        }else{
            applyBlackboardTheme();
            document.getElementById('chahiyeTab'). href="";
        }
        console.log("Settings loaded:", savedSettings);
    }

    // Load HTML Editor settings
    const htmlSavedSettings = JSON.parse(localStorage.getItem('html-editor-settings'));
    if (htmlSavedSettings) {
        htmlEditor.setOption("theme", htmlSavedSettings.theme);
        htmlEditor.setOption("tabSize", htmlSavedSettings.tabSize);
        htmlEditor.setOption("indentUnit", htmlSavedSettings.tabSize);
        htmlEditor.setOption("lineNumbers", htmlSavedSettings.lineNumbers);
        htmlEditor.setOption("lineWrapping", htmlSavedSettings.lineWrapping);
        htmlEditor.setOption("autoCloseBrackets", htmlSavedSettings.autoCloseBrackets);
        htmlEditor.setOption("matchBrackets", htmlSavedSettings.matchBrackets);
        htmlEditor.setOption("autoCloseTags", htmlSavedSettings.autoCloseTags);

        htmlThemeSelector.value = htmlSavedSettings.theme;
        htmlTabSizeInput.value = htmlSavedSettings.tabSize;
        htmlLineNumbersCheckbox.checked = htmlSavedSettings.lineNumbers;
        htmlLineWrappingCheckbox.checked = htmlSavedSettings.lineWrapping;
        htmlAutoCloseBracketsCheckbox.checked = htmlSavedSettings.autoCloseBrackets;
        htmlMatchBracketsCheckbox.checked = htmlSavedSettings.matchBrackets;
        htmlAutoCloseTagsCheckbox.checked = htmlSavedSettings.autoCloseTags;
    }

    // Load CSS Editor settings
    const cssSavedSettings = JSON.parse(localStorage.getItem('css-editor-settings'));
    if (cssSavedSettings) {
        cssEditor.setOption("theme", cssSavedSettings.theme);
        cssEditor.setOption("tabSize", cssSavedSettings.tabSize);
        cssEditor.setOption("indentUnit", cssSavedSettings.tabSize);
        cssEditor.setOption("lineNumbers", cssSavedSettings.lineNumbers);
        cssEditor.setOption("lineWrapping", cssSavedSettings.lineWrapping);
        cssEditor.setOption("autoCloseBrackets", cssSavedSettings.autoCloseBrackets);
        cssEditor.setOption("matchBrackets", cssSavedSettings.matchBrackets);
        cssEditor.setOption("autoCloseTags", cssSavedSettings.autoCloseTags);

        cssThemeSelector.value = cssSavedSettings.theme;
        cssTabSizeInput.value = cssSavedSettings.tabSize;
        cssLineNumbersCheckbox.checked = cssSavedSettings.lineNumbers;
        cssLineWrappingCheckbox.checked = cssSavedSettings.lineWrapping;
        cssAutoCloseBracketsCheckbox.checked = cssSavedSettings.autoCloseBrackets;
        cssMatchBracketsCheckbox.checked = cssSavedSettings.matchBrackets;
        cssAutoCloseTagsCheckbox.checked = cssSavedSettings.autoCloseTags;
    }

    // Load JS Editor settings
    const jsSavedSettings = JSON.parse(localStorage.getItem('js-editor-settings'));
    if (jsSavedSettings) {
        jsEditor.setOption("theme", jsSavedSettings.theme);
        jsEditor.setOption("tabSize", jsSavedSettings.tabSize);
        jsEditor.setOption("indentUnit", jsSavedSettings.tabSize);
        jsEditor.setOption("lineNumbers", jsSavedSettings.lineNumbers);
        jsEditor.setOption("lineWrapping", jsSavedSettings.lineWrapping);
        jsEditor.setOption("autoCloseBrackets", jsSavedSettings.autoCloseBrackets);
        jsEditor.setOption("matchBrackets", jsSavedSettings.matchBrackets);
        jsEditor.setOption("autoCloseTags", jsSavedSettings.autoCloseTags);

        jsThemeSelector.value = jsSavedSettings.theme;
        jsTabSizeInput.value = jsSavedSettings.tabSize;
        jsLineNumbersCheckbox.checked = jsSavedSettings.lineNumbers;
        jsLineWrappingCheckbox.checked = jsSavedSettings.lineWrapping;
        jsAutoCloseBracketsCheckbox.checked = jsSavedSettings.autoCloseBrackets;
        jsMatchBracketsCheckbox.checked = jsSavedSettings.matchBrackets;
        jsAutoCloseTagsCheckbox.checked = jsSavedSettings.autoCloseTags;
    }
});





// Keep your existing actions array, but make sure the IDs match exactly what's in your HTML
const actions = [
    { id: 'compileIcon',   name: 'Compile',           shortcutElement: 'compileShortcut' },
    { id: 'runIcon',       name: 'Run',               shortcutElement: 'runShortcut' },
    { id: 'saveIcon',      name: 'Save',              shortcutElement: 'saveShortcut' },
    { id: 'dev-mode',      name: 'Dev Mode',          shortcutElement: 'devModeShortcut' },
    { id: 'dup',           name: 'Code-2',            shortcutElement: 'dupShortcut' },
    { id: 'ai-mode',       name: 'AI',                shortcutElement: 'aiModeShortcut' },
    { id: 'settings-mode', name: 'Settings',          shortcutElement: 'settingsModeShortcut' },
    { id: 'file-dev',      name: 'File Explorer Dev', shortcutElement: 'fileDevShortcut' },
    { id: 'css-icon',      name: 'CSS',               shortcutElement: 'cssIconShortcut' },
    { id: 'js-icon',       name: 'JavaScript',        shortcutElement: 'jsIconShortcut' },
    // { id: 'preview-icon',  name: 'Preview',           shortcutElement: 'previewIconShortcut' },
    { id: 'sampleDev',     name: 'Sample HTML',       shortcutElement: 'sampleDevShortcut' },
    { id: 'converter',     name: 'Converter',         shortcutElement: 'converterShortcut' }
];


// Apply a consistent click handler to ALL icons
actions.forEach(action => {
    const icon = document.getElementById(action.id);
    if (icon) {
        icon.addEventListener('click', () => {
            console.log(`Action triggered: ${action.name}`);
            
            // Add visual feedback
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    } else {
        console.warn(`Icon with ID '${action.id}' not found in the DOM`);
    }
});


let keybindings = {};
actions.forEach(action => keybindings[action.id] = null);

let isRecordingKey = false;
let currentRecordingType = null;

const keybindingsList = document.getElementById('keybindingsList');
const logOutput = document.querySelector('.log-output');

function saveKeybindingsToLocalStorage() {
    localStorage.setItem('customKeybindings', JSON.stringify(keybindings));
    logMessage('Keybindings saved to localStorage.', 'info');
}

function loadKeybindingsFromLocalStorage() {
    const saved = localStorage.getItem('customKeybindings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            for (const action of actions) {
                if (parsed[action.id]) {
                    keybindings[action.id] = parsed[action.id];
                }
            }
            logMessage('Keybindings loaded from localStorage.', 'info');
        } catch (e) {
            console.error('Failed to load keybindings:', e);
            logMessage('Failed to load saved keybindings.', 'error');
        }
    }
}

function generateKeybindingsUI() {
    keybindingsList.innerHTML = '';
    actions.forEach(action => {
        const row = document.createElement('div');
        row.className = 'keybind-row';

        const label = document.createElement('span');
        label.className = 'keybind-label';
        label.textContent = `${action.name}:`;

        const display = document.createElement('div');
        display.id = `${action.id}Keybind`;
        display.className = 'keybind-display';
        display.textContent = keybindings[action.id] ? getKeybindDisplayText(action.id) : 'Not Set';
        if (!keybindings[action.id]) display.classList.add('empty-keybind');

        const button = document.createElement('button');
        button.id = `change${capitalize(action.id)}Btn`;
        button.className = 'keybind-button';
        button.textContent = 'Set';
        button.addEventListener('click', () => startRecordingForKey(action.id));

        const controls = document.createElement('div');
        controls.className = 'keybind-controls';
        controls.appendChild(display);
        controls.appendChild(button);

        row.appendChild(label);
        row.appendChild(controls);
        keybindingsList.appendChild(row);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getKeybindDisplayText(actionId) {
    const kb = keybindings[actionId];
    if (!kb) return 'Not Set';
    let text = '';
    if (kb.ctrl) text += 'Ctrl+';
    if (kb.alt) text += 'Alt+';
    if (kb.shift) text += 'Shift+';
    let keyDisplay = kb.key === ' ' ? 'Space' : kb.key.length === 1 ? kb.key.toUpperCase() : kb.key;
    return text + keyDisplay;
}

function logMessage(message, type = 'info') {
    const logLine = document.createElement('p');
    logLine.className = `log ${type}`;
    logLine.textContent = message;
    logOutput.appendChild(logLine);
    logOutput.scrollTop = logOutput.scrollHeight;
    if (logOutput.children.length > 20) logOutput.removeChild(logOutput.children[0]);
}

function startRecordingForKey(actionId) {
    if (isRecordingKey) stopRecordingForKey();
    isRecordingKey = true;
    currentRecordingType = actionId;
    document.getElementById(`change${capitalize(actionId)}Btn`).textContent = 'Press Keys...';
    logMessage(`Recording keybind for ${actionId}. Press your desired key combination...`, 'info');
}

function stopRecordingForKey() {
    if (!isRecordingKey) return;
    const button = document.getElementById(`change${capitalize(currentRecordingType)}Btn`);
    button.textContent = 'Set';
    isRecordingKey = false;
    currentRecordingType = null;
}

function isDuplicateKeybinding(newBinding, excludeId) {
    return Object.entries(keybindings).find(([id, binding]) =>
        id !== excludeId &&
        binding &&
        binding.key.toLowerCase() === newBinding.key.toLowerCase() &&
        binding.ctrl === newBinding.ctrl &&
        binding.alt === newBinding.alt &&
        binding.shift === newBinding.shift
    );
}

function handleKeyDown(e) {
    if (isRecordingKey) {
        if (['Control', 'Alt', 'Shift', 'Meta', 'OS'].includes(e.key)) return;
        e.preventDefault();
        const newBinding = {
            key: e.key,
            ctrl: e.ctrlKey,
            alt: e.altKey,
            shift: e.shiftKey
        };

        const duplicate = isDuplicateKeybinding(newBinding, currentRecordingType);
        if (duplicate) {
            const name = actions.find(a => a.id === duplicate[0]).name;
            logMessage(`This keybinding is already assigned to "${name}"!`, 'warning');
            return;
        }

        keybindings[currentRecordingType] = newBinding;
        document.getElementById(currentRecordingType + 'Keybind').textContent = getKeybindDisplayText(currentRecordingType);
        document.getElementById(currentRecordingType + 'Keybind').classList.remove('empty-keybind');
        logMessage(`Keybind for ${currentRecordingType} set to ${getKeybindDisplayText(currentRecordingType)}`, 'success');

        saveKeybindingsToLocalStorage(); // localStorage

        stopRecordingForKey();
        return;
    }

    for (const [actionId, binding] of Object.entries(keybindings)) {
        if (!binding) continue;
        if (
            e.key.toLowerCase() === binding.key.toLowerCase() &&
            e.ctrlKey === binding.ctrl &&
            e.altKey === binding.alt &&
            e.shiftKey === binding.shift
        ) {
            e.preventDefault();
            executeAction(actionId);
            break;
        }
    }
}

// This is the important modification for executeAction function:
function executeAction(actionId) {
    const icon = document.getElementById(actionId);
    if (icon) {
        flashIcon(icon);
        // Trigger a click on the icon to use the existing click handler
        // that's set up in your second file
        icon.click();
        logMessage(`Executed: ${actionId}`, 'success');
    } else {
        logMessage(`No sidebar icon found for action: ${actionId}`, 'warning');
    }
}
function flashIcon(icon) {
    icon.classList.add('active-flash');
    setTimeout(() => icon.classList.remove('active-flash'), 300);
}

document.addEventListener('keydown', handleKeyDown);

loadKeybindingsFromLocalStorage();
generateKeybindingsUI();
logMessage('Welcome! Click "Set" to assign a keybinding to a sidebar action.');

document.getElementById('resetKeybindingsBtn')?.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all keybindings?")) {
        actions.forEach(action => keybindings[action.id] = null);
        saveKeybindingsToLocalStorage();
        generateKeybindingsUI();
        logMessage('All keybindings have been reset.', 'warning');
    }
});

// // Only attach events to functional icons
// document.getElementById('compileIcon').addEventListener('click', () => {
//     console.log("Compile action triggered");
//     // 
// });

// document.getElementById('runIcon').addEventListener('click', () => {
//     console.log("Run action triggered");
//     // 
// });

// document.getElementById('saveIcon').addEventListener('click', () => {
//     console.log("Save action triggered");
//     // 
// });

document.querySelectorAll('.icon.disabled').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`"${icon.title}" is currently disabled`);
    });
});

const functionalIcons = {
    'compile': 'compileIcon',
    'run': 'runIcon',
    'save': 'saveIcon'
};

Object.entries(functionalIcons).forEach(([action, iconId]) => {
    const icon = document.getElementById(iconId);
    if (icon) {
        icon.addEventListener('click', () => {
            console.log(`${action} action triggered`);
            // Add your specific action logic here
            
            // Visual feedback
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    }
});

document.querySelectorAll('.icon.inactive').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`${icon.title || 'This feature'} is not available yet`);
        
        // Visual feedback
        icon.style.animation = 'shake 0.5s';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
});

document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-2px); }
    40%, 80% { transform: translateX(2px); }
}
</style>
`);



function applyBlackboardTheme() {
    document.getElementById('theme-cssSheet').href = '/css/m5new.css';
    document.getElementById('chahiyeTab'). href = "";
    document.getElementById('1Logo').src="/icons/livePreviewW.svg";
    // Manually update each icon src by removing 'W'
    document.getElementById('1Logo').src = "/icons/livePreviewW.svg";
    document.getElementById('2Logo').src = "/icons/compilerW.svg";
    document.getElementById('3Logo').src = "/icons/runW.svg";
    document.getElementById('4Logo').src = "/icons/downloadW.svg";
    document.getElementById('5Logo').src = "/icons/selectfolderW.svg";
    document.getElementById('6Logo').src = "/icons/duplicateCodeW.svg";
    document.getElementById('7Logo').src = "/icons/minimapW.svg";
    document.getElementById('8Logo').src = "/icons/outputW.svg";
    document.getElementById('9Logo').src = "/icons/inputW.svg";
    document.getElementById('10Logo').src = "/icons/githubW.svg";
    document.getElementById('11Logo').src = "/icons/chatbotW.svg";
    document.getElementById('12Logo').src = "/icons/settingsW.svg";
    document.getElementById('13Logo').src = "/icons/selectfolderW.svg";
    document.getElementById('14Logo').src = "/icons/cssW.svg";
    document.getElementById('15Logo').src = "/icons/jsW.svg";
    document.getElementById('16Logo').src = "/icons/codeConverterW.svg";
    document.getElementById('17Logo').src = "/icons/sampleCodeW.svg";
    document.getElementById('18Logo').src = "/icons/newfileW.svg";
    document.getElementById('19Logo').src = "/icons/selectfolderW.svg";
    document.getElementById('20Logo').src = "/icons/selectfilesW.svg";

    // Feature cards /icons
    document.getElementById('21Logo').src = "/icons/inputW.svg";
    document.getElementById('22Logo').src = "/icons/livePreviewW.svg";
    document.getElementById('23Logo').src = "/icons/selectfilesW.svg";
    //document.getElementById('24ogo').src = "/icons/selectfilesW.svg";
    document.getElementById('25Logo').src = "/icons/githubW.svg";
    document.getElementById('26Logo').src = "/icons/chatbotW.svg";
    document.getElementById('27Logo').src = "/icons/livePreviewW.svg";
    document.getElementById('28Logo').src = "/icons/cssW.svg";
    //document.getElementById('29Logo').src = "/icons/inputW.svg";


    
    
    document.getElementById('33Logo').src = "/icons/toolsW.svg";
    document.getElementById('34Logo').src = "/icons/collabW.svg";
    document.getElementById('35Logo').src = "/icons/teamW.svg";
    document.getElementById('36Logo').src = "/icons/collabW.svg";
    document.getElementById('37Logo').src = "/icons/micW.svg";
    document.getElementById('38Logo').src = "/icons/msgW.svg";
    document.getElementById('39Logo').src = "/icons/whiteboardW.svg";
    document.getElementById('40Logo').src = "/icons/toolsW.svg";
    document.getElementById('41Logo').src = "/icons/devsW.svg";
    document.getElementById('42Logo').src = "/icons/heart2W.svg";
    document.getElementById('43Logo').src = "/icons/devsW.svg";
    document.getElementById('44Logo').src = "/icons/teamW.svg";
    document.getElementById('45Logo').src = "/icons/target.svg";
    document.getElementById('46Logo').src = "/icons/connectW.svg";
    document.getElementById('47Logo').src = "/icons/compilerW.svg";
    document.getElementById('48Logo').src = "/icons/devsW.svg";
    document.getElementById('49Logo').src = "/icons/heartW.svg";
    document.getElementById('50Logo').src = "/icons/toolsW.svg";
    document.getElementById('51Logo').src = "/icons/modeW.svg";
    document.getElementById('52Logo').src = "/icons/terminalW.svg"; 

    document.getElementById('55Logo').src = "/icons/newfileW.svg"; 
    document.getElementById('56Logo').src = "/icons/selectfolderW.svg"; 
    document.getElementById('57Logo').src = "/icons/selectfilesW.svg"; 

    document.getElementById('60Logo').src = "/icons/collabW.svg";
    document.getElementById('61Logo').src = "/icons/whiteboardW.svg";

    // Set background for main containers
    document.body.style.backgroundColor = '#0c1021';

    // Panels
    document.querySelectorAll('.panel').forEach(panel => {
        panel.style.backgroundColor = '#0c1021';
        panel.style.color = '#f8f8f2'; // Light font color for visibility
    });

    // Panels
    document.querySelectorAll('.panel-dev').forEach(panel => {
        panel.style.backgroundColor = '#0c1021';
        panel.style.color = '#f8f8f2'; // Light font color for visibility
    });

    
    // Headers
    document.querySelectorAll('.header').forEach(header => {
        header.style.backgroundColor = '#1a1e3f';
        header.style.color = '#f8f8f2';
    });
    // Headers
    document.querySelectorAll('.header-dev').forEach(header => {
        header.style.backgroundColor = '#1a1e3f';
        header.style.color = '#f8f8f2';
    });

    // Code editor textareas
    document.querySelectorAll('textarea').forEach(editor => {
        editor.style.backgroundColor = '#0c1021';
        editor.style.color = '#e0e0e0';
        editor.style.border = '1px solid #333';
    });

    // Dropdown menu and buttons
    document.querySelectorAll('.dropdown-menu, .button-group button').forEach(el => {
        el.style.backgroundColor = '#1c223a';
        el.style.color = '#f0f0f0';
        el.style.border = '1px solid #444';
    });

    // Inputs and selects
    document.querySelectorAll('input, select').forEach(el => {
        el.style.backgroundColor = '#1a1e3f';
        el.style.color = '#ffffff';
        el.style.border = '1px solid #444';
    });

    // Output panel
    document.getElementById('Output').style.backgroundColor = '#0c1021';
    document.getElementById('output').style.color = '#00ff90';
    document.getElementById('compilekaDiv').style.color = '#ffcc00';

    // Divider color
    document.querySelectorAll('.vertical-divider, .horizontal-divider').forEach(div => {
        div.style.backgroundColor = '#444';
    });

    // Drop area message
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
        dropArea.style.backgroundColor = '#1c223a';
        dropArea.style.color = '#ccc';
    }
}
function applyNeoTheme(){
    console.log("ha bhai agaye yaha tak");
    document.getElementById('theme-cssSheet').href = "/css/m5W.css";
    document.getElementById('chahiyeTab').href = "/css/solarized.css";
    // Loop through all icon images by ID pattern and remove 'W' from src
    // for (let i = 1; i <= 17; i++) {
    //     const logo = document.getElementById(`${i}Logo`);
    //     if (logo) {
    //         logo.src = logo.src.replace("W", "");
    //     }
    // }

    // Manually update each icon src by removing 'W'
    document.getElementById('1Logo').src = "/icons/livePreview.svg";
    document.getElementById('2Logo').src = "/icons/compiler.svg";
    document.getElementById('3Logo').src = "/icons/run.svg";
    document.getElementById('4Logo').src = "/icons/download.svg";
    document.getElementById('5Logo').src = "/icons/selectfolder.svg";
    document.getElementById('6Logo').src = "/icons/duplicateCode.svg";
    document.getElementById('7Logo').src = "/icons/minimap.svg";
    document.getElementById('8Logo').src = "/icons/output.svg";
    document.getElementById('9Logo').src = "/icons/input.svg";
    document.getElementById('10Logo').src = "/icons/github.svg";
    document.getElementById('11Logo').src = "/icons/chatbot.svg";
    document.getElementById('12Logo').src = "/icons/settings.svg";
    document.getElementById('13Logo').src = "/icons/selectfolder.svg";
    document.getElementById('14Logo').src = "/icons/css.svg";
    document.getElementById('15Logo').src = "/icons/js.svg";
    document.getElementById('16Logo').src = "/icons/codeConverter.svg";
    document.getElementById('17Logo').src = "/icons/sampleCode.svg";
    document.getElementById('18Logo').src = "/icons/newfile.svg";
    document.getElementById('19Logo').src = "/icons/selectfolder.svg";
    document.getElementById('20Logo').src = "/icons/selectfiles.svg";

    // Feature cards /icons
    document.getElementById('21Logo').src = "/icons/input.svg";
    document.getElementById('22Logo').src = "/icons/livePreview.svg";
    document.getElementById('23Logo').src = "/icons/selectfiles.svg";
    // document.getElementById('24Logo').src = "/icons/selectfiles.svg";
    document.getElementById('25Logo').src = "/icons/github.svg";
    document.getElementById('26Logo').src = "/icons/chatbot.svg";
    document.getElementById('27Logo').src = "/icons/livePreview.svg";
    document.getElementById('28Logo').src = "/icons/css.svg";
    // document.getElementById('29Logo').src = "/icons/input.svg";

    document.getElementById('30Logo').src = "/icons/refresh-vc.svg";
    document.getElementById('31Logo').src = "/icons/codeConverter.svg";
    document.getElementById('32Logo').src = "/icons/refillvc.svg";


    document.getElementById('33Logo').src = "/icons/tools.svg";
    document.getElementById('34Logo').src = "/icons/collab.svg";
    document.getElementById('35Logo').src = "/icons/team.svg";
    document.getElementById('36Logo').src = "/icons/collab.svg";
    document.getElementById('37Logo').src = "/icons/mic.svg";
    document.getElementById('38Logo').src = "/icons/msg.svg";
    document.getElementById('39Logo').src = "/icons/whiteboard.svg";
    document.getElementById('40Logo').src = "/icons/tools.svg";
    document.getElementById('41Logo').src = "/icons/devsbig.svg";
    document.getElementById('42Logo').src = "/icons/heart2.svg";
    document.getElementById('43Logo').src = "/icons/devs.svg";
    document.getElementById('44Logo').src = "/icons/team.svg";
    document.getElementById('45Logo').src = "/icons/targetW.svg";
    document.getElementById('46Logo').src = "/icons/conect.svg";
    document.getElementById('47Logo').src = "/icons/compiler.svg";
    document.getElementById('48Logo').src = "/icons/devs.svg";
    document.getElementById('49Logo').src = "/icons/heart.svg";
    document.getElementById('50Logo').src = "/icons/tools.svg";
    document.getElementById('51Logo').src = "/icons/mode.svg";
    document.getElementById('52Logo').src = "/icons/terminal.svg"; 


    document.getElementById('55Logo').src = "/icons/newfile.svg"; 
    document.getElementById('56Logo').src = "/icons/selectfolder.svg"; 
    document.getElementById('57Logo').src = "/icons/selectfiles.svg"; 

    document.getElementById('60Logo').src = "/icons/collab.svg";
    document.getElementById('61Logo').src = "/icons/whiteboard.svg";

    document.body.style.backgroundColor = '#fdf6e3'; // Beige background

// PanelsC
document.querySelectorAll('.panel, .panel-dev').forEach(panel => {
    panel.style.backgroundColor = '#fdf6e3'; // Beige
    panel.style.color = '#333333'; // Dark text for contrast
});

// Headers
document.querySelectorAll('.header, .header-dev').forEach(header => {
    header.style.backgroundColor = '#f5deb3'; // Lighter beige (wheat)
    header.style.color = '#333333';
});

// Code editor textareas
document.querySelectorAll('textarea').forEach(editor => {
    editor.style.backgroundColor = '#fffaf0'; // Floral white
    editor.style.color = '#111111';
    editor.style.border = '1px solid #d2b48c'; // Tan border
});

// Dropdown menu and buttons
document.querySelectorAll('.dropdown-menu, .button-group button').forEach(el => {
    el.style.backgroundColor = '#faebd7'; // Antique white
    el.style.color = '#333';
    el.style.border = '1px solid #deb887'; // Burlywood
});

// Inputs and selects
document.querySelectorAll('input, select').forEach(el => {
    el.style.backgroundColor = '#f5f5dc'; // Beige
    el.style.color = '#222';
    el.style.border = '1px solid #d2b48c';
});

// Output panel
document.getElementById('Output').style.backgroundColor = '#fffaf0'; // Light cream
document.getElementById('output').style.color = '#006400'; // Dark green for success output
document.getElementById('compilekaDiv').style.color = '#b8860b'; // Dark goldenrod

// Divider color
document.querySelectorAll('.vertical-divider, .horizontal-divider').forEach(div => {
    div.style.backgroundColor = '#d2b48c'; // Tan
});

// Drop area message
const dropArea = document.getElementById('drop-area');
if (dropArea) {
    dropArea.style.backgroundColor = '#faebd7'; // Antique white
    dropArea.style.color = '#444';
}
document.getElementById('devheading').style.color = 'var(--color-dark-blue)';
}

// const svgObject = document.getElementById('compiler');

// // Wait until SVG is loaded
// svgObject.addEventListener('load', () => {
//     const svgDoc = svgObject.contentDocument;
//     const svgElement = svgDoc.querySelector('svg'); // select the <svg> tag inside

//     if (svgElement) {
//         svgElement.setAttribute('fill', 'white'); // change stroke color
//         // Or, you can also change specific <path> or <line> etc.
//         // const path = svgDoc.querySelector('path');
//         // path.setAttribute('stroke', 'blue');
//     }
// });

// // --- ACTIONS ---
// const actions = [
//     {id: 'compile', name: 'Compile', shortcutElement: 'compileShortcut'},
//     {id: 'run', name: 'Run', shortcutElement: 'runShortcut'},
//     {id: 'save', name: 'Save', shortcutElement: 'saveShortcut'},
//     {id: 'devMode', name: 'Dev Mode', shortcutElement: 'devModeShortcut'}
// ];

// let keybindings = {};
// actions.forEach(action => keybindings[action.id] = null);

// let isRecordingKey = false;
// let currentRecordingType = null;

// const keybindingsList = document.getElementById('keybindingsList');
// const logOutput = document.querySelector('.log-output');

// function generateKeybindingsUI() {
//     keybindingsList.innerHTML = '';
//     actions.forEach(action => {
//         const row = document.createElement('div');
//         row.className = 'keybind-row';

//         const label = document.createElement('span');
//         label.className = 'keybind-label';
//         label.textContent = `${action.name}:`;

//         const display = document.createElement('div');
//         display.id = `${action.id}Keybind`;
//         display.className = 'keybind-display';
//         display.textContent = keybindings[action.id] ? getKeybindDisplayText(action.id) : 'Not Set';
//         if (!keybindings[action.id]) display.classList.add('empty-keybind');

//         const button = document.createElement('button');
//         button.id = `change${capitalize(action.id)}Btn`;
//         button.className = 'keybind-button';
//         button.textContent = 'Set';
//         button.addEventListener('click', () => startRecordingForKey(action.id));

//         const controls = document.createElement('div');
//         controls.className = 'keybind-controls';
//         controls.appendChild(display);
//         controls.appendChild(button);

//         row.appendChild(label);
//         row.appendChild(controls);
//         keybindingsList.appendChild(row);
//     });
// }

// function capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function getKeybindDisplayText(actionId) {
//     const kb = keybindings[actionId];
//     if (!kb) return 'Not Set';
//     let text = '';
//     if (kb.ctrl) text += 'Ctrl+';
//     if (kb.alt) text += 'Alt+';
//     if (kb.shift) text += 'Shift+';
//     let keyDisplay = kb.key === ' ' ? 'Space' : kb.key.length === 1 ? kb.key.toUpperCase() : kb.key;
//     return text + keyDisplay;
// }

// function logMessage(message, type = 'info') {
//     const logLine = document.createElement('p');
//     logLine.className = `log ${type}`;
//     logLine.textContent = message;
//     logOutput.appendChild(logLine);
//     logOutput.scrollTop = logOutput.scrollHeight;
//     if (logOutput.children.length > 20) logOutput.removeChild(logOutput.children[0]);
// }

// function startRecordingForKey(actionId) {
//     if (isRecordingKey) stopRecordingForKey();
//     isRecordingKey = true;
//     currentRecordingType = actionId;
//     document.getElementById(`change${capitalize(actionId)}Btn`).textContent = 'Press Keys...';
//     logMessage(`Recording keybind for ${actionId}. Press your desired key combination...`, 'info');
// }

// function stopRecordingForKey() {
//     if (!isRecordingKey) return;
//     const button = document.getElementById(`change${capitalize(currentRecordingType)}Btn`);
//     button.textContent = 'Set';
//     isRecordingKey = false;
//     currentRecordingType = null;
// }

// function isDuplicateKeybinding(newBinding, excludeId) {
//     return Object.entries(keybindings).find(([id, binding]) =>
//         id !== excludeId &&
//         binding &&
//         binding.key.toLowerCase() === newBinding.key.toLowerCase() &&
//         binding.ctrl === newBinding.ctrl &&
//         binding.alt === newBinding.alt &&
//         binding.shift === newBinding.shift
//     );
// }

// function handleKeyDown(e) {
//     if (isRecordingKey) {
//         if (['Control', 'Alt', 'Shift', 'Meta', 'OS'].includes(e.key)) return;
//         e.preventDefault();
//         const newBinding = {
//             key: e.key,
//             ctrl: e.ctrlKey,
//             alt: e.altKey,
//             shift: e.shiftKey
//         };

//         const duplicate = isDuplicateKeybinding(newBinding, currentRecordingType);
//         if (duplicate) {
//             const name = actions.find(a => a.id === duplicate[0]).name;
//             logMessage(`This keybinding is already assigned to "${name}"!`, 'warning');
//             return;
//         }

//         keybindings[currentRecordingType] = newBinding;
//         document.getElementById(currentRecordingType + 'Keybind').textContent = getKeybindDisplayText(currentRecordingType);
//         document.getElementById(currentRecordingType + 'Keybind').classList.remove('empty-keybind');
//         logMessage(`Keybind for ${currentRecordingType} set to ${getKeybindDisplayText(currentRecordingType)}`, 'success');
//         stopRecordingForKey();
//         return;
//     }

//     for (const [actionId, binding] of Object.entries(keybindings)) {
//         if (!binding) continue;
//         if (
//             e.key.toLowerCase() === binding.key.toLowerCase() &&
//             e.ctrlKey === binding.ctrl &&
//             e.altKey === binding.alt &&
//             e.shiftKey === binding.shift
//         ) {
//             e.preventDefault();
//             executeAction(actionId);
//             break;
//         }
//     }
// }

// function executeAction(actionId) {
//     const icon = document.getElementById(`${actionId}Icon`);
//     if (icon) {
//         flashIcon(icon);
//         icon.click();
//         logMessage(`Executed: ${actionId}`, 'success');
//     } else {
//         logMessage(`No sidebar icon found for action: ${actionId}`, 'warning');
//     }
// }

// function flashIcon(icon) {
//     icon.classList.add('active-flash');
//     setTimeout(() => icon.classList.remove('active-flash'), 300);
// }

// document.addEventListener('keydown', handleKeyDown);
// generateKeybindingsUI();
// logMessage('Welcome! Click "Set" to assign a keybinding to a sidebar action.');


// document.getElementById('compileIcon')?.addEventListener('click', () => {
//     console.log('Compile triggered!');
//     // Your compile logic here
// });

// username And DP  on client side
const myName = localStorage.getItem('myName');
document.getElementById('myName').value = myName
document.getElementById('username-input-chitchat').value = myName;

const DP = document.getElementById('displayPicture');
const savedDp = localStorage.getItem('mydp');
if (savedDp) {
    DP.src = savedDp;
}
console.log("Name: " + myName + " | My DP: " + DP.src);

//********************************** Collab **********************************
//********************************** Collab **********************************
//********************************** Collab **********************************
//********************************** Collab **********************************
//********************************** Collab **********************************
//********************************** Collab **********************************
//initial text to load (in case)
socket.on('initial-code', (codeContent) => {
    console.log("initial code pe aya")
    editorInstance.setValue(codeContent);
});

// Keep the rest of your client-side code
// socket.on("code-update", (content) => {
//     if (editorInstance.getValue() !== content) {
//         editorInstance.setValue(content);
//     }
// });

//********************************** Header details **********************************
//********************************** Header details **********************************
//********************************** Header details **********************************
//********************************** Header details **********************************
//********************************** Header details **********************************
//********************************** Header details **********************************
//********************************** Header details **********************************

let isUpdating = false;
const statusElem = document.getElementById('connection-status');
const usersCountElem = document.getElementById('users-count');
const sessionCodeElem = document.getElementById('session-code');
const copyLinkBtn = document.getElementById('copyShareLinkBtn');
const copiedMessage = document.getElementById('copied-message');

// get session code from URL
const path = window.location.pathname;
const sessionCode = path.split('/').pop();

// session codeeee
sessionCodeElem.textContent = sessionCode;        // DONE

copyLinkBtn.addEventListener('click', () => {   
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink).then(() => {
        copiedMessage.style.opacity = '1';
        setTimeout(() => {
          copiedMessage.style.opacity = '0';
        }, 2000);
    });
});

// COde mirrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

// Sync content
editorInstance.on("change", () => {
    minimap.setValue(editorInstance.getValue());
});


editorInstance.on("change", () => {
    if (!isUpdating2) {
        socket.emit("code-update", editorInstance.getValue());
    }
});

socket.on("code-update", (content) => {
    if (editorInstance.getValue() !== content) {
        isUpdating2 = true;
        editorInstance.setValue(content);
        setTimeout(() => { isUpdating2 = false; }, 50); 
    }
});



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
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async (candidate) => {
        if (peerConnection) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
                console.error('Error adding ICE candidate:', error);
            }
        }
    });

    socket.on('disconnect', () => {
        endCall(); // agar dusre user disconnects
    });
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
}

// start call ka kaam
async function startCall() {
    try {
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
        document.getElementById('status-chitchatV').textContent = 'Call in progress';
        document.getElementById('status-chitchatV').style.color = 'var(--accent-yellow)';
    } catch (error) {
        console.error('Error starting call:', error);
        alert('Error starting call. Please check your microphone permissions.');
    }
}

// end call ka kaam
function endCall() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
        peerConnection.close();
    }
    document.getElementById('startCall-chitchatV').disabled = false;
    document.getElementById('endCall-chitchatV').disabled = true;
    document.getElementById('status-chitchatV').textContent = 'Call ended';
    document.getElementById('status-chitchatV').style.color = 'var(--accent-red)';
    
    socket.emit('end-call');
}

// popup hai ye
function showIncomingCall(offer) {
    document.getElementById('incomingCall-chitchatV').style.display = 'block';
    document.getElementById('acceptCall-chitchatV').onclick = () => acceptCall(offer);
}


// agar except kiya toh
async function acceptCall(offer) {
    document.getElementById('incomingCall-chitchatV').style.display = 'none';
    document.getElementById('startCall-chitchatV').disabled = true;
    document.getElementById('endCall-chitchatV').disabled = false;
    document.getElementById('status-chitchatV').textContent = 'Call in progress';
    document.getElementById('status-chitchatV').style.color = 'var(--accent-yellow)';

    await initializePeerConnection();
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // local audio ko connection pe bheja
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
    } catch (error) {
        console.error("Error accessing microphone:", error);
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


const canvas = document.getElementById("whiteboard-whiteboard");
const ctx = canvas.getContext("2d");

const clearBtn = document.getElementById("clearCanvas-whiteboard");
canvas.width = 1200;
canvas.height = 700;
canvas.style.border = "3px solid rgb(25, 31, 27)";

let drawing = false, lastX, lastY;
let color = "#000000", size = 2;

document.getElementById("colorPicker-whiteboard").addEventListener("input", (e) => {
    color = e.target.value;
});

document.getElementById("brushSize-whiteboard").addEventListener("input", (e) => {
    size = parseInt(e.target.value);
});

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    console.log("Mouse down at:", lastX, lastY);
});

canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    
    const rect = canvas.getBoundingClientRect();
    let currentX = e.clientX - rect.left;
    let currentY = e.clientY - rect.top;
    
    console.log("Drawing from", lastX, lastY, "to", currentX, currentY);
    
    // Draw the line
    drawLine(lastX, lastY, currentX, currentY, color, size);
    
    // Emit to socket
    socket.emit("draw", { 
        x1: lastX, 
        y1: lastY, 
        x2: currentX, 
        y2: currentY, 
        color, 
        size 
    });
    
    // Update last position
    lastX = currentX;
    lastY = currentY;
});

function drawLine(x1, y1, x2, y2, color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

socket.on("draw", (data) => {
    const originalIsErasing = isErasing;
    isErasing = false;
    console.log("Received Draw Data: ", data);
    drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.size);
    isErasing = originalIsErasing;
});

// clear canvas
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clearCanvas");
});

socket.on("clearCanvas", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// color buttons
document.querySelectorAll(".color-btn-whiteboard").forEach(button => {
    button.addEventListener("click", () => {
        color = button.getAttribute("data-color");
        document.getElementById("colorPicker-whiteboard").value = color; // Sync with color picker
    });
});

// eraser button
const eraserBtn = document.getElementById("eraser-whiteboard");
let erasorStatus = false;
let isErasing = false;

const eraserSizeInput = document.getElementById("eraserSize-whiteboard");
let eraserSize = parseInt(eraserSizeInput.value);
const ERASER_COLOR = "rgb(249, 249, 233)"; // thoda beige would be better

// eraser size
eraserSizeInput.addEventListener("input", (e) => {
    eraserSize = parseInt(e.target.value);
    eraserBtn.click();
    eraserBtn.click();
});

eraserBtn.addEventListener("click", () => {
    erasorStatus = !erasorStatus;
    isErasing = erasorStatus;
  
    // cursor change for brush and rubber
    if (erasorStatus) {
      document.getElementById('whiteboard-whiteboard').style.cursor = "url('/icons/erasor.png') 16 16, auto"; 
      eraserBtn.style.backgroundColor = "red"; 
    } else {
      document.getElementById('whiteboard-whiteboard').style.cursor = "url('/icons/brush.png') 5 16, auto";
      eraserBtn.style.backgroundColor = "white"; 
    }
  
    color = isErasing ? ERASER_COLOR : document.getElementById("colorPicker-whiteboard").value;
    size = isErasing ? eraserSize : parseInt(document.getElementById("brushSize-whiteboard").value);
});

function drawLine(x1, y1, x2, y2, color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    if (isErasing) {
        ctx.fillStyle = ERASER_COLOR;
        ctx.beginPath();
        ctx.arc(x2, y2, eraserSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// save canvas
document.getElementById("saveCanvas-whiteboard").addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// save canvas state
window.addEventListener("beforeunload", () => {
    localStorage.setItem("savedCanvas-whiteboard", canvas.toDataURL());
});

window.addEventListener("load", () => {
    const savedCanvas = localStorage.getItem("savedCanvas-whiteboard");
    if (savedCanvas) {
        const img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});

// text functionality
const addTextBtn = document.getElementById("addText-whiteboard");
const textInput = document.getElementById("textInput-whiteboard");
const textSizeInput = document.getElementById("textSize-whiteboard");
const textColorPicker = document.getElementById("textColorPicker-whiteboard");
let addingText = false;

addTextBtn.addEventListener("click", () => {
    if (!textInput.value.trim()) {
        alert("Please enter some text.");
        return;
    }
    addingText = true;
    canvas.style.cursor = "text";
});

canvas.addEventListener("click", (e) => {
    if (!addingText) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const text = textInput.value;
    const size = parseInt(textSizeInput.value) || 30;
    const color = textColorPicker.value;
    drawText(text, x, y, color, size);

    socket.emit("addText", { text, x, y, color, size });

    addingText = false;
    canvas.style.cursor = "default";
    textInput.value = "";
});

function drawText(text, x, y, color, size) {
    ctx.font = `${size}px Arial`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

// receive Text from Other Users
socket.on("addText", (data) => {
    drawText(data.text, data.x, data.y, data.color, data.size);
});




//---------------------------- SAve to desired location ----------------------------
//---------------------------- SAve to desired location ----------------------------
// save canvas to local
// document.getElementById("saveCanvas").addEventListener("click", async () => {
//     try {
//         const handle = await window.showSaveFilePicker({
//             suggestedName: "whiteboard.png",
//             types: [
//                 {
//                     description: "Image Files",
//                     accept: { "image/png": [".png"] },
//                 },
//             ],
//         });

//         const writable = await handle.createWritable();
//         const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
//         await writable.write(blob);
//         await writable.close();

//         alert("Whiteboard saved successfully!");
//     } catch (error) {
//         console.error("Save cancelled or failed:", error);
//     }
// });
//---------------------------- save to downloads directly ----------------------------
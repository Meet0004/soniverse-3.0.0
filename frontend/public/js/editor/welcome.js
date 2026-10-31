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
    ];

    particle.textContent = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
    Object.assign(particle.style, {
        position: 'absolute',
        fontSize: Math.random() * 8 + 8 + 'px',
        color: 'rgba(0, 200, 255, ' + (Math.random() * 0.5 + 0.1) + ')',
        fontFamily: 'monospace',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        transform: 'translate(-50%, -50%)',
        textShadow: '0 0 5px rgba(0, 200, 255, 0.8)',
        animation: `particle-animation-${Math.floor(Math.random() * 4) + 1} ${Math.random() * 20 + 15}s linear infinite`,
        pointerEvents: 'none'
    });

    container.appendChild(particle);
}

const style = document.createElement('style');
style.textContent = `
@keyframes particle-animation-1 {
  0% { transform: translate(-50%, -50%) translateY(0) translateX(0); opacity: 1; }
  50% { opacity: 0.5; }
  100% { transform: translate(-50%, -50%) translateY(-100vh) translateX(20vw); opacity: 0; }
}
@keyframes particle-animation-2 {
  0% { transform: translate(-50%, -50%) translateY(0) translateX(0); opacity: 1; }
  50% { opacity: 0.7; }
  100% { transform: translate(-50%, -50%) translateY(-100vh) translateX(-20vw); opacity: 0; }
}
@keyframes particle-animation-3 {
  0% { transform: translate(-50%, -50%) translateY(100vh) translateX(0); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 0.7; }
  100% { transform: translate(-50%, -50%) translateY(-100vh) translateX(30vw); opacity: 0; }
}
@keyframes particle-animation-4 {
  0% { transform: translate(-50%, -50%) translateY(100vh) translateX(0); opacity: 0; }
  20% { opacity: 0.5; }
  80% { opacity: 0.3; }
  100% { transform: translate(-50%, -50%) translateY(-100vh) translateX(-30vw); opacity: 0; }
}`;
document.head.appendChild(style);

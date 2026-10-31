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
const ERASER_COLOR = "#ffffff";

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
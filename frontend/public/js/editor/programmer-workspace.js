// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------
// ----------------------------------- Code Editor -----------------------------------

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
    c: `// C language ----------------\n\n#include <stdio.h>\n#include <string.h>\nint main() {\n    char str[] = "Hello Soniverse by C";\n    printf("%s", str);\nreturn 0;\n}`,
    cpp: `// C++ Language ---------------\n\n#include <iostream>\nint main() {\n    std::string str = "Hello Soniverse by C++";\n    std::cout << str;\nreturn 0;\n}`,
    java: `// Java Language ---------------\n\npublic class Main {\n    public static void main(String[] args) {\n        String str = "Hello Soniverse by Java";\n        System.out.println(str);\n    }\n}`,
    python: `# Python Language ------------\n\nprint("Hello Soniverse by Python")`,
    javascript: `// JavaScript Language ------------\n\nconsole.log("Hello Soniverse by JavaScript");`,
    dart: `// Dart Language ------------\n\nvoid main() {\n    print("Hello Soniverse by Dart");\n}`,
    typescript: `// TypeScript Language ------------\n\nconsole.log('Hello Soniverse by TypeScript');`,
    go: `// Go Language ------------\n\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello Soniverse by Go")\n}`,
    rust: `// Rust Language ------------\n\nfn main() {\n    println!("Hello Soniverse by Rust");\n}`,
    r: `# R Language ------------\n\nprint("Hello Soniverse by R")`,
    php: `<?php\n// PHP Language ------------\n\necho "Hello Soniverse by PHP";\n?>`,
    ruby: `# Ruby Language ------------\n\nputs "Hello Soniverse by Ruby"`,
    swift: `// Swift Language ------------\n\nimport Swift\n\nprint("Hello Soniverse by Swift")`,
    kotlin: `// Kotlin Language ------------\n\nfun main() {\n    println("Hello Soniverse by Kotlin")\n}`,

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

// Judge0 language IDs (subset — extend as needed)
const jdoodleLanguages = {
    c: { language: 'c', versionIndex: '5' },
    cpp: { language: 'cpp17', versionIndex: '1' },
    'c++': { language: 'cpp17', versionIndex: '1' },
    java: { language: 'java', versionIndex: '4' },
    python: { language: 'python3', versionIndex: '4' },
    javascript: { language: 'nodejs', versionIndex: '4' },
    php: { language: 'php', versionIndex: '4' },
    ruby: { language: 'ruby', versionIndex: '4' },
    swift: { language: 'swift', versionIndex: '4' },
    kotlin: { language: 'kotlin', versionIndex: '3' },
    go: { language: 'go', versionIndex: '4' },
    rust: { language: 'rust', versionIndex: '3' }
};

const executionApiUrl = '/api/execute';

async function executeWithJDoodle(config, script) {
    const response = await fetch(executionApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            script,
            language: config.language,
            versionIndex: config.versionIndex,
            stdin: enteredData.value || ''
        })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `HTTP error! Status: ${response.status}`);
    }

    return data;
}

async function compilation() {
    const status = document.getElementById("compile-status");
    const errorOutput = document.getElementById("error-output");
    const compilationTime = document.getElementById("compilation-time");

    const startTime = performance.now();

    status.innerText = "Compiling...";
    status.style.color = "black";
    errorOutput.innerText = "";
    compilationTime.innerText = "Calculating...";

    try {
        const language = document
            .getElementById("selected-lang-text")
            .innerText.trim().toLowerCase();

        const config = jdoodleLanguages[language];

        if (!config) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const data = await executeWithJDoodle(
            config,
            editorInstance.getValue()
        );

        const output = data.output || "";
        const error = data.error || "";

        // Some API responses explicitly provide compilationStatus.
        const compilationFailed =
            (data.compilationStatus !== undefined &&
                Number(data.compilationStatus) !== 0) ||
            Boolean(error) ||
            /compilation failed|compilation error|syntaxerror|error:/i.test(output);

        if (compilationFailed) {
            status.innerText = "Compilation Error!";
            status.style.color = "red";

            const message = error || output || "Compilation failed.";
            errorOutput.innerText = formatErrorMessage(message);

            const lineNumber = extractErrorLine(message);
            if (lineNumber) {
                highlightErrorLine(lineNumber);
            }
        } else {
            status.innerText = "Executed successfully!";
            status.style.color = "green";
            errorOutput.innerText = "";

            // Display program output if you have an output element.
            const outputElement = document.getElementById("output");
            if (outputElement) {
                outputElement.innerText = output || "Program executed with no output.";
            }
        }
    } catch (error) {
        console.error("Compilation/execution error:", error);

        status.innerText = "Execution failed!";
        status.style.color = "red";
        errorOutput.innerText = error.message || "An unexpected error occurred.";
    } finally {
        compilationTime.innerText =
            `${(performance.now() - startTime).toFixed(2)} ms`;
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
    
    
    const language = document.getElementById('selected-lang-text').innerText.toLowerCase();
    const config = jdoodleLanguages[language];

    if (!config) {
        output.innerText = 'Unsupported language for execution';
        return;
    }
    
    try {
        const data = await executeWithJDoodle(config, code);
        const executionTime = (performance.now() - startTime).toFixed(2) + " ms";

        output.innerText = data.error || data.output || 'No output';
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

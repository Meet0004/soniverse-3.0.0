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



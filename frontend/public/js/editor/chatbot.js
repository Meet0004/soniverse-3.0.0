const chatMessagesAI = document.getElementById('chat-messages-AI');
const messageInputAI = document.getElementById('message-input-AI');
const sendButtonAI = document.getElementById('send-button-AI');
const modelSelectAI = document.getElementById('model-select-AI');
const configStatusAI = document.getElementById('ai-config-status-AI');
const chatHistoryAI = [];

const MAX_HISTORY_MESSAGES_AI = 20;
let isWaitingAI = false;

function addMessageAI(text, isUser, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-AI ${isUser ? 'user-message-AI' : 'ai-message-AI'}${isError ? ' error-message-AI' : ''}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content-AI';
    messageContent.textContent = text;

    messageDiv.appendChild(messageContent);
    chatMessagesAI.appendChild(messageDiv);
    chatMessagesAI.scrollTop = chatMessagesAI.scrollHeight;
    return messageContent;
}

function showTypingIndicatorAI() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-AI ai-message-AI typing-AI';
    typingDiv.id = 'typing-indicator-AI';
    typingDiv.setAttribute('aria-label', 'Assistant is responding');

    const typingContent = document.createElement('div');
    typingContent.className = 'message-content-AI';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'typing-dot-AI';
        typingContent.appendChild(dot);
    }

    typingDiv.appendChild(typingContent);
    chatMessagesAI.appendChild(typingDiv);
    chatMessagesAI.scrollTop = chatMessagesAI.scrollHeight;
}

function removeTypingIndicatorAI() {
    document.getElementById('typing-indicator-AI')?.remove();
}

function appendInlineMarkdownAI(parent, text) {
    const markdownPattern = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g;
    let position = 0;

    for (const match of text.matchAll(markdownPattern)) {
        parent.append(document.createTextNode(text.slice(position, match.index)));

        const token = match[0];
        const isCode = token.startsWith('`');
        const isBold = token.startsWith('**') || token.startsWith('__');
        const element = document.createElement(isCode ? 'code' : isBold ? 'strong' : 'em');
        const markerLength = isCode ? 1 : isBold ? 2 : 1;
        element.textContent = token.slice(markerLength, -markerLength);
        parent.appendChild(element);
        position = match.index + token.length;
    }

    parent.append(document.createTextNode(text.slice(position)));
}

function getMarkdownTableCellsAI(line) {
    return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
}

function isMarkdownTableDividerAI(line) {
    const cells = getMarkdownTableCellsAI(line);
    return cells.length > 1 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
}

function renderAssistantMarkdownAI(container, markdown) {
    const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
    const fragment = document.createDocumentFragment();
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];
        if (!line.trim()) {
            index++;
            continue;
        }

        const codeFence = line.match(/^\s*```/);
        if (codeFence) {
            const codeLines = [];
            index++;
            while (index < lines.length && !/^\s*```/.test(lines[index])) {
                codeLines.push(lines[index++]);
            }
            if (index < lines.length) index++;

            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = codeLines.join('\n');
            pre.appendChild(code);
            fragment.appendChild(pre);
            continue;
        }

        const heading = line.match(/^\s{0,3}(#{1,3})\s+(.+?)\s*#*\s*$/);
        if (heading) {
            const element = document.createElement(`h${heading[1].length + 2}`);
            appendInlineMarkdownAI(element, heading[2]);
            fragment.appendChild(element);
            index++;
            continue;
        }

        if (/^\s{0,3}(---+|___+|\*\*\*+)\s*$/.test(line)) {
            fragment.appendChild(document.createElement('hr'));
            index++;
            continue;
        }

        if (line.includes('|') && index + 1 < lines.length && isMarkdownTableDividerAI(lines[index + 1])) {
            const headers = getMarkdownTableCellsAI(line);
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            headers.forEach(text => {
                const cell = document.createElement('th');
                appendInlineMarkdownAI(cell, text);
                headerRow.appendChild(cell);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            index += 2;
            while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
                const cells = getMarkdownTableCellsAI(lines[index]);
                const row = document.createElement('tr');
                headers.forEach((_, cellIndex) => {
                    const cell = document.createElement('td');
                    appendInlineMarkdownAI(cell, cells[cellIndex] || '');
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
                index++;
            }
            table.appendChild(tbody);

            const wrapper = document.createElement('div');
            wrapper.className = 'markdown-table-AI';
            wrapper.appendChild(table);
            fragment.appendChild(wrapper);
            continue;
        }

        const listItem = line.match(/^\s*([-*+]|\d+\.)\s+(.+)$/);
        if (listItem) {
            const ordered = /^\d/.test(listItem[1]);
            const list = document.createElement(ordered ? 'ol' : 'ul');
            while (index < lines.length) {
                const item = lines[index].match(/^\s*([-*+]|\d+\.)\s+(.+)$/);
                if (!item || /^\d/.test(item[1]) !== ordered) break;
                const element = document.createElement('li');
                appendInlineMarkdownAI(element, item[2]);
                list.appendChild(element);
                index++;
            }
            fragment.appendChild(list);
            continue;
        }

        const paragraphLines = [line.trim()];
        index++;
        while (index < lines.length && lines[index].trim() &&
            !/^\s{0,3}(#{1,3}\s|```|---+$|___+$|\*\*\*+$)/.test(lines[index]) &&
            !(lines[index].includes('|') && index + 1 < lines.length && isMarkdownTableDividerAI(lines[index + 1])) &&
            !/^\s*([-*+]|\d+\.)\s+/.test(lines[index])) {
            paragraphLines.push(lines[index++].trim());
        }
        const paragraph = document.createElement('p');
        appendInlineMarkdownAI(paragraph, paragraphLines.join(' '));
        fragment.appendChild(paragraph);
    }

    container.replaceChildren(fragment);
}

function setWaitingAI(waiting) {
    isWaitingAI = waiting;
    sendButtonAI.disabled = waiting;
    sendButtonAI.textContent = waiting ? 'Thinking…' : 'Send';
    messageInputAI.disabled = waiting;
}

function resizeMessageInputAI() {
    messageInputAI.style.height = 'auto';
    messageInputAI.style.height = `${Math.min(messageInputAI.scrollHeight, 150)}px`;
}

async function checkAIConfiguration() {
    try {
        const response = await fetch('/api/chatbot/status');
        if (!response.ok) throw new Error(`Status check failed (${response.status})`);

        const status = await response.json();
        configStatusAI.textContent = status.configured ? 'Ready' : 'API key missing';
        configStatusAI.classList.toggle('configured-AI', status.configured);
        configStatusAI.classList.toggle('unconfigured-AI', !status.configured);
    } catch {
        configStatusAI.textContent = 'Server unavailable';
        configStatusAI.classList.remove('configured-AI');
        configStatusAI.classList.add('unconfigured-AI');
    }
}

async function readAssistantStreamAI(response, onContent) {
    if (!response.body) {
        throw new Error('Streaming is not supported by this browser.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let reply = '';
    let streamError = null;
    let finished = false;

    function processLine(line) {
        if (!line.startsWith('data:')) return;

        const payload = line.slice(5).trim();
        if (payload === '[DONE]') {
            finished = true;
            return;
        }

        const event = JSON.parse(payload);
        if (event.error) {
            streamError = new Error(event.error);
            return;
        }

        if (typeof event.content === 'string') {
            reply += event.content;
            onContent(event.content);
        }
    }

    try {
        while (!finished) {
            const { value, done } = await reader.read();
            buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
            const lines = buffer.split(/\r?\n/);
            buffer = lines.pop() || '';
            lines.forEach(processLine);

            if (streamError) throw streamError;
            if (done) {
                if (buffer) processLine(buffer);
                break;
            }
        }
    } finally {
        reader.releaseLock();
    }

    if (streamError) throw streamError;
    if (!reply.trim()) throw new Error('The assistant returned an empty response.');
    return reply.trim();
}

async function sendToAIAssistant(message) {
    chatHistoryAI.push({ role: 'user', content: message });
    const historyStart = Math.max(0, chatHistoryAI.length - MAX_HISTORY_MESSAGES_AI);
    const messages = chatHistoryAI.slice(historyStart);
    let assistantMessage = null;
    setWaitingAI(true);
    showTypingIndicatorAI();

    try {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: modelSelectAI.value,
                messages
            })
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || `Request failed (${response.status})`);
        }

        removeTypingIndicatorAI();
        const aiResponse = await readAssistantStreamAI(response, (content) => {
            if (!assistantMessage) assistantMessage = addMessageAI('', false);
            assistantMessage.textContent += content;
            chatMessagesAI.scrollTop = chatMessagesAI.scrollHeight;
        });

        chatHistoryAI.push({ role: 'assistant', content: aiResponse });
        if (chatHistoryAI.length > MAX_HISTORY_MESSAGES_AI) {
            chatHistoryAI.splice(0, chatHistoryAI.length - MAX_HISTORY_MESSAGES_AI);
        }
        renderAssistantMarkdownAI(assistantMessage, aiResponse);
    } catch (error) {
        chatHistoryAI.pop();
        addMessageAI(error.message || 'The assistant request failed. Please try again.', false, true);
        checkAIConfiguration();
    } finally {
        removeTypingIndicatorAI();
        setWaitingAI(false);
        messageInputAI.focus();
    }
}

function handleSendAI() {
    if (isWaitingAI) return;

    const message = messageInputAI.value.trim();
    if (!message) return;

    addMessageAI(message, true);
    messageInputAI.value = '';
    resizeMessageInputAI();
    sendToAIAssistant(message);
}

function startNewChatAI() {
    if (isWaitingAI) return;
    chatHistoryAI.length = 0;
    chatMessagesAI.replaceChildren();

    const greeting = document.createElement('div');
    greeting.className = 'chat-welcome-AI';
    greeting.innerHTML = '<span class="welcome-mark-AI" aria-hidden="true">✦</span><h3>What are we building?</h3><p>Ask a question, explore an idea, or get help with your code.</p>';
    chatMessagesAI.appendChild(greeting);
}

sendButtonAI.addEventListener('click', handleSendAI);
messageInputAI.addEventListener('input', resizeMessageInputAI);
messageInputAI.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSendAI();
    }
});
document.getElementById('new-chat-button-AI').addEventListener('click', startNewChatAI);

checkAIConfiguration();

// Pharmaand Chatbot Widget
// Floating chat bubble with RAG-powered responses

const BACKEND_URL = "http://localhost:8000"; // Change to production URL after deployment

class PharmandChatbot {
    constructor() {
        this.isOpen = false;
        this.messageCount = 0;
        this.init();
    }

    init() {
        this.createBubble();
        this.createChatWindow();
        this.attachEventListeners();
    }

    createBubble() {
        // Create floating bubble button
        const bubble = document.createElement("div");
        bubble.id = "pharmaand-chat-bubble";
        bubble.innerHTML = "💬";
        bubble.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            z-index: 9999;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        `;

        bubble.addEventListener("mouseenter", () => {
            bubble.style.transform = "scale(1.1)";
            bubble.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.6)";
        });

        bubble.addEventListener("mouseleave", () => {
            bubble.style.transform = "scale(1)";
            bubble.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.4)";
        });

        bubble.addEventListener("click", () => this.toggleChat());

        document.body.appendChild(bubble);
        this.bubble = bubble;
    }

    createChatWindow() {
        // Create chat window
        const chatWindow = document.createElement("div");
        chatWindow.id = "pharmaand-chat-window";
        chatWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 400px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
            display: none;
            flex-direction: column;
            z-index: 9998;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        `;

        // Header
        const header = document.createElement("div");
        header.style.cssText = `
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 16px;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Pharmaand Assistant</h3>
                <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Ask me anything!</p>
            </div>
            <button id="close-chat" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0;">×</button>
        `;

        // Messages container
        const messagesContainer = document.createElement("div");
        messagesContainer.id = "chat-messages";
        messagesContainer.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background: #f8f9fa;
        `;

        // Input area
        const inputArea = document.createElement("div");
        inputArea.style.cssText = `
            padding: 12px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
        `;

        const input = document.createElement("input");
        input.id = "chat-input";
        input.type = "text";
        input.placeholder = "Type your question...";
        input.style.cssText = `
            flex: 1;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        `;

        input.addEventListener("focus", () => {
            input.style.borderColor = "#10b981";
        });

        input.addEventListener("blur", () => {
            input.style.borderColor = "#d1d5db";
        });

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.sendMessage();
            }
        });

        const sendBtn = document.createElement("button");
        sendBtn.innerHTML = "Send";
        sendBtn.style.cssText = `
            padding: 10px 16px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.3s;
        `;

        sendBtn.addEventListener("mouseenter", () => {
            sendBtn.style.background = "#059669";
        });

        sendBtn.addEventListener("mouseleave", () => {
            sendBtn.style.background = "#10b981";
        });

        sendBtn.addEventListener("click", () => this.sendMessage());

        inputArea.appendChild(input);
        inputArea.appendChild(sendBtn);

        chatWindow.appendChild(header);
        chatWindow.appendChild(messagesContainer);
        chatWindow.appendChild(inputArea);

        document.body.appendChild(chatWindow);

        this.chatWindow = chatWindow;
        this.messagesContainer = messagesContainer;
        this.inputField = input;

        // Close button handler
        document.getElementById("close-chat").addEventListener("click", () => this.toggleChat());

        // Add welcome message
        this.addMessage("assistant", "👋 Hello! I'm the Pharmaand Assistant. How can I help you today?");
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatWindow.style.display = this.isOpen ? "flex" : "none";

        if (this.isOpen) {
            this.inputField.focus();
        }
    }

    addMessage(sender, content) {
        const messageDiv = document.createElement("div");
        messageDiv.style.cssText = `
            margin: 12px 0;
            display: flex;
            ${sender === "user" ? "justify-content: flex-end;" : "justify-content: flex-start;"}
        `;

        const messageBubble = document.createElement("div");
        messageBubble.style.cssText = `
            max-width: 70%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
            ${sender === "user" 
                ? "background: #10b981; color: white; border-radius: 12px 12px 0 12px;" 
                : "background: white; color: #333; border: 1px solid #e5e7eb; border-radius: 12px 12px 12px 0;"}
        `;

        messageBubble.innerHTML = content;
        messageDiv.appendChild(messageBubble);
        this.messagesContainer.appendChild(messageDiv);

        // Auto-scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        this.messageCount++;
    }

    async sendMessage() {
        const question = this.inputField.value.trim();

        if (!question) return;

        // Add user message
        this.addMessage("user", question);
        this.inputField.value = "";

        // Show typing indicator
        this.addMessage("assistant", "<span style='opacity: 0.7;'>Thinking...</span>");

        try {
            const response = await fetch(`${BACKEND_URL}/ask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: question }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Remove typing indicator
            const messages = this.messagesContainer.querySelectorAll("div");
            if (messages.length > 0) {
                messages[messages.length - 1].remove();
            }

            // Add bot response
            let answerHTML = data.answer;

            if (data.sources && data.sources.length > 0) {
                answerHTML += `<br><br><small style="opacity: 0.7; font-size: 12px;">📚 Sources: ${data.sources.join(", ")}</small>`;
            }

            this.addMessage("assistant", answerHTML);
        } catch (error) {
            // Remove typing indicator
            const messages = this.messagesContainer.querySelectorAll("div");
            if (messages.length > 0) {
                messages[messages.length - 1].remove();
            }

            console.error("Error:", error);
            this.addMessage(
                "assistant",
                "Sorry, I encountered an error. Please make sure the backend is running and try again."
            );
        }
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        new PharmandChatbot();
    });
} else {
    new PharmandChatbot();
}

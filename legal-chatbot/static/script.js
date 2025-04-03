async function askChatbot() {
    const questionInput = document.getElementById("question");
    const chatBox = document.getElementById("chat-box");

    if (!questionInput.value.trim()) {
        alert("Please enter a question.");
        return;
    }

    const userMessage = document.createElement("p");
    userMessage.classList.add("user-message");
    userMessage.innerText = "You: " + questionInput.value;
    chatBox.appendChild(userMessage);

    try {
        const res = await fetch("/chat", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: questionInput.value }),
        });

        if (!res.ok) {
            throw new Error("Failed to get a response.");
        }

        const data = await res.json();
        const botMessage = document.createElement("p");
        botMessage.classList.add("bot-message");
        botMessage.innerText = "Bot: " + (data.response || "No response received.");
        chatBox.appendChild(botMessage);
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching response.");
    }

    questionInput.value = "";
}

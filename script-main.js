document.querySelector("#chatbot-btn").addEventListener("click", () => {
    document.querySelector(".chatbot-container").classList.toggle("hidden");
});

document.querySelector("#close-chatbot").addEventListener("click", () => {
    document.querySelector(".chatbot-container").classList.toggle("hidden");
});

document.getElementById("send-btn").addEventListener("click", async () => {
    let inputField = document.getElementById("chatbot-input");
    let userMessage = inputField.value.trim(); 
    let messagesContainer = document.getElementById("chatbot-messages");

    if (userMessage !== "") { 
        messagesContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

        inputField.value = "";
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    try {
        let response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBEkaii4n13iqbYJaTcjKloO3BcS4SR9_k", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Answer as briefly as possible without any text styling. ${userMessage}` }] }]
            })
        });

        let data = await response.json();
        let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
        
        const experts = [
            { name: "John Smith", field: "Sick People Care", profile: "profiles/index-profile.html" },
            { name: "Emily Davis", field: "Babysitters", profile: "profiles/index-profile.html" },
            { name: "Michael Brown", field: "Elderly Care", profile: "profiles/index-profile.html" }
        ];

        let suggestedExperts = experts.filter(expert => userMessage.toLowerCase().includes(expert.field.toLowerCase()));
        if (suggestedExperts.length > 0) {
            botReply += "<br><strong>Suggested Experts:</strong><ul>";
            suggestedExperts.forEach(expert => {
                botReply += `<li><a href="${expert.profile}" target="_blank">${expert.name} - ${expert.field}</a></li>`;
            });
            botReply += "</ul>";
        }

        messagesContainer.innerHTML += `<p><strong>AI:</strong> ${botReply}</p>`;

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

    } catch (error) {
        console.error("Error fetching AI response:", error);
        messagesContainer.innerHTML += `<p><strong>AI:</strong> Error retrieving response.</p>`;
    }
});

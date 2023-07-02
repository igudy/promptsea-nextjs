// components/Chatbot.js
import { useState } from "react"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState([])

  const handleToggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = async () => {
    if (message.trim() === "") return

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const { answer } = await response.json()

    setConversation([
      ...conversation,
      { role: "user", content: message },
      { role: "assistant", content: answer },
    ])
    setMessage("")
  }

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      <div className="chatbot-container">
        <div className="chat-header">
          <h3>Chatbot</h3>
          <button onClick={handleToggleChatbot}>
            {isOpen ? "Close" : "Open"}
          </button>
        </div>
        <div className="chat-messages">
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        {isOpen && (
          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chatbot

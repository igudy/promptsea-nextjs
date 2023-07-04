// components/Chatbot.js
import Image from "next/image"
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
          <Image
            src={"/assets/icons/chatgpt-icon.svg"}
            width={30}
            height={30}
          />
          <button
            onClick={handleToggleChatbot}
            className="font-satoshi font-medium"
          >
            {/* <h3 className="font-satoshi font-bold">Chat GPT</h3> */}
            {isOpen ? (
              <>
                {/* Close */}
                <Image
                  src={"/assets/icons/icons8-close.svg"}
                  width={20}
                  height={20}
                />
              </>
            ) : (
              <>
                {/* Open */}
                <Image
                  src={"/assets/icons/icons8-open.svg"}
                  width={20}
                  height={20}
                />
              </>
            )}
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
          <div className="flex mt-[-110px]">
            <input
              type="text"
              placeholder="Search Prompt..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 mx-[-53px] my-2 group transform translate-y-1 transition-transform duration-300  border-2 focus:border-orange-700 hover:border-orange-700 focus:outline-none drop-shadow-md hover:drop-shadow-xl border-orange-400 rounded-md"
            />
            <Image
              className="bg-orange-600 rounded-full w-10 h-10 mt-[14px] ml-[63px] drop-shadow-xl cursor-pointer hover:bg-orange-700 p-[4px]"
              src={"/assets/icons/send-svgrepo-com.svg"}
              width={30}
              height={30}
              onClick={handleSendMessage}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Chatbot

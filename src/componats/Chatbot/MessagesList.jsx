import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { FaUser, FaRobot } from "react-icons/fa";
import { addDoc, collection, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import MesssageInput from "./MesssageInput";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "text"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(fetchedMessages); // ✅ State Update হবে

      const lastMessage = fetchedMessages[fetchedMessages.length - 1];
      if (lastMessage && lastMessage.sender === "user" && lastMessage.id !== lastMessage.timestamp) {
        sendBotReply(lastMessage.text);
      }
    });

    return () => unsubscribe();
  }, []); // ✅ `useEffect` শুধুমাত্র একবার রান হবে

  const sendBotReply = async (userText) => {
    if (!userText) return;

    let replyText = "Sorry, I don't understand.";
    if (userText.toLowerCase().includes("hello")) {
      replyText = "Hi there! How can I help you?";
    } else if (userText.toLowerCase().includes("how are you")) {
      replyText = "I'm just a bot, but I'm doing great! 😊";
    } else if (userText.toLowerCase().includes("shop")) {
      replyText = "You can browse our shop at example.com/shop";
    }

    await addDoc(collection(db, "text"), {
      text: replyText,
      sender: "bot",
      timestamp: serverTimestamp(), // ✅ `serverTimestamp()` ব্যবহার করো
    });
  };
 
  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 min-h-screen shadow-lg rounded-lg">
    <h1 className="text-xl font-bold text-center mb-4">Chat with Bot</h1>
    <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-md h-[500px] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-2 ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.sender === "bot" && (
            <div className="bg-gray-200 p-2 rounded-full">
              <FaRobot className="text-gray-600" />
            </div>
          )}
          <div
            className={`p-3 rounded-lg shadow ${
              message.sender === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-900 rounded-bl-none"
            }`}
          >
            <p>{message.text}</p>
          </div>
          {message.sender === "user" && (
            <div className="bg-blue-500 p-2 rounded-full">
              <FaUser className="text-white" />
            </div>
          )}
        </div>
      ))}
      <div>
        <MesssageInput/>
      </div>
    </div>
  </div>
  );
};

export default MessagesList;

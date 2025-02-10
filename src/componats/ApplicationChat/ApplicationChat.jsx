import React, { useState,useEffect, useRef } from 'react'

const ApplicationChat = () => {
    const [messages, setMessages] =useState([]);
    const [input, setInput] = useState()
    const chatEndRef = useRef()
    const [predefinedMessages, setPredefinedMessages] = useState([
        { text: 'How can I help you?', sender: 'bot' },
        { text: 'Track my order', sender: 'bot' },
        { text: 'Customer support', sender: 'bot' },
        { text: 'Return a product', sender: 'bot' }
      ]);


    useEffect(() => {
        // Safely parse the messages from localStorage
        try {
          const savedMessages = localStorage.getItem('messages');
          if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
          }
        } catch (error) {
          console.error("Error parsing localStorage data: ", error);
          setMessages([]); // Set to an empty array if parsing fails
        }
      }, []);

      useEffect(()=>{
        chatEndRef.current?.scrollIntoView({behavior: 'smooth'})
      },[messages])

    //bot repaly function
    const botReply = (message) => {
        if (message.includes('hello')) {
            return 'Hi! How can I help you today?';
          } else if (message.includes('order')) {
            return 'Please provide your order number.';
          } 
          else if (message === 'How can I help you?') {
            return 'I am here to assist you with any queries!';
          } else if (message === 'Track my order') {
            return 'Please provide your order number for tracking.';
          } else if (message === 'Customer support') {
            return 'Our support team is available 24/7.';
          } else if (message === 'Return a product') {
            return 'Please provide the reason for returning the product.';
          } else {
            return 'Sorry, I didn’t understand that.';
          }
    }

    //handle predefind messages
    const handlePredefinedClick = (message) => {
        const userMessage = { text: message, sender: 'user' };
        const botResponse = { text: botReply(message), sender: 'bot' };
        const newMessages = [...messages, userMessage, botResponse];
        setMessages(newMessages);
        localStorage.setItem('messages', JSON.stringify(newMessages));
      };
 // send message function
 const sendMessage = () => {
    if(input.trim() !==''){
        const userMessage = {text:input, sender:'user'}
        const botMessages = {text:botReply(input), sender:'bot'}

        const newMessages = [...messages, userMessage, botMessages];
        setMessages(newMessages)
        localStorage.setItem('messages', JSON.stringify(newMessages))
        setInput('')
    }
 }
 const deletMessages = () => {
    localStorage.removeItem('messages')
    setMessages([])
 }

  return (
    <div  className="flex flex-col w-4/12 h-[400px] bg-gray-100 p-4">
    <div  className=" relative flex-grow  overflow-y-scroll p-4 bg-white rounded-lg shadow-md">
          {/* Display Predefined Messages */}
       <div  className=" grid justify-end  gap-2 mb-4">
          {predefinedMessages.map((message, index) => (
            <button
              key={index}
              onClick={() => handlePredefinedClick(message.text)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              {message.text}
            </button>
          ))}
        </div>
      {messages.map((message, index) => (
        <div ref={chatEndRef}  key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
          <div className={`max-w-xs p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            {message.text}
          </div>
        </div>
      ))}
     
    </div >
    <div className="flex mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg"
      />
      <button
        onClick={sendMessage}
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
      <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={deletMessages}>Delete</button>
    </div>
  </div>
  )
}

export default ApplicationChat
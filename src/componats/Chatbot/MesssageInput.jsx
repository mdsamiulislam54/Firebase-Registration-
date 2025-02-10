import React, { useState } from 'react'
import {db} from '../../firebase/firebase'
import { addDoc,collection,serverTimestamp,deleteDoc, getDocs } from 'firebase/firestore'

const MesssageInput = () => {

  const [text, setText] = useState('')

  const sendMessage  = async (e) => {
    e.preventDefault()
     if(!text.trim()) return;

     await addDoc (collection(db, "text" ),{
      text,
      timestamp:serverTimestamp(),
      sender: "user"
     })

     setText('') //clear input file
  }

const DeleteAllMessage = async () => {
  const querySnapshot = await getDocs(collection(db, "text"));
  querySnapshot.forEach(async (doc) => {
   await  deleteDoc(doc.ref);
  })
  setText([])
}
const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent new line on enter
    sendBotReply(text); // Trigger 1 bot reply on enter press
    setText(""); // Clear input after sending
  }
};

  return (
    <div>
        <div className=''>
          <form onSubmit={sendMessage}  className="flex gap-2 mt-4">
            <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
             className="border p-2 w-full"

            
            
            />
            <button type='submit' className="bg-blue-500 text-white px-4 py-2">Send</button>
            <button onClick={DeleteAllMessage} type='button' className='border-2 p-2'>Delete All</button>
          </form>
        </div>
    </div>
  )
}

export default MesssageInput
import React from 'react'
import Sidebar from '../components/Chat/Sidebar'
import Chat from '../components/Chat/Chat';
import '../components/Chat/style.css'

const ChatTest = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatTest
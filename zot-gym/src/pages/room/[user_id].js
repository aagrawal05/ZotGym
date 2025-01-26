'use client';

import { useRouter } from 'next/router'
 
import { useState, useEffect } from 'react'

import ChatBubble from '@/components/chatbubble'
import ChatBar from '@/components/chatbar'
import Profile from '@/components/profile'

import { fetchWithAuth } from '@/hooks/fetch'
import { checkAuth }  from '@/hooks/auth'

import { socket } from '@/socket'

export default function Room() {
  const router = useRouter()

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [checkedMessages, setCheckedMessages] = useState(false);
  const [user, setUser] = useState(null);
  const [recipientProfile, setRecipientProfile] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const handleMessageSend = (message) => {
      const timestamp = Date.now()
      const messageData = `S|${router.query.user_id}|${message}|${timestamp}`
      socket.send(messageData);

      setMessages(messages => [
          ...messages, 
          {
              isSender: true,
              message: message,
          }
      ])
      console.log(messages)
  }

  useEffect(() => {
     const asyncFetch = async () => {
        const userData = checkAuth(true)
        if (userData) {
            setUser(userData)

            const rid = window.location.href.split('/').at(-1)
            const profileData = await fetch('http://127.0.0.1:5000/users/' + rid)
                .then(res=>res.json())
            const processedData = {
                id: profileData[0][0],
                name: profileData[0][2],
                interests: profileData[0][5],
                avail: profileData[0][6],
                location: profileData[0][7],
                pfp: profileData[0][8],
                readonly: true
            };
            setRecipientProfile(processedData)
           
            const previousMessages = await fetch('http://127.0.0.1:5000/messages/' + 
                userData.id + '/' + 
                rid
            ).then(res => res.json())
            setMessages(previousMessages)
            setCheckedMessages(true)
        }
    }
    asyncFetch()
  }, [])

  useEffect(() => {
    if (user) {
      socket.send(`I|${user.id}`);
      setInitialized(true)
    }
  }, [user])

  useEffect(() => {
    if (router.isReady && router.query) {
       socket.addEventListener("message", (event) => {
            const parameters = event.data.split('|')
            switch (parameters[0]) {
                case "R":
                    if (parameters[1] == router.query.user_id) {
                        setMessages(messages => [
                          ...messages, 
                          {
                              isSender: false,
                              message: parameters[2],
                          }
                        ])
                        console.log(messages)
                    } else {}
                        // Show notification in sidebar
                    break
            }
        });
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
      if (recipientProfile && checkedMessages && initialized)
        setLoading(false);
  }, [recipientProfile, checkedMessages, initialized])

  return (
    <main className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-wrap content-center w-1/4 bg-white p-4 shadow-lg">
         <img className="w-24 h-24 my-5 mx-auto rounded-full border-4 transition-all duration-300 ease-in-out hover:shadow-xl"
          src={recipientProfile?.pfp ? recipientProfile.pfp : "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png"}
          alt={"Avatar"}
        />
          <h2 className="text-lg font-semibold text-gray-800 truncate text-center">{recipientProfile?.name}</h2>
          {/* Fill more information here about recipient or other dms */}
      </div>

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[90%]">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <ChatBubble key={index} {...message} />
          ))}
        </div>
      </div>
      <ChatBar handleSend={handleMessageSend} disabled={loading} />
    </main>
  );
}

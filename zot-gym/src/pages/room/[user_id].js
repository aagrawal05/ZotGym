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

            // const profileData = await fetch('http://localhost:3000/users/' + router.query.user_id)
            // setRecipientProfile(profileData.json())
            const profileData = {
                id: [2, 1][router.query.user_id-1],
                name: "Taiwanese Man",
                pfp: "bit.ly/dan-abramov"
            }
            setRecipientProfile(profileData)

            // insecure add auth middleware
            // const previousMessages = await fetch(
            //     'http://localhost:5000/messages?' + 
            //     new URLSearchParams({
            //         from_id: 1,
            //         to_id: 2,
            //     })
            // )
            // setMessages(previousMessages.json())

            const previousMessages = [
                {
                    isSender: true,
                    message: "hello!"
                },
                {
                    isSender: false,
                    message: "hey!"
                },
            ] 
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
    <div>
      <main>
          {/* <Profile {...recipientProfile} /> */}
          {/* row */}
          <div>
            {/* side bar with other dms */}
            <div>
            </div>
            {/* chat message container */}
            <div>{messages.map((message, index) => <ChatBubble key={index} {...message} />)}</div>
          </div>
          <ChatBar handleSend = {handleMessageSend} disabled={loading} />
      </main>
    </div>
  );
}


import React, { useEffect, useState } from 'react'
import UserCard from '../../components/UserCard'
import { FaSignOutAlt } from 'react-icons/fa'
import moment from 'moment'

const Web = () => {
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5050/socket')
        ws.onmessage = (event) => {
            setMessage(event.data)
        }

        // Log the WebSocket connection status
        ws.onopen = () => {
            console.log('WebSocket connected')
        }

        ws.onclose = () => {
            console.log('WebSocket disconnected')
        }

        // Return a cleanup function to close the WebSocket connection when the component unmounts
        return () => ws.close()
    }, [])


  


  

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5050/auth/getUsers')
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }


    useEffect(() => {
          const interval = setInterval(() => {
            fetchUsers()
          }, 1000)
          return () => clearInterval(interval)
        }, [])
        

    useEffect(() => {
        fetchUsers()
    }, [])



    return (
        <>
            <div className="flex-1 p-4">
                <h1 className="mb-3 text-2xl font-semibold">All Users</h1>

                <div className="flex flex-wrap gap-6">
                    {users?.map((user, index) => (
                        <UserCard
                            time={user?.time ? moment.unix(user.time).format('YYYY-MM-DD HH:mm:ss'):"-"}
                            username={user?.email}
                            signIn={user?.signIn}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Web

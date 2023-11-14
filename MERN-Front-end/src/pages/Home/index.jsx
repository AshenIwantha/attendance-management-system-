import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserCard from '../../components/UserCard'
import { LuNfc } from 'react-icons/lu'

const Home = () => {
    const history = useNavigate()

    const navigate = (url) => {
        history(url)
    }

    const isloggedIn = JSON.parse(localStorage.getItem('islogged')) // Parse the value to boolean

    useEffect(() => {
        if (!isloggedIn) {
            navigate(`/`)
        }
    }, [isloggedIn])
    const [rfidCardId, setRFIDCardId] = useState(null)

    const handleRFIDCardTap = (cardId) => {
        // Handle RFID card tap event
        console.log(`RFID Card tapped: ${cardId}`)
        setRFIDCardId(cardId)
        // Perform actions based on the RFID card ID, such as authentication, data retrieval, etc.
    }
    return (
        <>
            <div className="flex-1 p-4">
                <div className="mb-3 flex items-center">
                    <h1 className="mx-auto text-2xl font-semibold">
                        Please Tap RFID Card
                    </h1>
                    {/* <button
                        className="ml-auto flex w-fit items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-700"
                        onClick={() => handleRFIDCardTap('RFID123')}
                    >
                        <LuNfc className="mr-1" />
                        Tap RFID Card
                    </button> */}
                </div>
                {rfidCardId && <p>RFID Card ID: {rfidCardId}</p>}
                <div className="flex flex-wrap gap-6 justify-center">
                    <UserCard
                        key={'user.id'}
                        username={'user.username'}
                        time={'user.time'}
                    />
                </div>
            </div>
        </>
    )
}

export default Home

import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

const UserCard = ({ username, time, signIn }) => {
    return (
        <div
            className={`w-full max-w-[240px] rounded-md p-4 shadow-lg transition-all duration-300 ease-in-out ${
                signIn ? 'bg-green-500' : 'bg-white'
            }`}
        >
            <div className="mx-auto mb-3 grid aspect-square w-16 place-items-center rounded-full bg-slate-200 text-2xl text-slate-500">
                <FaUserAlt />
            </div>
            <div className="text-center">
                <h2
                    className={`font-semibold 
                    ${signIn ? 'text-[#fefefe]' : 'text-slate-700'}`}
                >
                    {username}
                </h2>
                <p
                    className={`text-sm font-medium 
                    ${signIn ? 'text-slate-100' : 'text-slate-500'}`}
                >
                    {time}
                </p>
            </div>
        </div>
    )
}

export default UserCard

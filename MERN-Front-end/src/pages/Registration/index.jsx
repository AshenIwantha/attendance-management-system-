import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa'
import moment from 'moment/moment'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
    const history = useNavigate()

    const navigate = (url) => {
        history(url)
    }
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        cardNo: '',
        role: '',
        time:moment().unix(),
        signIn: 0,
    })

    const [passwordToggle, setPasswordToggle] = useState(false)

    const handleTogglePassword = () => {
        setPasswordToggle(!passwordToggle)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

  

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                'http://localhost:5050/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        cardNo: formData.cardNo,
                        role: formData.role,
                        signIn: formData.signIn,
                    }),
                    
                }
            )

            if (response.ok) {
             
                toast.success("Registration successful!");
            } else {
                const errorMessage = await response.text()
            
                toast.error('Registration failed:',errorMessage);
            }
        } catch (error) {
         
            toast.error('Error during registration:', error);
        }
    }

    

    return (
        <>
       
            <div className="flex flex-1 flex-col items-center justify-center p-4">

            <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[360px] rounded-lg bg-white p-5 shadow-lg"
                >
                    <h1 className="mb-6 text-center text-2xl font-bold">
                        Login
                    </h1>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="mb-1 block w-full font-medium"
                        >
                            Email*
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full rounded border-slate-400 font-medium"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="mb-1 block w-full font-medium"
                        >
                            Password*
                        </label>
                        <div className="relative">
                            <input
                                type={passwordToggle ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className="w-full rounded border-slate-400 font-medium"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                onClick={handleTogglePassword}
                            >
                                {passwordToggle ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="cardNo"
                            className="mb-1 block w-full font-medium"
                        >
                            Card Number*
                        </label>
                        <input
                            type="number"
                            name="cardNo"
                            id="cardNo"
                            className="w-full rounded border-slate-400 font-medium"
                            value={formData.cardNo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="role"
                            className="mb-1 block w-full font-medium"
                        >
                            Role*
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    id="admin"
                                    className="mr-1"
                                    value={"admin"}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    id="student"
                                    className="mr-1"
                                    value={"user"}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="student">User</label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default Registration

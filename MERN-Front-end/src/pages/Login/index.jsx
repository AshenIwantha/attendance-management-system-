import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [error, setError] = useState(false)

    const handleTogglePassword = () => {
        setPasswordToggle(!passwordToggle)
    }

    const history = useNavigate()

    const navigate = (url) => {
        history(url)
    }

    const handleInputChange = (e) => {
        setError(false)
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    localStorage.clear()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5050/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            })

            if (response.ok) {
                console.log('Login successful!')
                setError(false)

                localStorage.setItem('islogged', true)

                const responseData = await response.json()

                localStorage.setItem('userRole', responseData.user.role)

                console.log(responseData)

                if (responseData.user.role == 'admin') {
                    navigate(`/admin`)
                } else {
                    navigate(`/home`)
                }
            } else {
                const errorMessage = await response.text()
                setError(true)
                console.error('Login failed:', errorMessage)
                // Handle login error, show an error message to the user, etc.
            }
        } catch (error) {
            console.error('Error during login:', error)
        }
    }

    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center p-4">
                <form
                    onSubmit={handleLogin}
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
                    {error && (
                        <small className="font-semibold text-red-500">
                            Invalid Email or Password! Try again.
                        </small>
                    )}
                    <button
                        type="submit"
                        className="mt-4 flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-700"
                    >
                        <FaSignInAlt className="mr-2" />
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login

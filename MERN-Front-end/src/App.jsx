import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components'

import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'

import Webss from './websocket'
import Registration from './pages/Registration'

function App() {
    const isloggedIn = localStorage.getItem('islogged')

    //   localStorage.getItem("islogged")
    return (
        <>
            <div className="flex min-h-screen flex-col bg-[#f1f1f1]">
                <Suspense fallback={'Loading...'}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Login />} />

                            <Route path="/home" element={<Home />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route
                                path="/registration"element={<Registration />}
                            />
                           
                        </Routes>
                    </Layout>
                </Suspense>
            </div>
        </>
    )
}

export default App

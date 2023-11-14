import React, { lazy } from 'react'
const Navbar = lazy(() => import('./Navbar/Navbar'))
const Footer = lazy(() => import('./Footer/Footer'))

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="container mx-auto flex flex-1 flex-col">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout

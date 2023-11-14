import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
    const history = useNavigate()

    const navigate = (url) => {
        history(url)
    }
    const handleLogout = () => {
        navigate(`/`)
    }
    const handleReg = () => {
        navigate(`/registration`)
    }

    //   localStorage.getItem("islogged")

    return (
        <>
            <header className="flex items-center bg-blue-500 px-8 py-4 text-[#fefefe] shadow-lg">
  <Link to={'/'} className="text-xl font-bold">
    Attendance Managment System
  </Link>
  <nav className="ml-auto flex items-center space-x-4">
    <ul className="m-0 list-none p-0 flex items-center">
      <li className="m-0 p-0">
        <button
          className="flex w-fit items-center justify-center rounded-lg border border-blue-400 bg-transparent px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-1 disabled:bg-blue-400"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </li>
    </ul>

    {localStorage.getItem('userRole') === 'admin' && (
      <button
        className="flex w-fit items-center justify-center rounded-lg border border-blue-400 bg-transparent px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-1 disabled:bg-blue-400"
        onClick={handleReg}
      >
        <FaSignOutAlt className="mr-2" />
        Register
      </button>
    )}
  </nav>
</header>

        </>
    )
}

export default Navbar

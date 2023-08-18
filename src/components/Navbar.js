import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './Navbar.css'
import React from 'react'

import icons8java from '../assets/icons8java.svg'

export default function Navbar() {
  const {user} = useAuthContext()
  const {logout , isPending} = useLogout()
  return (
    <div className='navbar'>
        <ul>
            <li className="logo">
                <img src={icons8java} alt='form logo'/>
                <span>Java Form</span>
            </li>
            {!user && (
              <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            </>
            )}
            {user &&(
            <li>
            {!isPending &&<button className="btn" onClick={logout}>Logout</button>}
            {isPending &&<button className="btn" disabled>Logging out...</button>}            
            </li>
            )}
        </ul>
    </div>
  )
}

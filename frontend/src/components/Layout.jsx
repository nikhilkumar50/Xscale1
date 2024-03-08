import React from 'react'
import NavBar from './NavBar'

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto min-h-screen '>
                
                <div className='grow'>
                    <NavBar />
                    <div className=''>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout
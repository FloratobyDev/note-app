
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAddAdminMutation } from '../store'

const RegisterAdmin = () => {

    const initialUserData = {
        username: "",
        email: "",
        adminkey: "",
        password: ""
    }

    const [addAdmin, addAdminResults] = useAddAdminMutation()

    const [userData, setUserData] = useState(initialUserData)
    const navigate = useNavigate()

    const handleUserData = event => {
        if (addAdminResults.isError) addAdminResults.reset()

        setUserData({
            ...userData,
            [event.target.id]: event.target.value
        })
    }

    const handleUserSubmit = event => {
        event.preventDefault()
        addAdmin(userData)
        setUserData(initialUserData)
    }

    useEffect(() => {
        if (addAdminResults.isSuccess) {
            navigate('/task')
        }
    }, [addAdminResults, navigate])

    return (
        <div className='flex relative w-screen h-screen overflow-hidden shadow-sm'>
            <img className='absolute' src="/login_background.jpeg" alt="" />
            <div className=' shadow-2xl shadow-black rounded-xl flex flex-col justify-center items-center z-10 ml-64 px-20 my-auto bg-gradient-to-t from-darkgreen '>
                <h1 className='flex flex-col items-center font-bold text-lg pb-20 pt-12 text-lightgreen'><span className=' font-adlery text-5xl tracking-widest'>Leaf Planner</span></h1>
                <form className='text-lightgreen flex flex-col w-full gap-y-8 ' onSubmit={handleUserSubmit}>
                    <div className='flex flex-col gap-x-2 gap-y-2'>
                        <label className=' text-lightgreen font-bold text-md tracking-widest' htmlFor="username">Username</label>
                        <input onChange={handleUserData} value={userData.username} className='outline-none border-l-8 border-lightgreen shadow-sm drop-shadow-sm shadow-lightgreen bg-transparent rounded-sm p-3' id='username' type="text" />
                    </div>
                    <div className='flex flex-col gap-x-2 gap-y-2'>
                        <label className=' text-lightgreen font-bold text-md tracking-widest' htmlFor="email">Email</label>
                        <input onChange={handleUserData} value={userData.email} className='outline-none border-l-8 border-lightgreen shadow-sm drop-shadow-sm shadow-lightgreen bg-transparent rounded-sm p-3' id='email' type="email" />
                    </div>
                    <div className='flex flex-col gap-x-2 gap-y-2'>
                        <label className=' text-lightgreen font-bold text-md tracking-widest' htmlFor="password">Password</label>
                        <input onChange={handleUserData} value={userData.password} className=' outline-none border-l-8 border-lightgreen shadow-sm drop-shadow-sm shadow-lightgreen bg-transparent rounded-sm p-3' id='password' type="password" />
                    </div>
                    <div className='flex flex-col gap-x-2 gap-y-2'>
                        <label className=' text-lightgreen font-bold text-md tracking-widest' htmlFor="password">Admin Key</label>
                        <input onChange={handleUserData} value={userData.adminkey} className=' outline-none border-l-8 border-lightgreen shadow-sm drop-shadow-sm shadow-lightgreen bg-transparent rounded-sm p-3' id='adminkey' type="password" />
                    </div>
                    <p className='text-center text-red-400 tracking-wider font-bold'>{addAdminResults.isError && addAdminResults.error.data}</p>

                    <div className='flex flex-col items-center gap-y-6 mb-7 text-lightgreen'>
                        <button className='hover:shadow-inner hover:shadow-black mt-4 bg-gradient-to-r from-lightgreen to-yellow-300 font-bold text-md text-green-800 border-1 border-green-200 w-8/12 mx-auto p-3 rounded-xl' type="submit">{addAdminResults.isLoading ? 'Loading' : 'Sign up'}</button>
                        <div className='flex items-center gap-x-2 text-lightgreen'>
                            <p className='text-sm'>Already have an account?</p>
                            <Link to='/login'><span className='font-bold underline'>Login</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterAdmin
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useValidateUserMutation } from '../store'

const Login = () => {

    const INITIAL_STATE = {
        username: "",
        password: ""
    }
    const [validateUser, validateUserResults] = useValidateUserMutation()

    const [userData, setUserData] = useState(INITIAL_STATE)
    const navigate = useNavigate()

  
    const handleUserData = event => {
        if (validateUserResults.isError) {
            validateUserResults.reset()
        }
        setUserData({
            ...userData,
            [event.target.id]: event.target.value
        })
    }

    const handleUserSubmit = event => {
        event.preventDefault()
        validateUser(userData)
        setUserData(INITIAL_STATE)
    }

    useEffect(() => {
        if (validateUserResults.isSuccess) {
            navigate('/task')
        }
    }, [validateUserResults, navigate])

    return (
        <div className='flex relative w-screen h-screen overflow-hidden shadow-sm'>
            <img className='absolute w-full h-full object-fill' src="/login_background.jpeg" alt="" />
            <div className=' shadow-2xl shadow-black rounded-xl flex flex-col justify-center items-center z-10 ml-64 px-20 my-auto bg-gradient-to-t from-darkgreen '>
                <h1 className='flex flex-col items-center font-bold text-lg pb-20 pt-10 text-lightgreen'><span className=' font-adlery text-5xl tracking-widest'>Leaf Planner</span></h1>
                <form className='flex flex-col w-full gap-y-8 ' onSubmit={handleUserSubmit}>
                    <div className='flex flex-col gap-x-2 gap-y-2'>
                        <label className=' text-lightgreen font-bold text-md tracking-widest' htmlFor="username">Username</label>
                        <input onChange={handleUserData} value={userData.username} className=' text-lightgreen outline-none border-l-8 border-lightgreen shadow-sm drop-shadow-sm shadow-lightgreen bg-transparent rounded-sm p-3' id='username' type="text" />
                    </div>
                    <div className='flex flex-col gap-x-2 gap-y-2'>
                        <label className=' text-lightgreen font-bold text-md tracking-widest' htmlFor="password">Password</label>
                        <input onChange={handleUserData} value={userData.password} className=' text-lightgreen outline-none border-l-8 border-lightgreen shadow-sm drop-shadow-sm shadow-lightgreen bg-transparent rounded-sm p-3' id='password' type="password" />
                    </div>
                    <p className='text-center text-red-400 tracking-wider font-bold'>{validateUserResults.isError && validateUserResults.error.data}</p>
                    <div className='flex flex-col items-center gap-y-6'>
                        <div className='flex w-full'>
                            <button className='hover:shadow-inner hover:shadow-black mt-4 bg-gradient-to-r from-lightgreen to-yellow-300 font-bold text-md text-green-800 border-1 border-green-200 w-8/12 mx-auto p-3 rounded-xl' type="submit">{validateUserResults.isLoading ? "Loading" : "Login"}</button>
                        </div>
                        <div className='flex items-center gap-x-2 text-lightgreen'>
                            <p className='text-sm'>No account yet ?</p>
                            <Link to='/register'><span className='font-bold underline'>Sign up</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
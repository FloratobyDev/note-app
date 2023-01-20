import { Outlet, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Panel = ({ xs, children }) => {
  let classes = classNames('mx-2 border-2 border-black rounded-md p-2', xs)
  return <div className={classes}>
    {children}
  </div>
}


function App() {


  const navigate = useNavigate()

  useEffect(() => {

    axios.get('/authenticate', {
      withCredentials: true
    })
      .then(() => {
        console.log("welcome")
      })
      .catch(err => {
        navigate('/login')
      })

  }, [navigate])

  // const isLogin = false;
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate('/login')
  //   }
  // }, [isLogin, navigate])

  return (

    <main className='flex flex-col h-screen px-64 py-28 gap-y-2'>
      <div className="flex h-full">
        <Panel xs='flex h-full w-2/12'>
          <div className='flex flex-col w-full gap-y-2'>
            <Link to='/task'>
              <button className='h-16 w-full border-2 border-black'>Tasks</button>
            </Link>
            <Link to='/calendar'>
              <button className='h-16 w-full border-2 border-black'>Calendar</button>
            </Link>
            <Link to='/achievements'>
              <button className='h-16 w-full border-2 border-black'>Achievements</button>
            </Link>
            <Link to='/profile'>
              <button className='h-16 w-full border-2 border-black'>Profile</button>
            </Link>
            <Link to='settings'>
              <button className='h-16 w-full border-2 border-black'>Settings</button>
            </Link>
          </div>
        </Panel>
        <Panel xs='w-screen'>
          <Outlet />
        </Panel>
      </div>
    </main>


  );
}

export default App;

import React, { useState, useRef, useEffect } from 'react'
import { useLazyFetchCalendarQuery } from '../../store'

const DayComponent = ({ day, currentDate }) => {

    const [trigger, result] = useLazyFetchCalendarQuery()
    const taskInfoRef = useRef()
    const [show, setShow] = useState(false)
    // console.log(lastPromiseInfo)

    useEffect(() => {

        let click = document.addEventListener('click', event => {
            if (!taskInfoRef.current) return;
            if (!taskInfoRef.current.contains(event.target)) {
                setShow(false)
            }
        })

        return () => {
            document.removeEventListener('click', click, true)
        }
    }, [])

    const handleDate = idx => {

        const day = parseInt(idx)
        const month = currentDate.get('month')
        const total = day + month + currentDate.get('year')
        trigger(total)
    }

    const handleShowFunction = showValue => e => {
        console.log('showing')
        setShow(showValue)
    }

    return (
        <div ref={taskInfoRef} className='select-none' onClick={handleShowFunction(!show)}>

            <div style={{ backgroundColor: (day === currentDate.get('date')) ? 'lightgreen' : 'transparent' }} key={day} onClick={() => {
                handleDate(day)
            }} className='relative break-words w-8/12 flex border-2 rounded-lg border-black'>
                <p className='p-2 text-xl'>{day}</p>
                {/* <p>Description of today</p> */}
                {(show) && <div className='absolute border border-black rounded-lg left-20 bg-white z-20 w-44 p-4'>
                    <p className='font-bold text-sm'>Task Completed</p>
                    {!result.data && <p>No task completed this day</p>}
                    {result.data?.map((task, idx) => {
                        return <p className='text-sm' key={idx}><span className='font-bold text-sm'>{task.difficulty}</span> {task.description}</p>
                    })}
                </div>}
            </div>
        </div>
    )
}

export default DayComponent
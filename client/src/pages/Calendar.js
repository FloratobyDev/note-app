import React from 'react'
import DayComponent from '../components/Calendar/DayComponent';
import dayjs from 'dayjs';
const Calendar = () => {

  const currentDate = new Date()
  const day = dayjs(currentDate)
  

  return (
    <div>
      <div className='flex justify-between px-[10%] mb-8'>
        <p className='text-center font-bold text-2xl'>{day.format('MMMM')}</p>
        <p className='text-center font-bold text-2xl'>{day.format('YYYY')}</p>
        {/* <p className='font-bold text-2xl'>{day.get('year')}</p> */}
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {
          Array(day.daysInMonth()).fill(0).map((_, idx) => {
            return <DayComponent day={idx} currentDate={day} />
          })
        }
      </div>
    </div>
  )
}

export default Calendar
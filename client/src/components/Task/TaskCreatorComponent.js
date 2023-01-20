import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import useGetQuoteHook from '../../hooks/useGetQuoteHook'
import { useAddTaskMutation, useFetchTaskQuery, useRemoveTaskMutation, useUpdateTaskMutation } from '../../store/apis/tasksApi'
import { Dropdown } from '../Generic/Dropdown'
import { useFetchCategoryQuery } from '../../store'
import { nanoid } from '@reduxjs/toolkit'


const TaskCreatorComponent = ({ tasks, onSave }) => {

    const [addTask, addTaskResults] = useAddTaskMutation()
    const [removeTask, removeTaskResults] = useRemoveTaskMutation()
    const fetchCategoryResults = useFetchCategoryQuery()
    const fetchTaskResults = useFetchTaskQuery()

    const [difficulty, setDifficulty] = useState(1)


    const TASK_INITIAL_VALUE = {
        description: "",
        category: "Exercise",
        completed: false
    }

    const [currentTask, setCurrentTask] = useState(TASK_INITIAL_VALUE)
    let categoryList = []
    const [category, setCategory] = useState()
    const { quoteInfo } = useGetQuoteHook()

    const [updateTask, updateTaskResults] = useUpdateTaskMutation()

    useEffect(() => {
        setCurrentTask((previousTask) => {
            return {
                ...previousTask,
                category: category
            }
        })
    }, [category, setCurrentTask])

    /**
     * @description Handles the creation of task.
     * @param {*} event 
     */
    
    const handleAddTask = event => {
        if (currentTask.description.length > 0) {
            setCurrentTask(TASK_INITIAL_VALUE)
            const date = new Date()

            addTask({
                ...currentTask,
                createdAt: date.toISOString(),
                isStale: false,
                difficulty: difficulty,
                taskID: nanoid()
            })
        }
    }

    /**
     * @description Handles the events when the user types something in the input linked to one of currentTasks' field.
     * @param {*} event 
     */

    const handleTaskChange = event => {
        setCurrentTask({
            ...currentTask,
            [event.target.id]: event.target.value
        })
    }

    /**
     * @description Handles the deletion of a task.
     * @param {*} index 
     */

    const handleRemoveTask = (task) => {
        removeTask(task)
    }

    const handleUpdateTask = (task, renew) => {
        updateTask({
            ...task,
            renew: renew
        })
    }

    if (fetchCategoryResults.isLoading) return <p>Loading categories</p>

    if (fetchCategoryResults.isSuccess) {
        categoryList = fetchCategoryResults.data
    }

    const handleDifficulty = () => {
        const value = ((difficulty) % 5) + 1
        setDifficulty(value)
    }

    return (
        <div className='flex flex-col-reverse h-full w-full'>

            <div className=' h-full bg-green-600 saturate-50 p-4 rounded-lg overflow-y-scroll'>
                {(fetchTaskResults.data?.length || 0) > 0 ? fetchTaskResults.data?.map((task, idx) => {
                    return <div className=' select-none mb-2 bg-green-200 shadow-sm shadow-black flex gap-x-2 pl-3 justify-between items-center border border-green-900 contrast-125 border-l-8 rounded-lg overflow-hidden' key={idx}>

                        <div className='flex items-center gap-x-4'>
                            <div className='border-2 rounded-full border-darkgreen px-2'>
                                <p className='text-sm font-bold text-darkgreen'>{task.difficulty}</p>
                            </div>
                            <p className=' tracking-wider'>{task.description}</p>
                        </div>
                        <div className='flex items-center text-lg justify-between w-6/12'>
                            <p className='capitalize text-sm italic tracking-widest'>{task.category}</p>
                            <div className='flex'>
                                {task.isStale && <p onClick={() => { handleUpdateTask(task, true) }} className='flex items-center hover:text-white hover:bg-blue-400 px-2 cursor-pointer'>
                                    <span className=''>Renew</span>
                                </p>}

                                <span onClick={() => { handleUpdateTask(task, false) }} className='hover:bg-green-400 hover:text-white h-full p-2 cursor-pointer'>
                                    <AiOutlineCheck className='text-2xl' />
                                </span>
                                <span onClick={() => { handleRemoveTask(task) }} className='hover:bg-red-400 hover:text-white h-full p-2 cur'>
                                    <AiOutlineClose className='text-2xl' />
                                </span>
                            </div>
                        </div>
                    </div>
                }) :
                    <div className='flex flex-col gap-2 justify-center items-center w-full h-full'>
                        <p className='text-white text-xl w-8/12 text-center'>{quoteInfo.content}</p>
                        <p className='text-white italic text-sm w-8/12 text-center'>{quoteInfo.author}</p>
                    </div>
                }
            </div>
            <div className='flex items-center mb-2 saturate-50 pl-2 text-green-200 bg-green-600 rounded-lg'>
                <input id='description' className='border-x-2 my-2 p-2 rounded-lg border-green-200 w-5/12 mr-2 outline-none bg-transparent placeholder:text-green-200 placeholder:tracking-wider text-green-200' onChange={handleTaskChange} value={currentTask.description} type="text" placeholder='Type your task here...' />
                <div className='flex gap-x-2 w-7/12 justify-end'>
                    <div onClick={handleDifficulty} className='flex border-2 border-lightgreen rounded-full my-1 px-3'>
                        <button className='font-bold text-lg'>{difficulty}</button>
                    </div>
                    <Dropdown category={category} setCategory={setCategory} categories={categoryList} />
                    <button className='hover:bg-green-500 hover:text-white p-3' onClick={handleAddTask} type="submit">Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCreatorComponent
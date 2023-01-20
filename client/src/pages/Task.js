import React, { useEffect, useState } from 'react'
import TaskCreatorComponent from '../components/Task/TaskCreatorComponent'
import { useAddTaskMutation } from '../store'

/**
 * PROBLEMS: 
 *  How to structure the data model for task. 
 *  
 * 
 *    
 * 
 */

const Task = () => {

    const currentDate = new Date()

    const [addTask, addTaskResults] = useAddTaskMutation()

    const INITIAL_VALUE = {
        titleDescription: "",
        taskData: [],
        dateCreated: ""
    }

    const [taskList, setTaskList] = useState(INITIAL_VALUE)

    useEffect(() => {

    }, [])

    const taskSaveHandler = tasks => {
        const compiledTask = {
            ...taskList,
            titleDescription: tasks.title,
            taskData: tasks.data,
            dateCreated: currentDate.toISOString().substring(0, 10)
        }
        addTask(compiledTask)
        setTaskList(compiledTask)
    }

    if (addTaskResults.isLoading) return <p>Loading...</p>

    return (
        <div className='h-full'>
            <div className='relative flex h-full w-full'>
                <TaskCreatorComponent tasks={taskList} onSave={taskSaveHandler} />
            </div>
        </div>
    )
}

export default Task
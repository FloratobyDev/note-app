import { useEffect, useState, useRef } from "react"
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { useAddCategoryMutation, useFetchCategoryQuery, useRemoveCategoryMutation } from "../../store"

export const Dropdown = ({ category, setCategory, categories }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [categoryList, setCategoryList] = useState(categories)
    const [newCategory, setNewCategory] = useState("")
    const dropdownRef = useRef()

    const [addCategory, addCategoryResults] = useAddCategoryMutation()
    const [removeCategory, removeCategoryResults] = useRemoveCategoryMutation()

    useEffect(() => {

        let click = document.addEventListener('click', (event) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        })

        return () => {
            document.removeEventListener('click', click, true)
        }

    }, [])

    const showOptions = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = event => {
        setCategory(event.currentTarget.textContent)
        setIsOpen(false)
    }



    return (
        <div data-value="value" className='my-auto z-10 relative w-48 select-none' ref={dropdownRef}>
            <div className='p-2 px-4 rounded-lg cursor-pointer'>
                <p className='capitalize cursor-pointer flex flex-row items-center justify-between font-semibold text-sm' onClick={showOptions}>{category || "Select category"} <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span></p>
            </div>
            {isOpen && <div className='absolute w-full p-2 border-2 rounded-lg bg-white border-black mt-2 cursor-pointer'>
                <div className="text-black flex gap-x-2">
                    <input onChange={event => {
                        setNewCategory(event.target.value)
                    }} value={newCategory} className="border-2 border-black w-11/12 px-2 rounded-lg" type="text" placeholder="Add category" />
                    <button onClick={() => {
                        if (newCategory.length > 0) {
                            setCategoryList(prevCategory => [...prevCategory, newCategory])
                            addCategory({ category: newCategory })
                            setNewCategory('')
                        }
                    }} className="p-1 border-2 rounded-md border-black">+</button>
                </div>
                {categoryList.length <= 0 && <p className="text-black p-2 py-4 text-center font-bold text-sm">No categories</p>}
                {categoryList.map(options => {
                    return <p onClick={handleOptionClick} key={options} className='capitalize hover:bg-gray-200 cursor-pointer font-semibold text-sm text-black text-center p-2 '>{options}</p>
                })}
            </div>}
        </div>
    )
}
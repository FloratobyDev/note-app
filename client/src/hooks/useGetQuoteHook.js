import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGetQuoteHook = () => {

    const [quoteInfo, setquoteInfo] = useState("")

    useEffect(() => {
        axios.get('https://api.quotable.io/random?tags=motivational')
            .then(response => {
                setquoteInfo(response.data)
            })
    }, [])

    return { quoteInfo }
}

export default useGetQuoteHook
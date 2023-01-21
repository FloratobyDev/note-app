import React from 'react'

import { useAuthenticateAdminQuery } from '../store'
import { Link } from 'react-router-dom'

const AchievementInfo = () => {

    const { error, isError, isLoading } = useAuthenticateAdminQuery()

    if (isLoading) return <p>Authenticating...</p>

    if (isError) return <div>
        <p>{error.data}</p>
        <Link to='/login'>Return to login</Link>
    </div>

    return (
        <div>AchievementInfo</div>
    )
}

export default AchievementInfo
import React from "react"

export default function Dashboard() {
    React.useEffect(() => {
        if(!localStorage.getItem('auth_token')) {
            location.href = '/login'
        }
    })
    return (
        <>
            <h1> Dashboard </h1>
        </>
    )
}
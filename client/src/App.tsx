import { useEffect } from 'react'

function App() {
  useEffect(() => {
    if(localStorage.getItem("auth_token")) {
      location.href = '/dashboard'
    } else {
      location.href = '/home'
    }
  })
  return (
    <>
      <h1> Welcome to webmonitor, you will be redirected soon. </h1>
    </>
  )
}

export default App

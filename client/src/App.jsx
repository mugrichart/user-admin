import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Welcome from './welcome-page/Welcome'
import NewUser from './new-user-page/NewUser'
import Users from './users/Users'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="new-user" element={<NewUser />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App

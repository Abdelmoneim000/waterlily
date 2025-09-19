import Form from './Pages/Form'
import './App.css'
import { FormProvider } from './hooks/FormContext'
// start using react router dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { AuthProvider } from './hooks/AuthContext'


function App() {

  return (
    <AuthProvider>
      <FormProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </FormProvider>
    </AuthProvider>
  )
}

export default App

import { useState } from 'react'
import './App.css';
import Contact from './components/Contact';
import ContactForm from './components/ContactForm';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Contact />
      <ContactForm />
    </>
  )
}

export default App;

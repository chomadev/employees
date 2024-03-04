import Employees from './pages/employees'

function App() {
  const apiURL = import.meta.env.VITE_API_URL

  return (
    <>
      {!apiURL
        ? <div className='text-center'>
          <h1 className='text-4xl m-4'>Settings missing</h1>
          <p>Create a .env file in the root folder, and add variable "VITE_API_URL", with the full API URL <br /> (ex: VITE_API_URL="https://localhost:7058/")</p>
        </div>
        :
        <div className='container'>
          <Employees />
        </div>
      }
    </>
  )
}

export default App

import { Outlet } from "react-router-dom"


function App() {

  return (
    <>
      <div className="h-screen w-screen bg-black flex justify-center items-center">
        <div className="w-full h-full bg-slate-800 flex rounded-xl overflow-hidden ">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App

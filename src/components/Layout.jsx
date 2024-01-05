import SideBarLayout from "./sideBar/SideBarLayout"
import MainLayout from "./main/MainLayout"
import { Outlet } from "react-router-dom"


function App() {

    return (
        <>
            <div className="h-screen w-screen bg-black flex justify-center items-center">
                <div className="w-full h-full bg-slate-800 flex rounded-xl overflow-hidden">
                    <div className="w-1/3 h-full max-sm:hidden">
                    <SideBarLayout />
                    </div>
                    <MainLayout />
                </div>
            </div>
        </>
    )
}

export default App

import SideBarLayout from "./sideBar/SideBarLayout"
import MainLayout from "./main/MainLayout"


function App() {

    return (
        <>
            <div className="h-screen w-screen bg-black flex justify-center items-center">
                <div className="w-full h-full bg-slate-800 flex rounded-xl overflow-hidden">
                    <div className="w-1/3 h-full max-sm:w-0">
                        <SideBarLayout />
                    </div>
                    <div className="w-2/3 h-full max-sm:w-full">
                        <MainLayout />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App

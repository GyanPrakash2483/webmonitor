import WMButton from "./WMButton"

function NavBtn(prop: {
    text: string,
    url: string,
    className?: string,
}) {
    return (
        <button onClick={() => {
            location.href = prop.url
        }} className={prop.className}>
            {prop.text}
        </button>
    )
}

export default function Navbar() {
    return (
        <>
            <div className="flex w-screen justify-around items-center p-4 max-md:justify-between">
                <h1 className="text-white font-bold text-3xl select-none">
                    Webmonitor
                </h1>

                <nav className="flex justify-around items-center w-3xl max-md:hidden text-white">
                    <NavBtn text="HOME" url="/home" />
                    <NavBtn text="ABOUT" url="/about" />
                    <NavBtn text="OFFERINGS" url="/offerings" />
                    <NavBtn text="BLOG" url="/blog" />
                    <NavBtn text="CONTACT" url="/contact" />
                    <WMButton text="GET STARTED" clickHandler={() => {
                        location.href = '/dashboard'
                    }}/>
                </nav>

                <button className="text-white md:hidden text-4xl" onClick={() => {
                    (document.querySelector('#side_nav') as HTMLElement).classList.remove('hidden')
                }}>
                    &equiv;                   
                </button>
                <nav className="hidden bg-[#F3FFFB] text-black fixed top-0 right-0 w-fit pt-4" id="side_nav">
                    <button className="text-black md:hidden h-8 text-4xl ml-4" onClick={() => {
                        (document.querySelector('#side_nav') as HTMLElement).classList.add('hidden')
                    }}>
                        &times;                   
                    </button><br />
                    <NavBtn text="HOME" url="/home" className="h-8 ml-5 mt-1"/><br /><hr className="text-gray-300 mx-4"/>
                    <NavBtn text="ABOUT" url="/about" className="h-8 ml-5 mt-1"/><br /><hr className="text-gray-300 mx-4"/>
                    <NavBtn text="OFFERINGS" url="/offerings" className="h-8 ml-5 mt-1"/><br /><hr className="text-gray-300 mx-4"/>
                    <NavBtn text="BLOG" url="/blog" className="h-8 ml-5 mt-1"/><br /><hr className="text-gray-300 mx-4"/>
                    <NavBtn text="CONTACT" url="/contact" className="h-8 ml-5 mt-1"/><br />
                    <WMButton text="GET STARTED" clickHandler={() => {
                        location.href = '/dashboard'
                    }}/>
                </nav>

            </div>
        </>
    )
}
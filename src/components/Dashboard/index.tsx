import Header from "../Header";

const DashBoard = (props: {
    children: React.ReactNode
}) => {

    return (
        <div className="flex justify-center">
            <header className="fixed top-0 left-0 w-full">
                <Header />
            </header>
            <main className="min-h-screen">
                {props.children}
            </main>
        </div >
    )
}

export default DashBoard;
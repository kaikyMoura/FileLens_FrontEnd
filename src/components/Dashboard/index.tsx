import Footer from "../Footer";
import Header from "../Header";

const DashBoard = (props: {
    children: React.ReactNode
}) => {

    return (
        <div className="">
            <header className="fixed top-0 left-0 w-full">
                <Header />
            </header>
            <main className="min-h-screen flex justify-center items-center">
                {props.children}
            </main>
            <Footer />
        </div >
    )
}

export default DashBoard;
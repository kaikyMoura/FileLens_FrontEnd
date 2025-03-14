import Header from "../Header";

const DashBoard = (props: {
    children: React.ReactNode
}) => {

return (
    <div className="flex min-h-screen">
        <Header />
        <main className="">
            {props.children}
        </main>
    </div>
)
}

export default DashBoard;
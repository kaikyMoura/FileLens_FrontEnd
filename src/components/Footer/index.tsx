import Link from "next/link";
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa6";

const Footer = ({ }) => {

    return (
        <footer className={`w-full ${styles.footer}`}>
            <div className="flex justify-between">
                <Link className="ml-4 mb-2 flex gap-4" href={"https://github.com/kaikyMoura/FileLens_FrontEnd"}><FaGithub color="white" fontSize={26} /> github</Link>

                <div className="flex gap-4">
                    <p className="mr-4 mb-2" >© 2025 FileLens</p>
                    <p className="mr-4 mb-2">{process.env.NEXT_PUBLIC_APP_VERSION as string}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
import Button from "../Button";
import styles from "./styles.module.scss"

const CookiesPopup = (props: { close: () => void }) => {
    return (
        <div className={styles.cookie__card}>
            <span className={"font-2xl"}>🍪 Cookie Notice</span>
            <p className={styles.cookies__text}>
                We use cookies to ensure that we give you the best experience on our website.
                <a href="#">Read cookies policies</a>.
            </p>
            <div className={styles.cookies__actions}>	
                <button className={styles.manage_pref} type="button">
                    Manage your preferences
                </button>
                <Button className={`font-normal text-md ${styles.accept__butn}`} style={"primary"} text={"accept"} type="button" action={props.close} />
                <button className={`font-normal text-md ${styles.accept__butn}`} type="button" onClick={props.close}>Decline</button>
            </div>
        </div>
    );
}

export default CookiesPopup;
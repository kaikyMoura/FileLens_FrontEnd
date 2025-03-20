import styles from './styles.module.scss';

const Loader = () => {

    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.loader}`}/>
        </div>
    )
}

export default Loader;
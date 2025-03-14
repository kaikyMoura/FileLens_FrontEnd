import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import styles from './styles.module.scss';

const Card = (props: {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    pages: number;
    title?: string;
}) => {

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };

    return (
        <>
            <div className={`${styles.cardContainer} ${props.className}`}>
                {currentPage ?
                    <button className={`${styles.arrows}`} onClick={() => handlePageChange(currentPage - 1)}>
                        <FaArrowLeft className='cursor-pointer' fontSize={26} />
                        <p className='font-semibold'>Back</p>
                    </button>
                    : null
                }
                <div className={`${props.className}`}>
                    <h2 className="font-medium text-xl">{props.title}</h2>
                    {props.pages > 1 ?
                        <>
                            {Array.isArray(props.children) ? props.children[currentPage] : props.children}
                        </>
                        :
                        <>
                            {Array.isArray(props.children) ? props.children : [props.children]}
                        </>
                    }
                </div>
                {props.pages && (
                    <>
                        {currentPage < props.pages - 1 &&
                            <button className={`${styles.arrows}`} onClick={() => handlePageChange(currentPage + 1)}>
                                <p className='font-semibold'>Foward</p>
                                <FaArrowRight className='cursor-pointer' fontSize={26} />
                            </button>
                        }
                    </>
                )}
            </div>
        </>
    )
}

export default Card;
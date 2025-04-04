import { useEffect } from 'react';
import { FaFolderOpen } from 'react-icons/fa6';
import styles from './styles.module.scss';
import Link from 'next/link';
import { usePageContext } from '@/contexts/PageContextProvider';
import { useRouter } from 'next/router';

const pages = [{ name: 'Home', link: '/' }, { name: 'My notes', link: '/my-notes' }, { name: 'My files', link: '/files' }];

const Header = () => {
    const router = useRouter();
    const { currentPage, setCurrentPage, setPageTitle } = usePageContext();

    useEffect(() => {
        console.log(currentPage)
    }, [currentPage])

    const handlePageChange = (index: number, name: string) => {
        setCurrentPage(index)
        setPageTitle(name)
    }

    return (
        <>
            <div className={styles.header}>
                <div className='ml-4 mt-3 flex justify-between gap-4'>
                    <div className='flex items-center gap-2'>
                        <FaFolderOpen className='' color="gold" fontSize={22} />
                        <h2 className='font-bold text-2xl'>File lens</h2>
                    </div>
                    <div className='mt-1'>
                        <ul className='flex gap-8 mr-20'>
                            {pages.map((page, index) => (

                                <li key={index} style={{
                                    borderBottom: currentPage === index && page.link === router.pathname ? '2px solid gold' : 'none',
                                }}>
                                    <Link href={page.link}>
                                        <p className='font-medium text-base'
                                            onClick={() => handlePageChange(index, page.name)}
                                            style={{
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {page.name}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
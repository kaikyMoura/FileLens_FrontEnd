import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';
import { get_players } from '@/api/services/playersService';
import { get_teams } from '@/api/services/teamsService';
import { FaToggleOff, FaToggleOn, FaX } from 'react-icons/fa6';
import Image from 'next/image';
import useLazyLoading from '../../hooks/useLazyLoading';

const SearchBar = <T extends Record<string, any>>(
    props: {
        onSearch: (results: T[]) => void;
        keys: (keyof T)[];
    }) => {

    const { imgRef, isVisible } = useLazyLoading();

    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [allData, setAllData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isActivePlayer, setIsActivePlayer] = useState(true)

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [playersData, teamsData] = await Promise.all([
                get_players(isActivePlayer, undefined, undefined, undefined, 10),
                get_teams(undefined, undefined, undefined, 10),
            ]);

            const players = playersData.data || [];
            const teams = teamsData.data || [];

            const playersWithImages = players.map(player => ({
                ...player,
                image: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`
            }));

            const teamsWithImages = teams.map(team => ({
                ...team,
                image: "/" + team.full_name.toLowerCase().replace(/\s+/g, "_") + "_primary.png"
            }));

            const combinedData = [...(playersWithImages || []),...(teamsWithImages || [])] as unknown as T[];

            setAllData(combinedData)
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setIsLoading(false);
        }
    }, [isActivePlayer]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredData([]);
            return;
        }

        const filtered = allData.filter((item) =>
            props.keys.some((key) =>
                String(item[key]).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredData(filtered);
        props.onSearch(filtered);
    }, [query, allData]);

    const clearInput = () => {
        setQuery('');
        setFilteredData([]);
    };

    return (
        <div className={`flex justify-center ${styles.container}`}>
            <div className='relative w-full max-w-md'>
                <div className="flex items-center relative">
                    <input
                        className={`focus:outline-none w-full ${styles.searchInput}`}
                        placeholder="search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {query && (
                        <button className="absolute right-12 cursor-pointer" onClick={clearInput}>
                            <FaX fontSize={20} color='#fff' />
                        </button>
                    )}

                    <button className={`absolute flex items-center justify-center ${styles.searchButton}`}>
                        <FaSearch fontSize={20} color="#fff" />
                    </button>
                </div>
                {query && !isLoading && filteredData.length > 0 && (
                    <ul className={`absolute w-full bg-white shadow-md ${styles.searchResults}`}>
                        <li className="mt-2">
                            <button className="ml-2 flex" onClick={() => setIsActivePlayer(!isActivePlayer)}>
                                <p className='font-medium text-lg'>Is active ?</p>
                                {isActivePlayer ?
                                    (
                                        <FaToggleOn fontSize={26} color="#2699ef" />
                                    )
                                    :
                                    (
                                        <FaToggleOff fontSize={26} color="#2699ef" />
                                    )
                                }
                            </button>
                        </li>
                        {filteredData.map((item, index) => (
                            <li key={index} className="flex items-center gap-4 p-2 border-b border-gray-200 cursor-pointer">
                                <Image ref={imgRef} src={item.image!} alt={'player-headshot'} loading="lazy" width={110} height={40}
                                    style={{ width: 'auto', height: 'auto' }} />
                                <p className="font-medium text-lg">{item.full_name}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
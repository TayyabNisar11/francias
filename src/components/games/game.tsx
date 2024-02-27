import React from 'react';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowRight } from "react-icons/md"
import Link from 'next/link';


const GameComponent = ({ category }: any) => {
    const [open, setOpen] = useState(false)

    const handleClickMore = useCallback(() => setOpen(!open), [open])


    return (
        <div className={`row game-component game-component-${open ? "yellow" : "gray"}`}>
            <div className='col-lg-3 col-md-3 col-sm-12'>
                <Image objectFit="cover" className='game-component_image' src={category.featured_images[0]?.path || '/francais-et-vous/assets/images/pages/shop/products/1.png'} height={220} width={329} />
            </div>
            <div className='col-lg-9 col-md-9 col-sm-12 game-component_content '>
                <span className='tag gameTag '>Exercices</span>
                <h1>{category.name}</h1>
                <p>{category.description}</p>
                <div className='game-component_content-more'>
                    <button onClick={handleClickMore} className={`game-component_content-more_${open ? "top" : "bottom"}`}>
                        voir les jeux
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>
            <div className={`col-12 game-component_games game-component_games-${open ? "open" : "close"}`}>
                {
                    category.games.map((item: any) => {
                        return (
                            <div className='game-component_games-category '>
                                <span className='game-component_games-category_title'>
                                    <span>{item.level_id}</span>
                                </span>
                                <Link passHref href={`/sur_les_galets/${item.id}/${item?.slug}`}>
                                    <a>
                                        <span className='game-component_games-category_heading '>{item.title}</span>
                                    </a>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameComponent;

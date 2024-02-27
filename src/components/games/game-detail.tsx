import React from 'react';
import Image from "next/image";
import renderContent from "html-react-parser";

const GameDetail = ({ game }: any) => {

    return (
        <div className='game-detail_content'>
            <div className='game-detail_content-heading'>
                <h1>{game?.title}</h1>
                <span className='tag gameTag'>Jeux et Exercices</span>
            </div>
            <div className='game-detail_content-detail  '>
                <Image objectFit="cover" className='game-detail_content-detail_image ' src={game?.featured_images[0]?.path || `/francais-et-vous/assets/images/backgrounds/game-1.png`} height={220} width={329} />
                <div className=''>
                    <div className='game-detail_content-detail_card'>
                        <div className='game-detail_content-detail_card-header'>
                            <div className='game-detail_content-detail_card-header-content'>
                                <h1>{game?.category_id}</h1>
                                <span>{game?.level_id}</span>
                            </div>
                        </div>
                        <div className='game-detail_content-detail_card-content'>
                            {renderContent(game?.content_html || "")}
                        </div>
                    </div>
                </div>
            </div>
            <div className='game-detail_co  ntent-view mt-4'>
                <div className='game-detail_content-view_game'>
                    <iframe allowFullScreen src={`https://creativematrixstudios.co.uk?url=${game.slug}`} />
                </div>
            </div>


        </div>
    )
}

export default GameDetail
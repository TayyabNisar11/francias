import React from 'react'
import Game from './game'

const GamesContent = ({ categories }: any) => {
    return (
        <div className='game-content'>
            <div className='game-content_header'>
                <h1>Jeux et exercices</h1>
                <p> Testez vos connaissances au travers d'exercices et de jeux pour adultes et adolescents.</p>
                <p>Chaque mois de petits jeux et exercices par niveau, pour tous ceux qui veulent améliorer
                    leurs connaissances de la langue et de la civilisation française tout en s'amusant.</p>
                <p>Les niveaux indiqués sont les niveaux minimum requis pour jouer.</p>
            </div>
            <div className='game-content_games'>
                {
                    categories?.map((category: any) => {
                        return category.games.length > 0 && <Game category={category} />
                    })
                }
            </div>
        </div>
    )
}

export default GamesContent
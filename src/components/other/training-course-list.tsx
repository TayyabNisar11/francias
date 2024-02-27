import DropDowm from '@components/control/dropdown';
import GUButton from '@components/control/gu-button';
import React from 'react'
import { BsDownload } from "react-icons/bs";

const TrainingCourses = () => {
    return (
        <div className='training-courses'>
            <h1>Accéder au contenu de nos formations</h1>
            <p>Si vous avez participé à une
                formationdirigée par Alexandre Garcia, directeur pédagogique du Centre International d’Antibes, ou par l’un des enseignants de l’équipe pédagogique, vous trouverez ici, les documents mis à votre disposition.</p>
            {/* 
            <DropDowm title="LIEU DE LA FORMATION" placeholder='Sélectionner une ville' />
            <DropDowm title="mois" placeholder='Sélectionner le mois' />
            <DropDowm title="ANNéE" placeholder='Sélectionner l’année' />
 */}

            <GUButton variant='contained' shape="round" color="light" weight='bold' preffix={<BsDownload />}>
                ACCÉDER AU CONTENU
            </GUButton>

        </div>
    )
}

export default TrainingCourses;
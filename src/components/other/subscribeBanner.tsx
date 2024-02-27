import React from 'react';
import { useRouter } from "next/router"

function SubscribeBanner() {
    const router = useRouter()
    return (
        <div className="subscribeBanner vertical">
            <div className="wrapper">
                <h3>Inscrivez-vous à la Lettre d’informations</h3>

                <p>
                    Recevez tous les mois nos coups
                    de coeur culturels et nos exercices ludiques pour apprendre le français avec Le Français et Vous.
                </p>

                <div className="imgWrap">
                    <img src="/francais-et-vous/assets/images/icons/subscribe.png" alt="" />
                </div>

                <button onClick={
                    () => router.push("/page/lettre-d-information")
                } className='btn -shape--round -weight--bold -size--regular -variant--contained'>
                    je m’inscris
                </button>

            </div>
        </div>
    )
}

export default SubscribeBanner
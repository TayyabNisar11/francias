import Link from "next/link"
function Teaser() {
  return (
    <div className="NewsletterSubscribtion">
      <div className="container">
        <div className="row">
          <div className="col-md-4 iconWrap">
            <img src="/francais-et-vous/assets/images/icons/subscribe.png" alt="" />
          </div>

          <div className="col-md-8 subscribeDesc">
            <h2>Inscrivez-vous à la Lettre d’informations</h2>
            <p> Recevez tous les mois nos coups de coeur culturels et nos exercices ludiques pour apprendre le français avec Le Français et Vous. </p>

            <Link href="/page/lettre-d-information" passHref>
              <a>
                je m’inscris
              </a>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Teaser
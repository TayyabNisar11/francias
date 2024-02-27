import Link from "next/link"
function LatestGames({ content }: any) {

    return (
        <div className="latestGames">
            <div className="row">
                <div className="col-md-12">
                    <div className="featuredGame">
                        <img src="/francais-et-vous/assets/images/games/poster001.jpg" alt="" />

                        <div className="gameDetails">
                            <div className="levelWrap">
                                <div className="level">{content?.level_id}</div>
                            </div>


                            <div className="gameTitle">
                                <a className="tag gameTag" href="">{content?.category_id}</a>
                                <Link href={`/sur_les_galets/${content.id}/${content.slug}`} passHref>
                                    <a><h3> {content?.title} </h3></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <Link passHref href={"/page/guide-grammatical"}>
                        <a className="guideBtn">
                            Guide <span> grammatical </span>
                        </a>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link passHref href={"/cms/exercices-de-grammaire"}>
                        <a className="excerciseBtn">
                            Exercices  <span> de grammaire </span>
                        </a>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default LatestGames
import Breadcrumb, { BreadcrumbItem } from "@components/other/breadcrumb";
import DownloadSidebar from "./../../components/sections/sidebars/downloadSidebar";
import SubscribeBanner from "@components/other/subscribeBanner";
import AddBanner from "@components/other/ad-baner";
import { getCmsPageContent, getPageSlug } from "@services/layout";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import renderContent from "html-react-parser"

export const getStaticProps: GetStaticProps = async (context) => {
    const pageSlug = await getPageSlug("a propos")
    const res = await getCmsPageContent(pageSlug.data.data.slug);
    return {
        props: {
            content: res.data.data[0]
        },
        revalidate: 10
    }
}

function About({ content }: any) {
    return (
        <>
            <NextSeo title={content?.meta_title} description={content?.meta_description} additionalMetaTags={[
                { name: "keywords", content: content?.keywords }
            ]} />
            <div className="aboutPage">
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                            Accueil
                        </BreadcrumbItem>
                        <BreadcrumbItem>{content?.title}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container">
                    {renderContent(content?.content || "")}
                    {/* <div className="my-2 row">
                        <div className="col-lg-9 col-md-8 col-sm-12 ">

                            <div className="intro">
                                <div className="row">
                                    <div className="col-md-7">
                                        <h1> Apprendre le français à Paris </h1>
                                        <p>
                                            Fondée en 1988, notre école partenaire est unanimement
                                            reconnue comme la référence pour ceux qui veulent apprendre le
                                            français à Paris.
                                        </p>
                                        <p>
                                            Par ailleurs, l’école offre des cours pour adultes en courts
                                            ou longs séjours ainsi que des séjours linguistiques à Paris
                                            pour les jeunes.
                                        </p>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="imgWrapper">
                                            <img src="/francais-et-vous/assets/images/cms/001.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>




                            </div>

                            <p>
                                <strong>
                                    Depuis 30 ans que j'exerce ce métier, je cherche toujours à comprendre les raisons qui poussent
                                    les étrangers, adolescents comme adultes, à vouloir apprendre à parler français ?
                                    Je crois que chaque langue porte une vision unique du monde et alors que l’anglais s’est imposé sur la planète depuis belle lurette, l’intérêt d’apprendre le français me semble n’être rien d’autre qu’un certain besoin de ne pas
                                    se conformer à la pensée unique de la langue dominante.
                                </strong>
                            </p>

                            <div className="signature">
                                <p>
                                    <span>Par Alexandre Garcia,</span>
                                    Directeur Pédagogique du Centre <br />
                                    International d'Antibes depuis 1990
                                </p>
                            </div>



                            <div className="brief">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="imgWrapper">
                                            <img src="/francais-et-vous/assets/images/cms/002.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <p>
                                            En 36 ans, 100 000 étudiants de tous âges sont venus étudier
                                            le français dans notre école de français du sud
                                            de la France à Antibes ou dans nos campus pour juniors situés
                                            dans toute la France.
                                        </p>
                                        <h5>L’histoire des écoles de français</h5>
                                        <p>
                                            En 1985, l’histoire a commencé par la location
                                            de 3 salles de classe dans un lycée à Antibes pour gérer
                                            à ce jour deux écoles de français pour les adultes
                                            et quatre campus linguistiques pour les jeunes à Antibes,
                                            Juan les pins ou Cannes.
                                        </p>

                                        <h5>Les accréditations des écoles de français</h5>
                                        <p>
                                            Une politique de qualité a toujours animé le Centre
                                            International d'Antibes et être affilié aux organismes
                                            de qualité les plus reconnus en France et dans le monde
                                            reste pour nous le meilleur moyen de nous mobiliser et
                                            de promouvoir cette démarche.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="subscribeTeaser">
                                <SubscribeBanner />
                            </div>

                            <div className="downloadsSideBar">
                                <DownloadSidebar />
                            </div>
                        </div>
                    </div> */}
                    <AddBanner banner="propos" />
                </div>
            </div>
        </>
    );
}

export default About;

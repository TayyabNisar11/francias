import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import GamesSideBar from '@components/games/games-side-bar';
import DownloadSidebar from '../../components/sections/sidebars/downloadSidebar';
import AddBanner from '../../components/other/ad-baner';
import RelatedPosts from '@components/sections/sidebars/relatedPosts';
import { getLessons } from '@services/lesson';
import { GetStaticProps } from 'next';
import moment from 'moment';
import Link from "next/link";
import renderContent from "html-react-parser"
import { NextSeo } from 'next-seo';
import useCapitalizeFirstLatter from '@customHooks/useCapitalizeFirstLatter';
moment.locale("fr")

//Sever Side fetching data
export const getStaticProps: GetStaticProps = async (context) => {
    const res = await getLessons();
    const lessons = res.data.data.lessons;
    const featured = res.data.data.lessonsFeatured;
    return {
        props: {
            lessons,
            featured
        },
        revalidate: 10
    }
}


function LessonListing({ lessons, featured }: any) {
    const { CapitalizeFirstLatter } = useCapitalizeFirstLatter();
    return (
        <>
            <NextSeo
                title='Fiches pédagogiques FLE pour enseigner le Français'
                description='Category: Fiche FLE, Des fiches pédagogiques FLE pour enseigner le Français et un espace destiné aux enseignants de français langue étrangère. '
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    },
                    {
                        name: "keywords",
                        content: "FLE, pédagogie active"
                    }
                ]}
                openGraph={{
                    title: "Sous le platane - Fiche FLE - F&V",
                    description: "Des fiches pédagogiques FLE pour enseigner le Français et un espace destiné aux enseignants de français langue étrangère.",
                    site_name: "F&V - Le Français et vous",
                    type: "article",
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <div className="lessonsPage">
                <div className='container'>
                    <Breadcrumb>
                        <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                            Accueil
                        </BreadcrumbItem>
                        <BreadcrumbItem>Sur les platane</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className='lessonsListing'>
                        <div className='my-2 row'>
                            <div className='col-lg-9 col-md-8 col-sm-12 '>
                                <h1> Fiches Pédagogiques FLE </h1>
                                <div className="row">
                                    <p className='col-md-10'>
                                        La pédagogie active ou pédagogie de l'envie se veut en rupture avec la pédagogie conventionnelle.
                                        C'est une pédagogie innovante, dynamique, faite pour stimuler l'apprenant et le mettre en appétit.
                                    </p>
                                    <ul className='itemsList'>
                                        <h2> Fiche pédagogique du mois </h2>
                                        {
                                            lessons?.map((lesson: any) => {
                                                return <li>
                                                    <div className="row">
                                                        <div className="col-md-12 itemDesc">
                                                            <div className="container">
                                                                <div className="row tagLevel">
                                                                    <div className="tagWrap">
                                                                        <span className="tag lessonTag">Fiche pédago</span>
                                                                    </div>

                                                                    <div className="levelWrap"><div className="level">{lesson?.level_id}</div></div>
                                                                </div>
                                                                <div className="row itmTitleDate">
                                                                    <Link href={`/sous_le_platane/${lesson?.id}/${lesson?.slug}`} passHref>
                                                                        <a>
                                                                            <h3>{lesson?.title}</h3>
                                                                        </a>
                                                                    </Link>
                                                                    {
                                                                        lesson?.magazine_date &&
                                                                        <div className="date"><i className="far fa-clock"></i>{CapitalizeFirstLatter(lesson?.magazine_date)}</div>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-4 col-md-12 itmImg">
                                                            <div className="imageWrap">
                                                                <Link href={`/sous_le_platane/${lesson?.id}/${lesson?.slug}`} passHref>
                                                                    <a>
                                                                        <img src={lesson?.featured_images[0]?.path} alt={lesson?.title} />
                                                                    </a>
                                                                </Link>
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-8 col-md-12 itemDesc">
                                                            <div className="row shortDesc">
                                                                <p>
                                                                    {renderContent(lesson?.description2 || "")}
                                                                    <Link href={`/sous_le_platane/${lesson?.id}/${lesson?.slug}`}>
                                                                        <a >lire plus...</a>
                                                                    </Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-12'>
                                {/* <div className="downloadsSideBar">
                                    <DownloadSidebar />
                                </div> */}
                                {
                                    featured && featured?.length > 0 && <div className="featuredBlock">
                                        <RelatedPosts featured={featured} />
                                    </div>
                                }
                                <div className="">
                                    <AddBanner banner="lesson_listing" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonListing
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import DownloadSidebar from '../../components/sections/sidebars/downloadSidebar';
import AddBanner from '../../components/other/ad-baner';
import RelatedPosts from '@components/sections/sidebars/relatedPosts';
import SubscribeBanner from '@components/other/subscribeBanner';
import { GetStaticProps } from "next";
import { getLessonDetail, getLessonsSlugs } from '@services/lesson';
import { ParsedUrlQuery } from "querystring"
import moment from "moment"
import renderContent from "html-react-parser"
import { NextSeo } from 'next-seo';

interface IParams extends ParsedUrlQuery {
    slug: string[]
}


export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams
    try {
        const res = await getLessonDetail(slug[1]);
        return {
            props: {
                detail: res.data.data[0],
            },
            revalidate: 10,
        }
    } catch (error) {
        return { notFound: true };
    }

}

export async function getStaticPaths() {
    const res = await getLessonsSlugs()
    const lessons = res?.data?.data?.mostPopuler
    const paths = lessons?.map((lesson: any) => ({
        params: { slug: [`${lesson?.id}`, lesson?.slug] },
    }))

    return { paths, fallback: "blocking" }
}



function LessonDetails({ detail }: any) {

    return (
        <>
            <NextSeo
                title={detail?.meta_title}
                description={detail?.meta_description}
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    }
                ]}
                openGraph={{
                    title: detail?.meta_title,
                    description: detail?.meta_description,
                    site_name: "F&V - Le Français et vous",
                    type: "article",
                    images: [
                        {
                            url: detail?.featured_images[0]?.path
                        }
                    ]
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}

            />
            <div className="lessonDetailsPage">
                <div className='container'>
                    <Breadcrumb>
                        <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                            Accueil
                        </BreadcrumbItem>
                        <BreadcrumbItem href='/sous_le_platane'> Le coin des enseignants - Sous le platane </BreadcrumbItem>
                        <BreadcrumbItem>{detail?.title} </BreadcrumbItem>

                    </Breadcrumb>
                </div>



                <div className="container">
                    <div className='my-2 row'>
                        <div className='col-lg-9 col-md-8 col-sm-12 contentCol'>
                            <div className="row">
                                <div className="col-lg-7 col-md-12 lessonSmallDescribtion">

                                    <h1>{detail?.title} </h1>

                                    <div className="author">
                                        <div className="name"><i className="far fa-user"></i>{detail?.user?.first_name} {" "} {detail?.user?.last_name}</div>
                                        {detail?.magazine_date && <div className="date"><i className="far fa-clock"></i>{moment(detail?.magazine_date).format("MMMM YYYY")}</div>}
                                    </div>

                                    <div className="socials">

                                        <button className="buttonPrint"
                                            onClick={() => window.print()}

                                        >
                                            <i className="far fa-print"></i>
                                            version imprimable
                                        </button>
                                        <ul className="socialsWrap">
                                            <li><a href=""> <i className="fab fa-facebook-f"></i> </a></li>
                                            <li><a href=""> <i className="fab fa-instagram"></i> </a></li>
                                            <li><a href=""> <i className="fab fa-twitter"></i> </a></li>
                                        </ul>
                                    </div>



                                </div>

                                <div className="col-lg-5 col-md-12">
                                    <div className="mainImgWrap">
                                        <img src={detail?.featured_images[0]?.path} alt={detail?.title} />
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped tableInfo">

                                        <tbody>
                                            <tr>
                                                <th scope="row">Type de document et source</th>
                                                <td>
                                                    {renderContent(detail?.document_type || "")}
                                                </td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Niveau européen Public</th>
                                                <td>
                                                    {detail?.publish_id}
                                                </td>


                                            </tr>
                                            <tr>
                                                <th scope="row">Matériel</th>
                                                <td>{detail?.material}</td>


                                            </tr>
                                            <tr>
                                                <th scope="row">Durée de l'activité</th>
                                                <td>
                                                    {detail?.duration}
                                                </td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Activité</th>
                                                <td>
                                                    {detail?.activity}
                                                </td>


                                            </tr>
                                            <tr>
                                                <th scope="row">Objectifs au niveau culture et
                                                    civilisation contempraines et
                                                    interculturel</th>
                                                <td>{renderContent(detail?.objective || "")}</td>


                                            </tr>
                                            <tr>
                                                <th scope="row">Objectifs linguistiques</th>
                                                <td>
                                                    {renderContent(detail?.objective_linguistic || "")}
                                                </td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Objectifs CECR</th>
                                                <td>
                                                    {renderContent(detail?.objective_cecr || "")}
                                                </td>


                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="row totalDurations">
                                <div className="col-md-7">
                                    <div className="desc">
                                        <h2>DÉMARCHE PÉDAGOGIQUE </h2>
                                        {renderContent(detail?.description2_html || "")}
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <div className="durationGroup">
                                        <h2>SÉQUENCES</h2>
                                        <ul>
                                            {
                                                detail?.general_sequence_list?.map((list: any) => {
                                                    return <li>
                                                        <h4>{list?.title} </h4>

                                                        <div className="tag durationTag">
                                                            <i className="fas fa-hourglass-half"></i>
                                                            <span>{list?.sequence}</span>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="row sequancesList">
                                <div className="col-md-12">
                                    <ul className='sequanceItems'>
                                        {
                                            detail?.sequence_list.map((list: any, index: number) => {
                                                return <li>
                                                    <h2> SÉQUENCE {index + 1}</h2>
                                                    <div className="sequanceBlock">
                                                        <div className="title">
                                                            <h3> {list?.title} </h3>
                                                            <div className="tag durationTag">
                                                                <i className="fas fa-hourglass-half"></i>
                                                                <span>{list?.sequence}</span>
                                                            </div>
                                                        </div>

                                                        <div className="sequanceDetails">
                                                            {renderContent(list?.description || "")}

                                                        </div>
                                                    </div>

                                                </li>

                                            })
                                        }


                                    </ul>


                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-12 sidebarCol'>
                            <div className="subscribeTeaser">
                                <SubscribeBanner />
                            </div>

                            <div className="downloadsSideBar hide">
                                <DownloadSidebar />
                            </div>

                            {detail?.lessonsFeatured && detail?.lessonsFeatured?.length > 0 && <div className="featuredBlock">
                                <RelatedPosts featured={detail?.lessonsFeatured} />
                            </div>}


                            <div className="adBlock">
                                {/* <AddBanner banner="" /> */}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    detail?.author || detail?.legend ? <legend className="container post-footer">
                        <p>&copy; <span className='post-footer__author'>{detail?.author}</span> - {"Centre International d’Antibes"}</p>
                        <>{renderContent(detail?.legend || "")}</>
                    </legend> : null
                }
                {/* <div className="container">
                    <div className='articleCopyRight' style={{ fontSize: "1rem", paddingBottom: "3rem" }}>{detail?.legend}
                    </div>
                </div> */}

            </div>
        </>
    )
}

export default LessonDetails
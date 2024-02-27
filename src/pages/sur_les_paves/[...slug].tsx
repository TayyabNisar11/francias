import PostDetailContent from '@components/post-detail/content';
import PostsListSidebar from '@components/posts-layout/shared/posts-list-sidebar';
import { AppState } from '@store';
import { handleGetBlogCategories } from '@store/thunk/blog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostStardard from '@components/post/post-stardard-full';
import styled from 'styled-components';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import { GetStaticProps } from "next";
import { getBlogDetail } from '@services/blog';
import { ParsedUrlQuery } from "querystring"
import { getPostsSlugs } from "@services/blog"
import axios from 'axios';
import { NextSeo } from "next-seo";


interface IParams extends ParsedUrlQuery {
    slug: string[]
}



export interface BlogDetailProps {
    id: number,
    title: string,
    slug: string,
    user_id: number,
    content: string,
    content_html: string,
    short_description: string,
    published_at: string,
    category_name: string,
    category: any,
    featured_images: { path: string }[],
    meta_title?: string
    meta_description?: string
    author?: string | null | undefined,
    legend?: string | null | undefined
    user: {
        first_name: string,
        last_name: string
    }
}

const InfoContainer = styled.div`
  margin-bottom: ${30 / 14}rem;
`;

const SliderContainer = styled.div`
  margin-bottom: ${50 / 14}rem;
`;

const PostContentContainer = styled.div`
  margin-bottom: ${80 / 14}rem;
`;

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context?.params as IParams
    try {
        const res = await getBlogDetail(slug[1]);

        return {
            props: {
                detail: res?.data?.data[0]?.post,
                featured: res?.data?.data[0]?.featured
            },
            revalidate: 10,
        }
    } catch (error) {
        console.log({ error });

        return { notFound: true };
    }

}

export async function getStaticPaths() {
    const res = await getPostsSlugs()
    const posts = res?.data?.data?.mostPopuler
    const paths = posts?.map((post: any) => ({
        params: { slug: [`${post?.id}`, post?.slug] },
    }));
    return { paths, fallback: true }
}




const PostDetailSliderSidebar = ({ detail, featured }: { detail: BlogDetailProps, featured: any }) => {

    const dispatch = useDispatch();

    const { fetching, data: categories } = useSelector((state: AppState) => state?.blog?.categories);
    const [blogs, setBlogs] = useState<Array<any> | null>(null);

    const [articles, setSelectedArticles] = useState(null)

    useEffect(() => {
        if (!categories?.length) {
            dispatch(handleGetBlogCategories())
        }

        axios.get(`https://fetv2022.netservex.com/api/v1/suggestions/${detail?.category?.slug}`)
            .then((res) => {
                let data = res.data.data
                setBlogs(data)
            })
            .catch((err) => {
                console.log("state is", err)
            })
    }, []);



    return (
        <>
            <NextSeo
                title={detail?.meta_title}
                description={detail?.meta_description}
                canonical={"https://www.cia-france.com/francais-et-vous/sur_les_paves/" + detail?.id + "/" + detail?.slug}
                openGraph={{
                    title: detail?.meta_title,
                    description: detail?.meta_description,
                    url: "https://www.cia-france.com/francais-et-vous/sur_les_paves/" + detail?.id + "/" + detail?.slug,
                    images: [{ url: detail?.featured_images[0]?.path }]
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                        Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem href='/sur_les_paves' >Sur les pavés</BreadcrumbItem>
                    <BreadcrumbItem>{detail?.title}</BreadcrumbItem>

                </Breadcrumb>



                <div className="post-standard">
                    <PostContentContainer>
                        <div className="row">
                            <div className="col-12 col-md-9">
                                <InfoContainer>
                                    {detail &&

                                        <PostStardard infos={[0, 1]} data={detail} className="-center" hideCover />
                                    }
                                </InfoContainer>
                                <PostDetailContent content={detail?.content_html} author={detail?.author} legend={detail?.legend} />
                            </div>
                            <div className="col-12 col-md-3">
                                <PostsListSidebar featured={featured} categories={categories} />
                            </div>
                        </div>
                        {
                            blogs && Array.isArray(blogs) && blogs?.length > 0 && <div className="row relatedArticles">
                                <h3> A lire aussi...</h3>
                                <ul className="row">
                                    {
                                        blogs?.map((item) => (
                                            <li className="col-12 col-md-4">
                                                <a href={`/francais-et-vous/sur_les_paves/${item?.id}/${item?.slug}`} >
                                                    <div className="articleImgContainer">
                                                        <img src={item?.featured_images[0]?.path || '/francais-et-vous/assets/images/posts/articles/009.jpg'} alt="" />
                                                    </div>
                                                    <div className="articleExerpt">
                                                        <h4> {item?.title}</h4>
                                                        <p dangerouslySetInnerHTML={{ __html: item?.short_description?.substring(0, 280) }} />
                                                    </div>
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>}
                    </PostContentContainer>
                </div>
            </div>
        </>
    );
};

export default PostDetailSliderSidebar;

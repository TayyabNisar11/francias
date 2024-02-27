import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import { ThemeVariation } from '@common/enum';
import CategoryBar from '@components/category/bar';
import PostTrending from '@components/post/post-trending';
import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import PostStardard from '@components/post/post-stardard';
import PostHighlighted from "@components/post/post-highlighted"
import moment from 'moment';
import { Blog, BlogCat, Post, PostImage } from "@pages/sur_les_paves"
import { AppState } from "@store";
import { useSelector } from "react-redux";
import Loading from '@components/other/loading';
import AddBanner from '@components/other/ad-baner';
import SubscribeBanner from '@components/other/subscribeBanner';
import useCapitalizeFirstLatter from '@customHooks/useCapitalizeFirstLatter';


moment.locale('fr')

const StyledPostStardard = styled(PostStardard)`
  margin-bottom: ${60 / 14}rem;
`;
const PostsListContainer = styled.div`
margin-bottom: ${80 / 14}rem;
`;
const breakpointColumnsObj = {
    default: 2,
    768: 2,
    576: 1,
};
const StyledPostTrending = styled(PostTrending)`
  &:not(:last-child) {
    margin-bottom: ${20 / 14}rem;
  }
`;
const PostsContainer = styled.div`
  margin-bottom: ${50 / 14}rem;
  
`;

interface BlogListigProps {
    blogs: Blog<BlogCat<Post<PostImage>>>[],
    featured: [],
    theme?: ThemeVariation,
}



const BlogListing = ({ blogs, theme, featured }: BlogListigProps) => {

    const { fetching: categoriesLoading, data: categoriesData } = useSelector((state: AppState) => state.blog.categories)

    const { CapitalizeFirstLatter } = useCapitalizeFirstLatter();


    return (
        <PostsListContainer >
            <div className='blog-listing'>
                <div className='container'>
                    <Breadcrumb>
                        <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                            Accueil
                        </BreadcrumbItem>
                        <BreadcrumbItem >Sur les pavés</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                {
                    blogs && blogs?.slice(0, 2).map((item: any, index: number) => {
                        return <section className={`blog-listing-category-form ${index % 2 == 0 ? "gray-bg" : ""}`}>
                            <div className='container'>
                                <h1 className='blog-listing-category-form_h1'> Le Francais et Vous N°{item?.name} - {CapitalizeFirstLatter(item?.magazine_date)}</h1>
                                {/* <h3 className='blog-listing-category-form_h3'>{CapitalizeFirstLatter(item?.magazine_date)}</h3> */}
                                <div className='row  mt-5'>
                                    <div className='col-12 col-md-7 col-lg-9'>
                                        <div className='row'>
                                            <div className='col-12 mb-5'>
                                                {item?.categories[0]?.post && <PostHighlighted data={item?.categories[0]} date={item?.magazine_date} />}
                                            </div>
                                            {item.categories?.slice(1, 4).map((cat: any, index: number) => {
                                                return (<div key={index} className='col-lg-4 col-md-6 col-sm-12'>
                                                    {cat?.post && <StyledPostStardard data={cat} date={item?.magazine_date} />}
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-5 col-lg-3'>
                                        <div className='blog-listing-category-form_category categorySquares'>
                                            <h1>{index == 0 ? "CATÉGORIES" : index == 1 && featured && featured?.length > 0 ? "LES + LUS" : ""}</h1>

                                            {index == 1 && featured && featured?.length > 0 && featured?.map((post: any, index: number) => (
                                                <StyledPostTrending tag='blogTag' page="sur_les_paves" theme={theme} key={index} data={post} />
                                            ))
                                            }
                                            {
                                                index == 0 && categoriesLoading && <Loading />
                                            }

                                            {index == 0 && <Masonry
                                                breakpointCols={breakpointColumnsObj}
                                                className="masonry-grid"
                                                columnClassName="masonry-grid_column">
                                                {categoriesData?.map((item, index) => <CategoryBar key={index} data={item} />)}
                                            </Masonry>
                                            }
                                        </div>
                                        {index == 0 && <div className='blog-listing-category-form_form'> <SubscribeBanner /></div>}
                                    </div>
                                </div>
                            </div>
                        </section>
                    })
                }

                <div className=' container'>
                    <AddBanner banner="blog_listing" />
                </div>
                {
                    blogs && blogs.slice(2, blogs.length).map((item: any, index: number) => {
                        return <section className={`blog-listing-category-form ${index % 2 == 0 ? "gray-bg" : ""}`}>
                            <div className='container'>
                                <h1 className='blog-listing-category-form_h1'>Le Francais et Vous N°{item?.name} - {CapitalizeFirstLatter(item?.magazine_date)}</h1>
                                {/* <h3 className='blog-listing-category-form_h3'>{CapitalizeFirstLatter(item?.magazine_date)}</h3> */}
                                <div className='row  mt-5'>
                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className='col-12 mb-5'>
                                                {item?.categories[0]?.post && <PostHighlighted data={item?.categories[0]} date={item?.magazine_date} />}
                                            </div>
                                            {item?.categories?.slice(1, 4).map((cat: any, index: number) => (
                                                <div className={`${cat.post ? "col-lg-4 col-md-6 col-sm-12" : "d-none"}`}>
                                                    {cat?.post && <StyledPostStardard theme={theme} data={cat} date={item?.magazine_date} />}

                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    })
                }

            </div>
        </PostsListContainer >
    )

};



export default BlogListing;
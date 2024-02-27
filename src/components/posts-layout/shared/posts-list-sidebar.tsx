import { ThemeVariation } from '@common/enum';
import CategoryBar from '@components/category/bar';
import Loading from '@components/other/loading';
import PostTrending from '@components/post/post-trending';

import { AppState } from '@store';
import { PostCategoriesType } from '@store/slices/posts';
import { handleGetTrendingPosts, handlePostCategories } from '@store/thunk/post';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import SubscribeBanner from '@components/other/subscribeBanner';
import AddBanner from '@components/other/ad-baner';

// import {Category}


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

const PostsListSidebar = ({ theme, categories, featured }: {
  theme?: ThemeVariation, categories?: any
  featured?: any
}) => {
  const dispatch = useDispatch();

  const { fetching: categoriesFetching } = useSelector(
    (state: AppState) => state.posts.categories,
  );
  const { data: trendingData, fetching: trendingFetching } = useSelector((state: AppState) => state.posts.trendingList);

  useEffect(() => {
    dispatch(handleGetTrendingPosts({ _limit: 5 }));
    dispatch(handlePostCategories({}));
  }, []);

  
  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar-section -category categorySquares ">
        <div className="blog-sidebar-section__title">
          <h5>CATÉGORIES</h5>
        </div>
        {categoriesFetching ? (
          <Loading theme={theme} />
        ) : (<Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column">
          {categories?.map((item: any, index: number) => <CategoryBar key={index} data={item} />)}
        </Masonry>
        )}
      </div>
      
      <div className="adsWrapper"> 
        <AddBanner banner="lesson_listing" />
        <SubscribeBanner />
      </div>

      {
        featured && featured.length > 0 && <div className="blog-sidebar-section -category">
          <div className="blog-sidebar-section__title">
            <h5>LES COUPS DE CŒUR</h5>
          </div>

          {featured && featured.map((post: any, index: number) => (
            <StyledPostTrending page="sur_les_paves" tag="blogTag" theme={theme} key={index} data={post} />
          ))
          }
        </div>
      }

    </div>
  );
};

export default PostsListSidebar;

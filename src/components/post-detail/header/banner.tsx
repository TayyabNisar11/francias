import { ThemeVariation } from '@common/enum';
import PostStardard from '@components/post/post-stardard';
import { AppState } from '@store';
import React from 'react';
import { useSelector } from 'react-redux';

const PostDetailHeaderBanner = ({ theme }: { theme?: ThemeVariation }) => {
  const { data } = useSelector((state: AppState) => state.posts.detail);
  return (
    <div className="post-standard__header -banner">
      <div className="post-standard__header-image">
        <img src="/francais-et-vous/assets/images/post_detail/standard/banner.png" alt="Post banner image" />
      </div>
      <div className="post-standard__header-content">
      </div>
    </div>
  );
};

export default PostDetailHeaderBanner;

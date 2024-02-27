import { renderThemeClass } from '@common/functions';
import classNames from 'classnames';
import React from 'react';
import { PostProps, PostInfo } from './shared';
import moment from 'moment';
import Link from 'next/link';
import PostCoverImage from './shared/post-cover-image';


const PostStardardFull = ({
  data,
  className,
  theme,
  infos = [PostInfo?.User, PostInfo?.Date, PostInfo?.Comment],
}: PostProps) => {

  

  const renderInfos = () => {
    return infos?.map((item) => {
      switch (item) {
        case PostInfo?.User:
          return (
            <div className="card-content__info-item card-content__info-item__author">
              <i className="far fa-user mr-2"></i>
              <Link href="#" passHref>
                <a >{data?.user?.first_name} {data?.user?.last_name}</a>
              </Link>
            </div>
          );
        case PostInfo.Date:
          return (
            (data?.published_at &&
              <div className="card-content__info-item card-content__info-item__time">
                <i className="far fa-clock"></i>
                <p>{moment(data?.published_at).format('DD/MM/YYYY')}</p>
              </div>
            )
          );
        default:
          return <></>;
      }
    });
  };

  return (
    <div className={classNames('post-card', '-full', renderThemeClass(theme), className)}>
      <div className="card-content">
        <h5 className="card-content__category-simple">{data?.category_name}</h5>
        <span className="card-content__title">
          {data?.title}
        </span>
        <div className="card-content__info">{renderInfos()}</div>
      </div>
      {data?.featured_images && <PostCoverImage src={data?.featured_images[0]?.path} />}
    </div>
  );
};

export default PostStardardFull;

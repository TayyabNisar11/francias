import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import moment from 'moment';
import PostCoverImage from './shared/post-cover-image';
import { PostProps } from './shared';
import { AiOutlineClockCircle } from "react-icons/ai";

export interface Blog {
  id: number,
  name: string,
  slug: string,
  post: {
    id: number,
    title: string,
    slug: string,
    short_description: string,
    featured_images: { path: string }[]
  }
}

const PostStardard = ({ data: { id, name, slug, post }, date }: { data: any, date: string }) => {
  
  return (
    <div className={classNames('post-card')}>
      <PostCoverImage src={post?.featured_images[0]?.path} />
      <div className="card-content">
        <h5 className="card-content__category">{name}</h5>
        <Link href={`/sur_les_paves/${post?.id}/${post?.slug}`} passHref>
          <a className="card-content__title">
            {post?.title}
          </a>
        </Link>
        <div className="card-content__info">
          <div className="card-content__info-item">
            <i><AiOutlineClockCircle /></i>
            <p>{moment(date).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostStardard;

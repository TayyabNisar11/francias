import { renderThemeClass } from '@common/functions';
import classNames from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { PostProps } from './shared';
import classnames from "classnames"

interface PostTrending {
  id: 1,
  title: string,
  slug: string,
  category_id?: string,
  featured_images: {
    path: string,
  }[]
}

const PostTrending = ({ data: { id, title, slug, category_id, featured_images }, tag, page }: { data: PostTrending, tag: "blogTag" | "lessonTag" | "gameTag", page: 'sur_les_paves' | 'sur_les_galets' | 'sous_le_platane' }) => {
  return (
    <div className={classNames('post-trending mb-3')}>
      <div className="post-trending-image">
        <img src={featured_images[0]?.path as string} alt={title} />
      </div>
      <div className="post-trending-content">
        <h5 className={classNames('tag mb-2', tag)}>{category_id}</h5>
        <Link href={`/${page}/${id}/${slug}`} passHref>
          <a>{title}</a>
        </Link>
      </div>
    </div>
  );
};

export default PostTrending;

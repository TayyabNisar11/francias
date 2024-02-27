import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import dummyData from './data';
import PostContentAuthor from './author';
import Socials from '@components/other/socials';
import PostContentRelated from './related';
import PostCommentComments from './comments';
import PostTagsGroup from './tags';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store';
import { handleGetRelatedPosts } from '@store/thunk/post';

interface PostDetailContentProps {
  content?: string;
  author?: string | undefined | null,
  legend?: string | null | undefined
}

const PostDetailContent = ({ content, author, legend }: PostDetailContentProps) => {
  const dispatch = useDispatch();
  const { fetching, data } = useSelector((state: AppState) => state.layout.socials);

  useEffect(() => {
    dispatch(handleGetRelatedPosts({ _limit: 2, type_like: 'image' }));
  }, []);

  return (
    <div className="post-standard__content">
      <div id="post-share" >
        <h5>PARTAGER:</h5>
        <Socials data={data} spacing={20} height={50} width={50} variant="contained" size="small" shape="circle" color="light" />
      </div>
      <div className="post-standard__content-parse">
        {parse(content || "")}
      </div>
      {
        author || legend ? <legend className="post-footer">
          <p>&copy; <span className='post-footer__author'>{author}</span> - {"Centre International d’Antibes"}</p>
          <>{parse(legend || "")}</>
        </legend> : null
      }

    </div>
  );
};

export default PostDetailContent;

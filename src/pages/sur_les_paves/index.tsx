import styled from 'styled-components';
import { GetStaticProps } from 'next'

import BlogListing from '@components/posts/blog-listing';
import { getBlogs } from "@services/blog";
import { handleGetBlogCategories } from '@store/thunk/blog';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextSeo } from 'next-seo';

const PostsListContainer = styled.div`
  margin-bottom: ${80 / 14}rem;
`;

export interface PostImage {
  path: string
}
export interface Post<T> {
  id: number,
  title: string,
  slug: string,
  short_description: string,
  featured_images: T[]

}
export interface BlogCat<T> {
  id: number,
  name: string,
  slug: string,
  post: T[]
}
export interface Blog<T> {
  id: number,
  name: string,
  magazine_date: string,
  categories: T[]
}

interface BlogPageProps {
  blogs: Blog<BlogCat<Post<PostImage>>>[],
  featured: [],
  categories: [],
}

//Sever Side fetching data
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await getBlogs();
  const blogs = res.data.data.magazine;
  const featured = res.data.data.featured;
  return {
    props: {
      blogs,
      featured
    },
    revalidate: 10
  }
}


const BlogCategoryGrid = ({ blogs, featured }: BlogPageProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleGetBlogCategories())
  }, [])


  return (
    <>
      <NextSeo
        title='Apprendre le français à travers des actualités culturelles - Français Langue Etrangère - FLE - apprendre le français en ligne | Culture - Le Français et vous'
        description='Apprendre le français à travers les actualités culturelles telles que les sorties musique ou cinéma mais aussi littérature sans oublier l&amp;#39;édito mensuel !'
        additionalMetaTags={[
          {
            name: "author",
            content: "Le Français et vous"
          }
        ]}
        openGraph={{
          title: "Sur les pavés - Culture",
          description: "Les coups de coeur du mois de l&#39;équipe pédagogique...",
          site_name: "F&V - Le Français et vous",

        }}
      />
      <PostsListContainer>
        <BlogListing blogs={blogs} featured={featured} />
      </PostsListContainer>
    </>
  );
};

export default BlogCategoryGrid;

import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import ToggleViewSidebar from '@components/posts-layout/toggle-view-sidebar';
import styled from 'styled-components';
import { getBlogCategoryPosts, getBlogCategories } from '@services/blog';
import { ParsedUrlQuery } from "querystring"


interface IParams extends ParsedUrlQuery {
    id: string
}
const PostsListContainer = styled.div`
  margin-bottom: ${80 / 14}rem;
`;



export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as IParams
    const response = await getBlogCategoryPosts(id);

    return {
        props: {
            posts: response.data.data[0].posts,
            featured: response.data.data[0].featured,
            category: id
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const res = await getBlogCategories()
    const cats = res.data.data
    const paths = cats.map((cat: any) => ({
        params: { id: `${cat?.slug}` },
    }))

    return { paths, fallback: "blocking" }
}

const BlogCategoryList = ({ posts, featured, category }: { posts: [], featured: [], category: string }) => {


    return (
        <PostsListContainer>
            <ToggleViewSidebar posts={posts} featured={featured} category={category} />
        </PostsListContainer>
    );
};

export default BlogCategoryList;

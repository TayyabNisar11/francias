import { ThemeVariation } from '@common/enum';
import Loading from '@components/other/loading';
import PostList from '@components/post/post-row-list';
import { AppState } from '@store';
import { handleGetBlogCategories } from '@store/thunk/blog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PostsListSidebar from './shared/posts-list-sidebar';
import { PostInfo } from '@components/post/shared';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';

const PostsContainer = styled.div`
	margin-bottom: ${50 / 14}rem;
`;

const StyledPostStardardFull = styled(PostList)`
	margin-bottom: ${20 / 14}rem;
`;

const ToggleViewSidebar = ({
	theme,
	posts,
	featured,
	category,
}: {
	theme?: ThemeVariation;
	authorView?: boolean;
	posts: [];
	featured: [];
	category: string;
}) => {


	const postsPerPage = 12; // Number of posts to display per page
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate the indexes of the first and last post to display on the current page
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	// Calculate the total number of pages
	const totalPages = Math.ceil(posts.length / postsPerPage);

	// Handle page change
	const handlePageChange = (pageNumber: any) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // Optional: smooth scroll animation
		});
		setCurrentPage(pageNumber);
	};


	const dispatch = useDispatch();

	const { data: categories } = useSelector(
		(state: AppState) => state.blog.categories,
	);

	useEffect(() => {
		if (!categories.length) {
			dispatch(handleGetBlogCategories());
		}
	}, []);

	return (
		<div className='blog-toggle-view'>
			<div className='container'>
				<Breadcrumb>
					<BreadcrumbItem href='/' startIcon={<i className='fas fa-home'></i>}>
						Accueil
					</BreadcrumbItem>
					<BreadcrumbItem href='/sur_les_paves'>Sur les pavés</BreadcrumbItem>
					<BreadcrumbItem>{category}</BreadcrumbItem>
				</Breadcrumb>
				<div className='row'>
					<div className='col-12 col-md-5 col-lg-3 order-md-2'>
						<PostsListSidebar
							theme={theme}
							featured={featured}
							categories={categories}
						/>
					</div>
					<div className='col-12 col-md-7 col-lg-9 order-md-1'>
						<PostsContainer>
							<div className='post-card row'>
								{currentPosts.map((item, index) => (
									<StyledPostStardardFull
										infos={[0, 1]}
										className=''
										theme={theme}
										data={item}
										key={index}
									/>
								))}
							</div>
							{/* Pagination */}
							<div className='pagination'>
								{Array.from({ length: totalPages }).map((_, index) => (
									<span
										key={index}
										onClick={() => handlePageChange(index + 1)}
										className={`paginateditem ${currentPage === index + 1 ? 'activepaginated' : ''}`}
									>
										{index + 1}
									</span>
								))}
							</div>
						</PostsContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ToggleViewSidebar;








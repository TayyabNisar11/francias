import FeaturedTabs from '@components/sections/featured/featuredTabs';
import MagCarousel from '@components/mag/magCarousel';
import Teaser from '@components/sections/newsletter/teaser';
import LatestBlog from '@components/sections/featured/latestBlog';
import LatestGames from '@components/sections/featured/latestGames';
import parse from 'html-react-parser';
import DownloadSidebar from '@components/sections/sidebars/downloadSidebar';
import {
	getHomePageBlogAndLesson,
	getHomePageFeaturePosts,
	getHomePagePosts,
	getHomePageTabsContent,
	getHomePageGame,
	getNewsletterCount,
} from '@services/homepage';
import { GetStaticProps } from 'next';
import moment from 'moment';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import AddBanner from '@components/other/ad-baner';
import PostStardard from '@components/post/post-stardard';

interface PostProps {
	id: number;
	title: string;
	category: string;
	magazine_date: string;
	content: string;
	slug: string;
	level_id?: string;
	featured_images: {
		path: string;
	}[];
}
interface GameProps {
	id: number;
	title: string;
	category_id: string;
	magazine_date: string;
	content: string;
	slug: string;
	level_id?: string;
	featured_images: {
		path: string;
	}[];
}
interface MagaznineProps<Posts> {
	magazine: {
		id: number;
		name: string;
		magazine_date: string;
	};
	posts: Posts[];
}

interface BlogAndLessonProps {
	game: GameProps;
	lesson: PostProps;
}

interface MainPageProps {
	magazines: MagaznineProps<PostProps>;
	blogAndLesson: BlogAndLessonProps;
	tabsContent: [];
	latestBlogs: [];
	gameContent: {};
	totalNewsletter: number;
}

const formatTabContentObject = (
	id: any,
	title = null,
	description = null,
	slug = null,
	date = null,
	category = null,
	level = null,
	image = null,
	content = null,
) => {
	return { id, title, description, slug, date, category, level, image, content };
};

export const getStaticProps: GetStaticProps = async context => {
	const posts = await getHomePagePosts();
	const featurePosts = await getHomePageFeaturePosts();
	const gameContent = await getHomePageGame();
	const newletterCount = await getNewsletterCount();
	const blogAndLesson = await getHomePageBlogAndLesson();
	const tabsContent = await getHomePageTabsContent();

	return {
		props: {
			magazines: posts?.data?.data,
			blogAndLesson: blogAndLesson.data.data,
			tabsContent: {
				lessons: {
					title: tabsContent.data.data.lessons.lessons_tab_title,
					description: tabsContent.data.data.lessons.lessons_tab_description,
					data: tabsContent.data.data.lessons.data.map((post: any) =>
						formatTabContentObject(
							post?.id,
							post?.title,
							post?.description2,
							post?.slug,
							post?.magazine?.magazine_date,
							null,
							post?.level_id,
							post?.featured_images[0]?.path,
							post?.content,
						),
					),
				},

				posts: {
					title: tabsContent.data.data.posts.posts_tab_title,
					description: tabsContent.data.data.posts.posts_tab_description,
					data: tabsContent.data.data.posts.data.map((post: any) =>
						formatTabContentObject(
							post?.id,
							post?.post?.title,
							post?.post?.short_description,
							post?.post?.slug,
							post?.post?.magazine?.magazine_date,
							post?.name,
							null,
							post?.post?.featured_images[0]?.path,
							post?.content,
						),
					),
				},

				games: {
					title: tabsContent.data.data.games.games_tab_title,
					description: tabsContent.data.data.games.games_tab_description,
					data: tabsContent.data.data.games.data.map((post: any) =>
						formatTabContentObject(
							post?.id,
							post?.title,
							null,
							post.slug,
							post?.magazine_date,
							post?.category_id,
							null,
							post?.featured_images[0]?.path,
							post?.content,
						),
					),
				},
			},
			latestBlogs: featurePosts.data.data[0].featured,
			gameContent: gameContent.data.data,
			totalNewsletter: newletterCount?.data?.data[0]?.totalNewsletter,
		},
		revalidate: 10,
	};
};

const Home = ({
	magazines,
	blogAndLesson,
	tabsContent,
	latestBlogs,
	gameContent,
	totalNewsletter,
}: MainPageProps) => {
	console.log("blog and lessons are:: 	", `/sur_les_galets/${blogAndLesson?.game?.id}/${blogAndLesson?.game?.slug}`)

	return (
		<>
			<NextSeo
				title='Apprendre le français en ligne -  Exercices et Jeux  FLE - Ressources FLE - Fiches pédagogiques pour enseigner le Français - Gratuit | Le Français et vous'
				description='L&amp;#39;actualité du magazine &amp;quot;Le français et vous&amp;quot; qui vous permet d&amp;#39;apprendre le français en ligne à travers des fiches pédagogiques, des jeux, et des ressources FLE.'
				additionalMetaTags={[
					{
						name: 'author',
						content: 'Le Français et vous',
					},
				]}
				openGraph={{
					title:
						'Le français et vous, le magazine pédagogique du Centre International d&#39;Antibes - Text',
					description:
						'Le français et vous est un magazine gratuit qui concentre des fiches pédagogiques, des jeux, et de ressources FLE pour apprendre le français en ligne.',
					site_name: 'F&V - Le Français et vous',
				}}
				twitter={{
					handle: '@handle',
					site: '@site',
					cardType: 'summary_large_image',
				}}
			/>

			<div className='currentMagazine'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 curentMagDate renewed'>
							<h2> À LA UNE CE MOIS-CI </h2>
							<h1> Magazine N°{magazines?.magazine?.name} </h1>
							<h4>
								{' '}
								-{' '}
								{moment(magazines?.magazine?.magazine_date).format('MMMM YYYY')}
							</h4>
						</div>
					</div>

					<div className='row'>
						<div className='col-lg-7 col-md-7'>
							<div className='currentArticlesCarousel'>
								{/* Carousel */}
								<MagCarousel post={magazines?.posts} />
							</div>
						</div>

						<div className='col-lg-5 col-md-5 currentArticlesList'>
							<div className='row'>
								{magazines?.posts?.slice(1, 4)?.map((item, index) => {
									return (
										<div className='col-12' key={index}>
											<PostStardard data={item} date={item?.magazine_date} />
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				{/* /Current Magazine */}
			</div>

			{/* previous Magazine */}
			<div className='previousMag'>
				<div className='container'>
					{/* <h2> Dans les magazines précédents </h2> */}

					<ul className='row'>


						<li className='col-md-6 lesson'>
							<h2> Fiche FLE du mois </h2>

							<div className='row'>
								<div className='col-lg-6 col-md-12'>
									<div className='imageWrap'>
										<Link
											href={`/sous_le_platane/${blogAndLesson?.lesson?.id}/${blogAndLesson?.lesson?.slug}`}
											passHref
										>
											<a>
												<img
													src={
														blogAndLesson?.lesson?.featured_images[0]?.path ||
														'/francais-et-vous/assets/images/icons/guide.png'
													}
													alt={blogAndLesson?.lesson?.title}
												/>
											</a>
										</Link>
										{/* <div className='level'>
											{blogAndLesson?.lesson?.level_id}
										</div> */}
									</div>
								</div>
								<div className='col-lg-6 col-md-12'>

									<div className="TagLevelRow">
										<span className='tag  lessonTag'>
											{' '}
											{blogAndLesson?.lesson?.category}{' '}
										</span>

										<div className='level'>
											{blogAndLesson?.lesson?.level_id}
										</div>
									</div>

									<h3>
										<Link
											href={`/sous_le_platane/${blogAndLesson?.lesson?.id}/${blogAndLesson?.lesson?.slug}`}
											passHref
										>
											<a>{blogAndLesson?.lesson?.title}</a>
										</Link>
									</h3>
									<p className='gameCourseDesc'>
										{parse(blogAndLesson?.lesson?.content || '')}

									</p>
									<div className='date'>
										<i className='far fa-clock'></i>
										{moment(blogAndLesson?.lesson?.magazine_date).format(
											'MMMM YYYY',
										)}
									</div>
								</div>
							</div>
						</li>


						<li className='col-md-6 blog'>
							<h2> Jeux du mois </h2>

							<div className='row'>

								<div className='col-lg-6 col-md-12'>

									<div className='imageWrap'>
										<Link
											href={`/sur_les_galets/${blogAndLesson?.game?.id}/${blogAndLesson?.game?.slug}`}
											passHref
										>
											<a>
												<img
													src={
														blogAndLesson?.game?.featured_images[0]?.path
															? blogAndLesson?.game?.featured_images[0]?.path
															: ''
													}
													alt={blogAndLesson?.game?.title}
												/>
											</a>
										</Link>

										{/* <div className='level'>
											{blogAndLesson?.lesson?.level_id}
										</div> */}
									</div>
								</div>
								<div className='col-lg-6 col-md-12'>
									<div className="TagLevelRow">
										<span className='tag  gameTag'>
											{' '}
											{blogAndLesson?.game?.category_id}
										</span>

										{/* <div className='level'>
												{blogAndLesson?.lesson?.level_id}
										</div> */}
									</div>



									<h3>
										<Link
											href={`/sur_les_galets/${blogAndLesson?.game?.id}/${blogAndLesson?.game?.slug}`}
											passHref
										>
											<a>{blogAndLesson?.game?.title}</a>
										</Link>
									</h3>
									<p className='gameCourseDesc'>
										{blogAndLesson?.game?.content}

									</p>
									<div className='date'>
										<i className='far fa-clock'></i>
										{moment(blogAndLesson?.game?.magazine_date).format(
											'MMMM YYYY',
										)}
									</div>
								</div>
							</div>
						</li>


					</ul>
				</div>
			</div>
			{/* /previous Magazine */}

			<div className='featuredTabsWrapper'>
				<FeaturedTabs tabs={tabsContent} />
			</div>

			<div className='latestBlog'>
				<LatestBlog blogs={latestBlogs} />
			</div>

			<AddBanner banner='homepage' />

			<div className='gamesSection'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-9'>
							<LatestGames content={gameContent} />
						</div>
						<div className='col-lg-3 col-md-4 downloadSidebar'>
							<DownloadSidebar />
						</div>
					</div>
				</div>
			</div>
			<Teaser />


			<style jsx global>{`

				{/* slick Carousel */}
					.articlesSlider {
						border-radius: 5px;
						overflow: hidden;
						margin-bottom: 1rem;
					}
					.articlesSlider .item {
						height: 430px;
						overflow: hidden;
						background-position: center top;
						background-size: cover;
						display: flex;
						color: #fff;
					}
					.articlesSlider .item img {
						position: absolute;
						left: 0;
						width: 100%;
						height: 430px;
						z-index: -1;
						filter: brightness(75%);
						object-fit: cover;
						border-radius: 5px;
					}
					.articlesSlider .item .itmDesc {
						display: flex;
						flex-direction: column;
						padding: 2rem;
						justify-content: space-between;
						height: 100%;
					}
					.articlesSlider .item .category {
						display: inline-block;
						padding: 0.5rem 1.5rem;
						border-radius: 5px;
						background-color: #f36f5a;
						color: #fff;
						font-size: 0.875rem;
						float: right;
						clear: both;
						border: 1px solid transparent;
						transition: all 0.25s;
					}
					.articlesSlider .item .category:hover {
						border-color: #fff;
					}
					.articlesSlider .item .itmTitle {
						align-self: flex-end;
					}
					.articlesSlider .item .itmTitle h4, .articlesSlider .item .itmTitle h3 {
						font-family: 'Montserrat', sans-serif;
					}
					.articlesSlider .item .itmTitle h4 {
						text-transform: uppercase;
						margin-bottom: 0.5rem;
					}
					.articlesSlider .item .itmTitle h3 {
						font-size: 1.9rem;
						margin-bottom: 1.5rem;
					}
					.articlesSlider .item .itmTitle a {
						color: #fff;
					}
					.articlesSlider .slick-active {
						z-index: 1;
					}
					.articlesSlider .slick-dots {
						bottom: 1rem;
						left: 1.8rem;
						text-align: left;
					}
					.articlesSlider .slick-dots li {
						width: auto;
						height: auto;
					}
					.articlesSlider .slick-dots li button {
						color: #f7f7f7;
						font-size: 0;
						width: auto;
						height: auto;
					}
					.articlesSlider .slick-dots li button:before {
						width: 40px;
						height: 7px;
						background: #f7f7f7;
						border-radius: 2px;
						position: static;
						display: inline-block;
					}
					.articlesSlider .slick-dots li.slick-active button:before {
						background-color: #4f6fd2;
					}
 
					.gameCourseDesc{
						word-wrap: break-word;
					}

				{/* Featured Articles */}
				.featuredTabsSection {
					margin: 7rem 0;
					margin-bottom: 4rem;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list, .featuredTabsSection .tabsTitles > ul {
					text-align: center;
					border: none;
					display: flex;
					justify-content: space-between;
					padding: 0 5%;
					margin-bottom: 0;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li, .featuredTabsSection .tabsTitles > ul li {
					text-align: left;
					border: none;
					padding-bottom: 0;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li:after, .featuredTabsSection .tabsTitles > ul li:after {
					content: '';
					display: block;
					height: 2px;
					background-color: #4f6fd2;
					margin-top: 1rem;
					opacity: 0;
					transition: all 0.4s;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li:nth-child(1):after, .featuredTabsSection .tabsTitles > ul li:nth-child(1):after {
					background-color: #3bc7b0;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li:nth-child(2):after, .featuredTabsSection .tabsTitles > ul li:nth-child(2):after {
					background-color: #f46f59;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li:nth-child(3):after, .featuredTabsSection .tabsTitles > ul li:nth-child(3):after {
					background-color: #f3c538;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li.react-tabs__tab--selected, .featuredTabsSection .tabsTitles > ul li.react-tabs__tab--selected {
					font-weight: 600;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li.react-tabs__tab--selected h4, .featuredTabsSection .tabsTitles > ul li.react-tabs__tab--selected h4 {
					font-size: 0.9rem;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li.react-tabs__tab--selected h4 span, .featuredTabsSection .tabsTitles > ul li.react-tabs__tab--selected h4 span {
					font-weight: 600;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li.react-tabs__tab--selected:after, .featuredTabsSection .tabsTitles > ul li.react-tabs__tab--selected:after {
					opacity: 1;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li .tabTitle, .featuredTabsSection .tabsTitles > ul li .tabTitle {
					display: flex;
					align-items: center;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li .tabTitle img, .featuredTabsSection .tabsTitles > ul li .tabTitle img {
					margin-right: 1rem;
					max-height: 40px;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li .tabTitle h4, .featuredTabsSection .tabsTitles > ul li .tabTitle h4 {
					font-weight: 400;
					text-transform: uppercase;
					font-family: 'Montserrat', sans-serif;
					font-size: 0.9rem;
				}
				.featuredTabsSection .tabsTitles .react-tabs__tab-list li .tabTitle h4 span, .featuredTabsSection .tabsTitles > ul li .tabTitle h4 span {
					display: block;
					font-size: 1.2rem;
					text-transform: none;
				}
				.featuredTabsSection .tabsDetials {
					background-color: #f7f7f7;
					padding: 3rem 0 1rem 0;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .intro {
					text-align: center;
					padding-bottom: 3.5rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .intro h3 {
					font-size: 2.6rem;
					font-weight: 700;
					padding-bottom: 1.2rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .intro p {
					font-size: 1rem;
					line-height: 1.7rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem {
					margin-bottom: 1.5rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem > .row {
					margin-right: 5px;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .imgWrap {
					max-height: 320px;
					margin-bottom: 0;
					display: flex;
					align-items: center;
					min-height: 100%;
					border-radius: 10px 0 0 10px;
					background-color: #fff;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemPhoto {
					padding-right: 0;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemDescription {
					background-color: #fff;
					border-radius: 0 10px 10px 0;
					box-shadow: 4px 5px 5px 0px rgba(224, 217, 217, 0.63);
					-webkit-box-shadow: 4px 5px 5px 0px rgba(224, 217, 217, 0.63);
					-moz-box-shadow: 4px 5px 5px 0px rgba(224, 217, 217, 0.63);
					padding: 1rem;
					padding-left: 2rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				@media only screen and (max-width: 767px) { 
					.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemDescription { 
						border-radius: inherit;
    					margin-top: 1.5rem;
					}
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemDescription .tagWrap {
					text-align: right;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemDescription .titleWrap {
					padding-top: 1rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemDescription .titleWrap h4 {
					text-transform: uppercase;
					font-family: 'Montserrat', sans-serif;
					margin-bottom: 0.6rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li.featuredItem .itemDescription .titleWrap h3 {
					padding-bottom: 1.2rem;
					font-family: 'Montserrat', sans-serif;
					font-weight: 700;
					line-height: normal;
					color: #393939;
					font-size: 1.4rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li .imgWrap {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li .imgWrap img {
					width: 100%;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li .imgWrap .levelWrap {
					text-align: right;
					position: absolute;
					top: 1rem;
					right: 1rem;
					left: 1rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap .items li .imgWrap .levelWrap .level {
					background-color: #fff;
					color: #f3c538;
					font-weight: 600;
					font-size: 1.2rem;
					border-radius: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0.5rem;
					opacity: 0.95;
					display: inline-block;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.lessonsTab .blogTag {
					background-color: #3bc7b0;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.lessonsTab .date i {
					color: #3bc7b0;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.lessonsTab .items li .itemDescription .describtionWrap a {
					color: #3bc7b0;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.lessonsTab .actionsContainer a {
					background-color: #3bc7b0;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.gamesTab .blogTag {
					background-color: #f3c538;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.gamesTab .titleWrap h4 {
					color: #f3c538;
					text-transform: uppercase;
					font-family: 'Montserrat', sans-serif;
					margin-bottom: 0.5rem;
					font-size: 1rem;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.gamesTab .date i {
					color: #f3c538;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.gamesTab .items li .itemDescription .describtionWrap a {
					color: #f3c538;
				}
				.featuredTabsSection .tabsDetials .react-tabs__tab-panel .pannelWrap.gamesTab .actionsContainer a {
					background-color: #f3c538;
				}
				.featuredTabsSection .actionsContainer {
					padding: 2rem 0;
					margin-top: 2rem;
					text-align: center;
				}
				.featuredTabsSection .actionsContainer a {
					display: inline-block;
					text-transform: uppercase;
					padding: 1rem 2.5rem;
					background-color: #f46f59;
					color: #fff;
					border-radius: 5px;
					font-size: 0.9rem;
					transition: all 0.25s;
				}
				.featuredTabsSection .actionsContainer a:after {
					margin-left: 1.5rem;
					font-family: "Font Awesome 5 Pro";
					content: "\f178";
					display: inline-block;
					transition: all 0.25s;
				}
 

				`}
			</style>

		</>
	);
};

export default Home;

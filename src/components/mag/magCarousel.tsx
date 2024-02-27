import Slider from 'react-slick';
import Link from 'next/link';

interface Post {
	id: number;
	name: string;
	post: {
		id: number;
		title: string;
		slug: string;
		short_description: string;
		featured_images: {
			path: string;
		}[];
	};
}

function MagCarousel({ post }: any) {
	let item: any = post;

	var settings = {
		dots: true,
		arrows: false,
		fade: true,
		infinite: true,
		speed: 3000,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: 'magArticlesCarouselSlick',
	};

	return (
		<div className='articlesSlider'>
			<Slider {...settings}>
				{post?.map((item: Post, index: number) => {
					return (
						item.post && (
							<div className='item' key={index}>
								<img
									src={item?.post?.featured_images[0]?.path}
									alt={item?.post?.title}
								/>
								<div className='itmDesc'>
									<div className='tag'>
										<span className='category'> {item?.name} </span>
									</div>
									<div className='itmTitle'>
										<h3>
											<Link
												href={`sur_les_paves/${item?.post?.id}/${item?.post?.slug}`}
											>
												<a>{item?.post?.title}</a>
											</Link>
										</h3>
									</div>
								</div>
							</div>
						)
					);
				})}
			</Slider>
		</div>
	);
}

export default MagCarousel;

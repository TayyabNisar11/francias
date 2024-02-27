import moment from 'moment';
import Link from 'next/link';
import renderContent from 'html-react-parser';
interface LatestBlogProps {
	blogs: [];
}

function LatestBlog({ blogs }: LatestBlogProps) {
	return (
		<div className='LatestBlogWrap'>
			<div className='container'>
				<h2> Nos autres suggestions du mois </h2>
				<ul className='row items'>
					{blogs.slice(0, 1).map((blog: any, index) => {
						return (
							<li className='col-md-6 featuredItem' key={index}>
								<div className='row'>
									<div className='col-md-12 itemPhoto'>
										<div className='imgWrap'>
											<Link
												href={`/sur_les_paves/${blog?.id}/${blog?.slug}`}
												passHref
											>
												<a>
													<img
														src={blog.featured_images[0]?.path}
														alt={blog?.title}
													/>
												</a>
											</Link>
										</div>
									</div>
									<div className='col-md-12 itemDescription'>
										<div className='tagWrap'>
											<span className='tag blogTag'>{blog?.category_id}</span>
										</div>

										<div className='titleWrap'>
											<h3>
												<Link
													href={`/sur_les_paves/${blog?.id}/${blog?.slug}`}
													passHref
												>
													<a href=''>{blog?.title}</a>
												</Link>
											</h3>
											<div className='date'>
												<i className='far fa-clock'></i>
												{moment(blog?.magazine_date).format('MMMM YYYY')}
											</div>
										</div>

										<div className='describtionWrap'>
											{renderContent(blog?.short_description || '')}
											<Link
												href={`/sur_les_paves/${blog?.id}/${blog?.slug}`}
												passHref
											>
												<a>Lire plus...</a>
											</Link>
										</div>
									</div>
								</div>
							</li>
						);
					})}

					<div className='col-md-6 regularItems'>
						<div className='row'>
							{blogs?.slice(1, 6).map((blog: any, index: number) => {
								return (
									<li className='col-md-6' key={index}>
										<div className='row'>
											<div className='col-md-12 itemPhoto'>
												<div className='imgWrap'>
													<Link
														href={`/sur_les_paves/${blog?.id}/${blog?.slug}`}
														passHref
													>
														<a>
															<img
																src={blog?.featured_images[0]?.path}
																alt={blog?.title}
															/>
														</a>
													</Link>
												</div>
											</div>
											<div className='col-md-12 itemDescription'>
												<div className='tagWrap'>
													<span className='tag blogTag'>
														{blog.category_id}
													</span>
												</div>

												<div className='titleWrap'>
													<h3>
														{' '}
														<Link
															href={`/sur_les_paves/${blog?.id}/${blog?.slug}`}
															passHref
														>
															<a href=''>{blog?.title}</a>
														</Link>{' '}
													</h3>
													<div className='date'>
														<i className='far fa-clock'></i>
														{moment(blog?.magazine_date).format('MMMM YYYY')}
													</div>
												</div>
											</div>
										</div>
									</li>
								);
							})}
						</div>
					</div>
				</ul>
			</div>
		</div>
	);
}

export default LatestBlog;

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Link from 'next/link';

function FeaturedTabs({ tabs }: { tabs: any }) {
	const [tabIndex, setTabIndex] = useState<number>(0);
	const [data, setData] = useState<any>([]);

	return (
		<div className='featuredTabsSection'>
			<Tabs>
				<div className='container tabsTitles'>
					<TabList>
						{Object.keys(tabs).map((tab, index) => {
							return (
								<Tab key={index}>
									<div className='tabTitle'>
										<img src={`/francais-et-vous/assets/images/icons/${tab}.png`} alt='' />
										<h4>
											{tab == 'games' && 'Jeux et exercices'}
											{tab == 'lessons' && 'Le coin des enseignants'}
											{tab == 'posts' && "L'actualité culturelle"}

											<span>
												{tab == 'games' && 'Sur les galets'}
												{tab == 'lessons' && 'Sous le platane'}
												{tab == 'posts' && 'Sur les pavés'}
											</span>
										</h4>
									</div>
								</Tab>
							);
						})}
					</TabList>
				</div>

				<div className='tabsDetials'>
					<div className='container'>
						{tabs &&
							Object.keys(tabs).map((content: any, index: number) => {
								const tabClassName =
									content == 'games'
										? 'gamesTab'
										: content == 'lessons'
										? 'lessonsTab'
										: content == 'posts'
										? 'blogTab'
										: '';
								const contentPage =
									content == 'games'
										? 'sur_les_galets'
										: content == 'lessons'
										? 'sous_le_platane'
										: content == 'posts'
										? 'sur_les_paves'
										: '';
								const buttonText =
									content == 'games'
										? 'LES JEUX & EXERCICES'
										: content == 'lessons'
										? 'LES FICHES PÉDAGOGIQUES'
										: content == 'posts'
										? '  l’actualité culturelle'
										: '';

								return (
									<TabPanel key={index}>
										<div className={'pannelWrap ' + tabClassName}>
											<div className='intro'>
												<h3>{tabs[content].title}</h3>
												<p>{parse(tabs[content].description)}</p>
											</div>
											<ul className='row items'>
												{tabs[content].data.map(
													(tab: any, tabindex: number) => {
														return tabindex == 0 ? (
															<li
																className='col-md-12 featuredItem'
																key={tabindex}
															>
																<div className='row'>
																	<div className='col-lg-6 col-md-12 itemPhoto'>
																		<div className='imgWrap'>
																			<Link
																				href={`/${contentPage}/${tab.id}/${tab.slug}`}
																				passHref
																			>
																				<a>
																					<img
																						src={tab.image}
																						alt={tab.title}
																					/>
																				</a>
																			</Link>
																		</div>
																	</div>
																	<div className='col-lg-6 col-md-12 itemDescription'>
																		<div className='tagWrap'>
																			<span className='tag blogTag'>
																				{tab.category || tab.level}
																			</span>
																		</div>

																		<div className='titleWrap'>
																			<h3>
																				<Link
																					href={`/${contentPage}/${tab.id}/${tab.slug}`}
																					passHref
																				>
																					<a>{tab.title}</a>
																				</Link>
																			</h3>
																			{tab.date && (
																				<div className='date'>
																					<i className='far fa-clock'></i>
																					{moment(tab.date).format('MMMM YYYY')}
																				</div>
																			)}
																		</div>

																		<div className='describtionWrap'>
																			<p> {parse(tab.description || '')} </p>
																			<Link
																				href={`/${contentPage}/${tab.id}/${tab.slug}`}
																				passHref
																			>
																				<a>Lire plus...</a>
																			</Link>
																		</div>
																	</div>
																</div>
															</li>
														) : 
														content != 'games' ?  ( <li className='col-md-4' key={tabindex}>
																<div className='row'>
																	<div className='col-md-12 itemPhoto'>
																		<div className='imgWrap'>
																			<Link
																				href={`/${contentPage}/${tab.id}/${tab.slug}`}
																				passHref
																			>
																				<a>
																					<img
																						src={tab.image}
																						alt={tab.title}
																					/>
																				</a>
																			</Link>
																		</div>
																	</div>
																	<div className='col-md-12 itemDescription'>
																		<div className='tagWrap'>
																			<span className='tag blogTag'>
																				{tab.category || tab.level}
																			</span>
																		</div>

																		<div className='titleWrap'>
																			<h3>
																				<Link
																					href={`/${contentPage}/${tab.id}/${tab.slug}`}
																					passHref
																				>
																					<a>{tab.title}</a>
																				</Link>
																			</h3>
																			{tab.date && (
																				<div className='date'>
																					<i className='far fa-clock'></i>
																					{moment(tab.date).format('MMMM YYYY')}
																				</div>
																			)}
																		</div>
																	</div>
																</div>
															</li>
														)
														:
														''
													},
												)}
											</ul>

											<div className='actionsContainer'>
												<Link href={'/' + contentPage}>
													<a>{buttonText}</a>
												</Link>
											</div>
										</div>
									</TabPanel>
								);
							})}
					</div>
				</div>
			</Tabs>
		</div>
	);
}

export default FeaturedTabs;

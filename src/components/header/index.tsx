import React, { useEffect, useRef, useState } from 'react';
import Navigation from './shared/navigation';
import Link from 'next/link';
import GUButton from '@components/control/gu-button';
import Socials from '@components/other/socials';
import classNames from 'classnames';
import { renderThemeClass } from '@common/functions';
import HeaderSearch from './shared/search';
import SlideEffect from '@components/animation/slide-effect';
import TopHeader from './shared/topHeader';

const Header = ({
	theme,
}: {
	theme?: 'primary' | 'secondary' | 'third' | 'fourth';
}) => {
	const [isOpenNavMobile, setIsOpenNavMobile] = useState<boolean>(false);
	const [shouldShowSearch, setShouldShowSearch] = useState(false);

	return (
		<>
			<div className='header-spacing' />
			<header className={classNames(renderThemeClass(theme))}>
				<TopHeader />
				<div className='container'>
					<SlideEffect in={shouldShowSearch}>
						<HeaderSearch
							onClose={() => setShouldShowSearch(!shouldShowSearch)}
						/>
					</SlideEffect>
					<div className='header-wrapper'>
						<div className="logoWrapper">
							<Link href='/' passHref>
								<a className='header-logo' href='/'>
									<img src='/francais-et-vous/assets/images/logo.png' alt='Logo' />
								</a>
							</Link>

							<Link href='/' passHref>
								<a className='slogan' href='/'>
									LE FRANÇAIS ET VOUS
									<span> LE MAGAZINE PÉDAGOGIQUE GRATUIT DU CENTRE INTERNATIONAL D'ANTIBES </span>
								</a>
							</Link>
							
						</div>
						
						<Navigation
							isOpenNavMobile={isOpenNavMobile}
							setIsOpenNavMobile={setIsOpenNavMobile}
						/>
						<div className='header-icons'>
							<a
								className='test'
								target='_blank'
								href=' https://www.cia-france.fr/test-francais'
							>
								<i className='fas fa-graduation-cap'></i>
								Test de français
							</a>

							<GUButton
								onClick={() => setShouldShowSearch(!shouldShowSearch)}
								color={theme}
								className='header-icons__search header-icons__item'
								variant='link'
							>
								<i className='fas fa-search' />
							</GUButton>
							<GUButton
								color={theme}
								onClick={() => setIsOpenNavMobile(!isOpenNavMobile)}
								className='header-icons__item header-icons__menu-controller resNavController'
								variant='link'
							>
								<i className='fas fa-bars' />
							</GUButton>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

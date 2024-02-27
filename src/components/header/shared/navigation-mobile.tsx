import React, { useState } from 'react';
import data from './navigation-data';
import Link from 'next/link';
import GUButton from '@components/control/gu-button';
import SlideEffect from '@components/animation/slide-effect';

import Socials from '@components/other/socials';
import { AppState } from "@store";
import { useSelector } from 'react-redux';

const NavigationMobile = ({ mainMenu, theme }: { theme?: 'primary' | 'secondary' | 'third' | 'fourth', mainMenu: any }) => {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const { data: socialsData } = useSelector((state: AppState) => state.layout.socials);

  return (
    <nav className="navigation-mobile">
      <ul>
        {mainMenu.map((menu: any, index: number) => (
          <li key={index} className="nav-item">
            {
              menu.submenu_list && menu?.submenu_list.length > 0 ? <a >
                {menu.title}
              </a> :
                <Link href={menu.url || "/"} passHref>
                  <a >
                    {menu.title}
                  </a>
                </Link>
            }
            {menu.submenu_list && menu?.submenu_list.length > 0 && (
              <>
                <GUButton
                  onClick={() => {
                    currentIndex === index ? setCurrentIndex(-1) : setCurrentIndex(index);
                  }}
                  className="dropdown-menu__controller">
                  <i className="fas fa-plus"></i>
                </GUButton>
                <SlideEffect in={currentIndex === index}>
                  <ul className="dropdown-menu">
                    {menu?.submenu_list.map((subMenu: any, subMenuIndex: number) => {
                      return <li key={subMenuIndex}>
                        <Link href={subMenu.url} passHref>
                          <a>
                            {subMenu.title}
                          </a>
                        </Link>
                      </li>


                    })}
                  </ul>
                </SlideEffect>
              </>
            )}
          </li>
        ))}

        <li className="nav-item">
          <a className='test' target="_blank" href="https://www.cia-france.fr/test-francais">
            <i className="fas fa-graduation-cap"></i>
            Test de français
          </a>
        </li>

        <li className='mobileNavSocials'>
          <div className="social">
            <Socials data={socialsData} color={theme} className="header-icons__item" spacing={20} variant="link" />

          </div>
        </li>

      </ul>
    </nav>
  );
};

export default NavigationMobile;

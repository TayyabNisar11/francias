import React, { useEffect, useState } from 'react';
import data from './navigation-data';
import Link from 'next/link';
import NavigationMobile from './navigation-mobile';
import SlideEffect from '@components/animation/slide-effect';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { AppState } from "@store"
import { useSelector } from "react-redux";

interface NavigationProps {
  isOpenNavMobile: boolean;
  setIsOpenNavMobile: (p: boolean) => void;
}

const Navigation = ({ isOpenNavMobile, setIsOpenNavMobile }: NavigationProps) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname && isOpenNavMobile) {
      setIsOpenNavMobile(false)
    }
  }, [router.pathname])

  const { data: mainMenu } = useSelector((state: AppState) => state.layout.mainMenu);

  useEffect(() => {
    const onWindowResize = () => {
      if (!window.matchMedia('(max-width: 768px)').matches) {
        setIsOpenNavMobile(false);
      }
    };

    window?.addEventListener('resize', onWindowResize);

    return () => window?.removeEventListener('resize', onWindowResize);
  }, []);

  return (
    <>
      <nav>
        <ul>
          {mainMenu?.map((menu, index) => {
            return (
              <li
                key={index}
                className={classNames('nav-item', {
                  // active: menu.active?.find((o) => router?.pathname.startsWith(o)) || item.link === router?.pathname,
                })}>
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
                  <ul className="dropdown-menu">
                    {menu?.submenu_list.map((subMenu:any, subMenuIndex) => {
                      return <li key={subMenuIndex}>
                        <Link href={subMenu.url} passHref>
                          <a>
                            <span> 
                              {subMenu.subtitle}
                              <span> 
                                {subMenu.title} 
                              </span>

                            </span>
                            
                          </a>
                        </Link>
                      </li>


                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <SlideEffect in={isOpenNavMobile}>
        <NavigationMobile mainMenu={mainMenu} />
      </SlideEffect>
    </>
  );
};

export default Navigation;
import React, { useState, useEffect } from "react";

import GUButton from '@components/control/gu-button';
import Socials from '@components/other/socials';

import { AppState } from "@store"
import { useSelector } from 'react-redux';


function TopHeader({ theme }: { theme?: 'primary' | 'secondary' | 'third' | 'fourth' }) {

  const { data } = useSelector((state: AppState) => state.layout.socials);
  const [barVisibility, setBarVisibility] = useState(true);
  const [scrollPosition, setSrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    position >= 120 ? setBarVisibility(false) : setBarVisibility(true);
    setSrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);




  const [isOpenNavMobile, setIsOpenNavMobile] = useState<boolean>(false);
  const [shouldShowSearch, setShouldShowSearch] = useState(false);

  return (
    <div id="topBar" className={`topBar ${barVisibility ? "showBar" : "hideBar"}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-9 topHeaderTxt">
            <span> LE FRANÇAIS ET VOUS </span> : RESSOURCES POUR PROFESSEURS , ACTUALITÉS CULTURELLES , JEUX ET EXERCICES LUDIQUES
          </div>

          <div className="col-lg-4 col-md-3 header-icons">
            <div className="social">
              <Socials data={data} color={theme} className="header-icons__item" spacing={20} variant="link" />
              {/* <GUButton
                color={theme}
                onClick={() => setIsOpenNavMobile(!isOpenNavMobile)}
                className="header-icons__item header-icons__menu-controller"
                variant="link">
                <i className="fas fa-bars" />
              </GUButton> */}
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default TopHeader;
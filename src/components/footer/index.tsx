import { ThemeVariation } from '@common/enum';
import { renderThemeClass } from '@common/functions';
import GUButton from '@components/control/gu-button';
import HeaderTitleLine from '@components/other/header-title-line';
import Socials from '@components/other/socials';
import PostTiny from '@components/post/post-tiny';
import { AppState } from '@store';
import { handleFooterPosts } from '@store/thunk/post';
import classNames from 'classnames';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from "next/link"

interface FooterColProps {
  title: string;
  children: ReactNode;
  colClassName?: string;
  className?: string;
}

const StyledButton = styled(GUButton)`
  margin-bottom: ${15 / 16}em;
  margin-right: ${15 / 16}em;
`;

const FooterCol = ({ title, children, className, colClassName }: FooterColProps) => (
  <div className={colClassName || 'col-12 col-md-6 col-lg-4'}>
    <div className={classNames('footer-col', className)}>
      <HeaderTitleLine title={title} />
      {children}
    </div>
  </div>
);

interface FooterProps {
  theme?: ThemeVariation;
}

const Footer = ({ theme }: FooterProps) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.layout.socials);

  useEffect(() => {
  }, []);

  return (
    <footer className={classNames(renderThemeClass(theme))}>
      <div className="footerContentContainer">
        <div className="container">
          <div className="footer-content">

            <div className="row">
              <div className="col-md-4 fev">
                <div className="footerLogoWrapper">
                  <img src="/francais-et-vous/assets/images/logo-w.png" alt="Le Français et vous" />
                </div>
                <h4>Le français et vous </h4>
                <p> Notre magazine se veut un site ludique dédié à l'apprentissage du français langue étrangère.
                  Les professeurs y trouveront des ressources pédagogiques pour la classe: <strong>  sous le platane. </strong>
                  Ceux qui apprennent le français pourront améliorer leurs connaissances
                  grâce à des jeux et exercices de leur niveau: <strong>  sur les galets. </strong>  Pour tous,
                  un rendez-vous mensuel avec nos coups de cœur pour l'actualité culturelle: <strong> sur les pavés. </strong>
                </p>
                <Link passHref href='/cms/apropos'>
                  <a>
                    A PROPOS DE NOUS
                  </a>
                </Link>
              </div>

              <div className="col-md-4 cia">
                <div className="footerLogoWrapper">
                  <img src="/francais-et-vous/assets/images/logocia.png" alt="CIA" />
                </div>

                <h4>Le Centre International d'Antibes </h4>
                <p>
                  30 ans d’expérience dans l’apprentissage du Français Langue Etrangère.
                  Ecole agréée par le gouvernement français
                  (le Ministère de la Jeunesse et des Sports, le Ministère de l’Enseignement...).
                  97% de réussite au DELF, preuve d’excellence de notre équipe enseignante.
                  Destination de rêve avec sa mer bleu azur et ses 300 jours d’ensoleillement par an.
                  Quelque 100 000 étudiants nous ont déjà fait confiance !
                </p>
                <a href="https://www.cia-france.fr" target='_blank'>
                  NOTRE ÉCOLE DE FRANÇAIS
                </a>
              </div>

              <div className="col-md-4">
                <div className="newsletterCol">
                  <div className="row">
                    <div className="col-lg-9 col-md-12 newsletterLinks">
                      <Link href={'/page/lettre-d-information'} passHref >
                        <a>
                          lettre d’informations
                          <i className="fas fa-long-arrow-right"></i>
                        </a>
                      </Link>

                      <Link passHref href={'/page/nous-contacter'}>
                        <a>
                          nous contacter
                          <i className="fas fa-long-arrow-right"></i>
                        </a>
                      </Link>

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 followUs">
                      <h5>
                        suivez-nous
                      </h5>

                      <div className="social">
                        <Socials data={data} color={theme} className="header-icons__item" spacing={20} variant="link" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="copyRightContainer">
        <div className="container">
          <div className="copyright">
            <p>
              <span>  © Le Centre International d'Antibes   |</span>
              <Link passHref href={`/cms/mentions-legales`} >
                <a> MENTIONS LÉGALES  </a>
              </Link> -
              <Link passHref href={`/cms/politiques-de-confidentialite`}>
                <a> POLITIQUE DE CONFIDENTIALITÉ </a>
              </Link> -
              <Link passHref href={`/cms/cgv-cgu`}>
                <a> CGV-CGU  </a>
              </Link>  -

              <a href="" className='creation'> <span> CRÉATION </span> netservex</a>
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

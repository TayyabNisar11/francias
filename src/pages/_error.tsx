
import React from 'react';
import GUButton from '@components/control/gu-button';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';


const Error = () => {
  return (
    <>
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
            Accueil
          </BreadcrumbItem>
          <BreadcrumbItem>Erreur</BreadcrumbItem>
        </Breadcrumb>
        <div className="error-404">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <div className="error-404__content">
                <h2>404 </h2>
                <p>Pas de résultat disponible. Réessayez une nouvelle recherche?</p>
                <GUButton size="large"
                  variant="contained"
                  shape="round"
                  href="/"
                  className='bkHome'
                >
                  RETOUR À LA PAGE D’ACCUEIL
                </GUButton>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="error-404__image">
                <img src="/francais-et-vous/assets/images/icons/404_animation.gif" alt="404 error image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Instagram /> */}

    </>
  );
};

export default Error;

import React from 'react'
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import styled from 'styled-components';
import DownloadSidebar from '@components/sections/sidebars/downloadSidebar';
import AddBanner from '@components/other/ad-baner';


function Contenu() {
  return (
    <div className='container'>
         <Breadcrumb>
                <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                    Accueil
                </BreadcrumbItem>
                <BreadcrumbItem>Contenu Formations</BreadcrumbItem>

            </Breadcrumb>


            <div className="contenuContainer">

                <div className="downloadFormWrapper">
                    <DownloadSidebar />
                </div>
                
                
                
                <div className="adv advContainer">
                    <AddBanner banner="propos" />
                </div>
            </div>

           




    </div>
  )
}

export default Contenu
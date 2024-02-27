import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import styled from 'styled-components';

import FormationContent from '@components/pages/formation/content';
import SubcribeCard from '@components/other/subscribeBanner';


const FormationContainer = styled.div`
margin-bottom: ${80 / 14}rem;
margin-top: ${80 / 14}rem;
`



const Formation = () => {
    return (
        <div className='container'>
            <Breadcrumb>
                <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                    Accueil
                </BreadcrumbItem>
                <BreadcrumbItem>formations</BreadcrumbItem>

            </Breadcrumb>
            <FormationContainer>
                <div className='formation'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-lg-9'>
                            <FormationContent />
                        </div>
                        <div className='col-sm-12 col-md-4 col-lg-3'>
                            <SubcribeCard />
                        </div>
                    </div>
                </div>
            </FormationContainer>
        </div>
    )
}

export default Formation
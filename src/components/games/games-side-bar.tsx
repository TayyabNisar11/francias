import React from 'react';
import PostTrending from '@components/post/post-trending';
import styled from 'styled-components';
import TrainingCourses from '@components/sections/sidebars/downloadSidebar';
import AddBanner from '@components/other/ad-baner';

const StyledPostTrending = styled(PostTrending)`
  &:not(:last-child) {
    margin-bottom: ${30 / 14}rem;
  }
`;
const GamesSideBar = ({ theme, hideAdd, featured }: { theme?: any, hideAdd?: boolean, featured: any }) => {
    return (
        <div className='game-sidebar my-4'>
            <div className='game-sidebar_courses'>
                <TrainingCourses />
            </div>
            {
                featured && featured.length > 0 && <div className='game-sidebar_popular my-4'>
                    <h1>LES + LUS</h1>
                    {featured?.map((post: any, index: number) => (
                        <StyledPostTrending page="sur_les_galets" tag="gameTag" theme={theme} key={index} data={post} />
                    ))
                    }
                </div>
            }

            {!hideAdd && <div className='game-sidebar_add my-4'>
                <AddBanner banner="game_listing" />
            </div>}
        </div>
    )
}

export default GamesSideBar;

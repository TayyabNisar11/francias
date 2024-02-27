import React from 'react';
import PostTrending from '@components/post/post-trending';
import styled from 'styled-components';



const StyledPostTrending = styled(PostTrending)`
  &:not(:last-child) {
    margin-bottom: ${20 / 14}rem;
  }
`;

function RelatedPosts({ featured }: any) {
    return (
        <div className="relatedPosts">
            <h4 className="blockTitle">
                <span>LES + LUS </span>
                <i></i>
            </h4>
            {
                featured?.map((post: any, index: number) => (
                    <StyledPostTrending page="sous_le_platane" tag="lessonTag" theme={""} key={index} data={post} />
                ))
            }

        </div>
    )
}

export default RelatedPosts
import React from 'react';

import styled from 'styled-components';

import PostDetails from 'containers/PostDetails';

const PostWrapper = styled.div`
    max-width: 1440px;

    margin-left: auto;
    margin-right: auto;
    padding: 64px 32px;
`;

const Post = ({ match }) => (
    <PostWrapper><PostDetails id={match.params.id}/></PostWrapper>
);

export default Post;
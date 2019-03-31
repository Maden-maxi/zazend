import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';

import { getPosts, showAlert, switchMenu } from 'actions/index';
import { STATUS } from 'constants/index';

import { Link } from 'react-router-dom';

import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const PostsGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.2rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  transition: all .3s;
  &:hover {
    background: ${appColor};
    color: #fff;
  }
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

export class Posts extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getPosts());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('posts.posts.status', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.posts.posts.message, { variant: 'danger' }));
    }
  }

  render() {
    const { posts } = this.props;
    const data = posts.posts.data || [];
    let output;

    if (posts.posts.status === STATUS.READY) {
      if (data.length) {
        output = (
          <PostsGrid data-testid="PostsGrid">
            {posts.posts.data.map(d => (
              <li key={d.id}>
                <Item to={'post/' + d.id}>
                  <ItemHeader>
                    <Heading as="h5" lineHeight={1}>
                      {d.title}
                    </Heading>
                  </ItemHeader>
                  <Paragraph>{d.body}</Paragraph>
                </Item>
              </li>
            ))}
          </PostsGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="Posts" data-testid="PostsWrapper">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps)(Posts);

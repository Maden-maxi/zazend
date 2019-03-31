import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import treeChanges from 'tree-changes';
import styled from 'styled-components';

import { getPostDetails, showAlert, switchMenu } from 'actions/index';
import { STATUS } from 'constants/index';

import Loader from 'components/Loader';
import { appColor } from 'modules/theme';
import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
const { spacer } = utils;

const PostWrapper = styled.div`
  .comment {
    margin-bottom: ${spacer(3)};
    border-radius: 0.2rem;
    border: solid 0.2rem ${appColor};
  }
  .comment, .post-body {
    padding: ${spacer(3)};
  }
`;

export class PostDetails extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      postDetails: PropTypes.object.isRequired,
    };
    componentDidMount() {
      const { id } = this.props;
      const { dispatch } = this.props;
      console.log(getPostDetails(id));
      dispatch(getPostDetails(id));
    }
    componentWillReceiveProps(nextProps) {
      const { dispatch } = this.props;
      const { changedTo } = treeChanges(this.props, nextProps);
  
      if (changedTo('postDetails.details.status', STATUS.ERROR)) {
        dispatch(showAlert(nextProps.postDetails.details.message, { variant: 'danger' }));
      }
    }
    render() {
      const { postDetails } = this.props;
      const data = postDetails.details.data || [];
      console.log(data)
      let output;
      if (postDetails.details.status === STATUS.READY) {
        const {details, comments, user} = data;
        output = (
          <PostWrapper>
            <h1 className="text-primary">{details.title}</h1>
            <h2>Author: <i className="text-primary">{user.username}</i></h2>

            <p className="post-body text-white bg-primary">{details.body}</p>

            <h3>Comments: </h3>
            <div className="comments">
            {comments.map(c => (
              <div class="comment bg-primary" key={c.id}>
                <h3 className="text-white text-primary">{c.name}</h3>
                <h4>{c.email}</h4>
                <p>{c.body}</p>
              </div>
            ))}
            </div>
          </PostWrapper>
        );
      } else {
        output = <Loader block />;
      }
      console.log(postDetails);
      return output;
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { postDetails: state.postDetails };
}
  
export default connect(mapStateToProps)(PostDetails);
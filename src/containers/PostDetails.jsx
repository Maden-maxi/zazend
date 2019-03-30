import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';

import { getPostDetails, showAlert, switchMenu } from 'actions/index';
import { STATUS } from 'constants/index';

import { Link } from 'react-router-dom';

import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Image,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const Comment = ({props}) => (
  <div>
    <h3>{props.comment}</h3>
    <h4>{props.comment}</h4>
    <p>{props.comment}</p>
  </div>
);

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
          <div>
            <h1>{details.title}</h1>
            <h3>Author: {user.username}</h3>
            <p>{details.body}</p>
            <div className="comments">{comments.map(c => (
              <div key={c.id}>
                <h3>{c.name}</h3>
                <h4>{c.email}</h4>
                <p>{c.body}</p>
              </div>
            ))}</div>
          </div>
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
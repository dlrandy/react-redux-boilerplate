import React , { PropTypes }from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import classnames from'classnames';
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../../actions/articles';
if (process.env.BROWSER) var styles = require('./Home.scss');
// http://mobxjs.github.io/mobx/best/stateless-HMR.html
class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.displayName = 'Home';
  }
  static propTypes = {
     user: PropTypes.object
  }
  componentWillMount() {
    this.props.fetchPostsInComponent();       
  }

  render() {
  console.log(this.props.postsList);
    return (
      <div>
        <Helmet title="Home"/>
          <p className="test">This  {this.state} fdfd yuyuystarter boilerplate app uses the following technologies:</p>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
	console.log(state);
	return {
		postsList: state.articles.postsList
	};
}

const mapDispatchToPorps= (dispatch) =>{
	return {
		fetchPostsInComponent: () =>{
			fetchPosts().then((response) => {
        console.log(response);
            dispatch(fetchPostsSuccess(response));
          });
			
		}
	};
}
const PostsListsContainer =connect(mapStateToProps, mapDispatchToPorps)(Home);
export default PostsListsContainer;
import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { SubMenu, RecommandUser, RecommandWeibo, WeiBo } from '../../components';
import { fetchArticles } from '../../actions/posts';
 
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) =>{
    dispatch(fetchArticles());
  }
}])
@connect(
  state =>({
  	articles: state.posts.articles
  })
)
class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Articles';
  }
  static propTypes = {
  	articles: PropTypes
  };
  render() {
  	const { articles } = this.props;
    return <div>
    <Helmet title="Articles"/>
          <Row className="">
            <Col span="18" key="home-row-1">
              <SubMenu />
              {articles && articles.length &&<ul>
                {
                	articles.map((article_user) =>{
                      const { Weibo, UserInfo } = article_user;
                      return <WeiBo Weibo={Weibo} UserInfo={UserInfo} />
                	})
                }
              </ul>
          }
            </Col>
            <Col span="6" key="home-row-2">
            <RecommandUser />
            <Affix offsetTop={3}>
               <RecommandWeibo />
            </Affix>
            </Col>
          </Row>
    </div>;
  }
}
export default Articles;

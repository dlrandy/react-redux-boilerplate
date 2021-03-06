import React , { PropTypes }from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import classnames from'classnames';
import { asyncConnect } from 'redux-async-connect';


import QCircleList from '../QCircleList/QCircleList';
import Ueditor from '../../components/Ueditor/Ueditor';
import Shuoshuo from '../Shuoshuo/Shuoshuo';
import { SubMenu, RecommandUser, RecommandWeibo } from '../../components';
import { Row, Col, Affix } from 'antd';
if (process.env.BROWSER) var styles = require('./Home.scss');
// http://mobxjs.github.io/mobx/best/stateless-HMR.html
// @asyncConnect([{
//   deferred: true,
//   promise: ({store: {dispatch, getState}}) =>{
//    if(!isShuoShuoLoaded(getState())){
//      return dispatch();
//    }
//   }
// }])
class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.displayName = 'Home';
  }
  static propTypes = {
     user: PropTypes.object
  }

  render() {
   let styleOfUe = {
    margin: "0 auto"
   };
    return (
      <div>
         <Helmet title="Home"/>
          <Row className="">
            <Col span="18" key="home-row-1">
              <SubMenu />
              <QCircleList />
              <Ueditor value="" style={styleOfUe} id="editorContainer" width="700" height="80" /> 
              <Shuoshuo />
            </Col>
            <Col span="6" key="home-row-2">
            <RecommandUser />
            <Affix offsetTop={3}>
               <RecommandWeibo />
            </Affix>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Home;

// const mapStateToProps = (state) =>{
// 	const { postsList } = state.articles;
// 	return {
// 		postsList
// 	};
// }

// const mapDispatchToPorps= (dispatch) =>{
// 	return {
// 		fetchPostsInComponent: () =>{
// 			fetchPosts().then((response) => {
//         console.log(response);
//             dispatch(fetchPostsSuccess(response));
//           });
			
// 		}
// 	};
// }

// export default connect(mapStateToProps, mapDispatchToPorps)(Home);
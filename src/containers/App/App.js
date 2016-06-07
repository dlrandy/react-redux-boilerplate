import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Row, Col, Spin } from 'antd';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';

import { LogReg } from '../../components';
import { TopRightMenu } from '../../containers';
import { isAuthLoaded, loadAuth } from '../../actions/auth';

import styles from './App.scss';

  
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({auth: state.auth}),
  { pushState: push})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
  }
  static propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,

  // location: PropTypes.object.isRequired
  };
  // https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.q1lr5wojy

  static contextTypes = {
  // router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
  };
  componentWillReceiveProps(nextProps) {
    console.log('this.props.auth', this.props.auth);
    console.log('nextProps.', nextProps.auth);
    // if (!this.props.user && nextProps.user) {
    //   console.log('login success');
    // } else if (this.props.user && nextProps.user) {
    //   console.log('login out');
    // }
  }
  componentWillMount() {
        // let guest = cookie.load("guest");
        // console.log("------------------>",guest);
        // if(!guest) {
        //     fetch('/api/guest/Login',{
        //       credentials: 'same-origin'
        //     }).then(function(res){
        //       console.log("=>>>>>>>>>>>>>>>>>>>>>>>>", res);
        //     }).catch(function(res){
        //       console.log("=>>>>>>>>>>>>>>>>>>>>>>>>", res);
        //     });
        //   }
  }

  render() {
    const { auth } = this.props;
    // const jwtToken = sessionStorage.getItem('jwtToken');应该在action里
    // const logoImg = require('./img/logo.png');
    // <img src={logoImg} />
    return (
        <div className={styles["ant-layout-top"]}>
          <div className={styles["ant-layout-header"]}>
            <div className={styles["ant-layout-wrapper"]}>
              <Row type="flex" justify="space-around" align="middle">
                <Col span="8">
                  <Link to="/">
                    <div className={styles["ant-layout-logo"]}>
                       
                    </div>
                  </Link>
                </Col>
                <Col span="10" > gop</Col>
                <Col span="6">
                  <div>
                    { !(auth.user)  && <LogReg /> }
                    { (auth.user) && <TopRightMenu /> }
                  </div>
                </Col>
              </Row>
              
            </div>
          </div>
          <div className={styles["ant-layout-wrapper"]}>
            <div className={styles["ant-layout-container"]}>
              <div>
                { this.props.children }
              </div>
            </div>
          </div>
          <div className={styles["ant-layout-footer"]}>
          期货圈 版权所有 © 2016 由文华财经产品开发二部支持
          </div>
        </div>
      
    );
  }
}

// App.propTypes = {
//   user: PropTypes.object,
//   children: PropTypes.object.isRequired,
//   // dispatch: PropTypes.func.isRequired,

//   // location: PropTypes.object.isRequired
// };
// // https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.q1lr5wojy

// App.contextTypes = {
//   // router: PropTypes.object.isRequired,
//   store: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(
  mapStateToProps
)(App);


// export default class App extends Component {
//   render() {

//   }
// }
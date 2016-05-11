import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Row, Col, Spin } from 'antd';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

import { LogReg } from '../../components';
import { TopRightMenu } from '../../containers';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
  }
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
        let guest = cookie.load("guest");
        console.log("------------------>",guest);
        if(!guest) {
            fetch('/api/guest/Login',{
              credentials: 'same-origin'
            }).then(function(res){
              console.log("=>>>>>>>>>>>>>>>>>>>>>>>>", res);
            }).catch(function(res){
              console.log("=>>>>>>>>>>>>>>>>>>>>>>>>", res);
            });
          }
  }

  render() {
    const { auth } = this.props;
    const jwtToken = sessionStorage.getItem('jwtToken');
    return (
      <div>
        <div className="ant-layout-top">
          <div className="ant-layout-header">
            <div className="ant-layout-wrapper">
              <Row type="flex" justify="space-around" align="middle">
                <Col span="8">
                  <Link to="/">
                    <div className="ant-layout-logo" />
                  </Link>
                </Col>
                <Col span="10">
                
                </Col>
                <Col span="6">
                  <div>
                    { !(auth.user) && !jwtToken && <LogReg /> }
                    { (auth.user|| jwtToken) && <TopRightMenu /> }
                  </div>
                </Col>
              </Row>
              
            </div>
          </div>
          <div className="ant-layout-wrapper">
            <div className="ant-layout-container">
              <div>
                { this.props.children }
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
          期货圈 版权所有 © 2016 由文华财经产品开发二部支持
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,

  // location: PropTypes.object.isRequired
};
// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.q1lr5wojy

App.contextTypes = {
  // router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

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
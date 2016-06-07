import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Alert, Spin} from 'antd';
import  AttBtn  from '../AttBtn/AttBtn';

import { imgConf } from '../../utils/config';
import { 
    fetchRecommanders,
    fetchRecommandersSuccess,
    fetchRecommandersFailure } from '../../actions/recommander';

class RecommandUser extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RecommandUser';

    }
    nextClick(){

    }
    prevClick(){
 
    }

    renderUser(recommanders /*CutPage, ExistsNickname, List*/){
      return recommanders && recommanders.List && recommanders.List.map(function (user, inx) {
          return <li key={"recommander"+ inx}>
                <Row>
                  <Col span="5">
                        <img src={user.FacePath ? user.FacePath + imgConf.MIDDLE_HEAD: false || '/static/uploads/4.gif'} />
                        <AttBtn userId={user.UserID}/>
                  </Col>
                  <Col span="19">
                     <strong>{user.NickName}</strong>
                     <div>
                        <span>发表({user.WeiboCount})</span><span>粉丝({user.FansCount})</span>
                        <p>身份认证：{user.Remark}</p>
                     </div>
                  </Col>
                </Row>
          </li>;
      });
    }
    componentWillMount() {
      // this.props.fetchRecommandersInComponent(this.props.auth.user);      
    }

    render() {
        const { recommanders, error, loading} = this.props.recommander;
        console.log("==>>",this.props);
        if (loading) {
            return <div> <Spin /> </div>;
        }else if(error) {
            return <Alert message={error.message || error} type="error" />;
        }
        if (recommanders.length == 0) {
             return <div> <Spin /> </div>;
        }
        return <div>
        <div>可能感兴趣的人 上一组 下一组</div> 
        <ul>
          {this.renderUser(recommanders)}
        </ul>
        </div>;
    }

}

RecommandUser.contextTypes = {
  store: PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
  const { recommander, auth } = state;
  return {
    recommander,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {

return {
    fetchRecommandersInComponent: (authed) => {
    dispatch( fetchRecommanders(authed)).then((res) => {
        console.log('==================>>>>>>', res)
    res.payload.status == 200 ? dispatch(fetchRecommandersSuccess(res.payload)) : dispatch(fetchRecommandersFailure(res.payload));
    }).catch( error => {
        console.log("error====>",error);
        dispatch(fetchRecommandersFailure(error));
    });
 }
}
};
export default connect(mapStateToProps, mapDispatchToProps)(RecommandUser);

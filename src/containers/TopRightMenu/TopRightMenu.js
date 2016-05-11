import React from 'react';
import { Badge, Icon, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchUserInfoSuccess, fetchUserInfoFailure,
fetchNewMessage, fetchNewMessageSuccess, fetchNewMessageFailure } from '../../actions/profile';

class CustomMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CustomMenu';
    }
    render() {
        return <Menu>
              <Menu.Item>
               <a href="/settings/">个人设置</a>
             </Menu.Item>
             <Menu.Item>
               <a href="/person/ban/">黑名单</a>
             </Menu.Item>
             <Menu.Item>
               <a href="/settings/password/">修改密码</a>
             </Menu.Item>
             <Menu.Item>
               <a href="http://www.tmall.com/">退出</a>
             </Menu.Item>
        </Menu>;
    }
}



class TopRightMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'TopRightMenu';
    }

    componentWillMount() {
         this.props.fetchUserInfoInComponent();
         this.props.fetchNewMessageInComponent();
    }

    render() {
    	const {  userInfo, newMessages } = this.props;
        return <div>
        	<a href="#"><Badge count={newMessages&&newMessages[0]&&newMessages[0].count? newMessages[0].count:0}>
        		<Icon type="notification" /> 
        	</Badge></a>
            <Dropdown overlay={<CustomMenu />}>
            	<a href='/person/'>
            		<img src={userInfo&&userInfo.FacePath?userInfo.FacePath : '/static/uploads/3.png'} />
            		<span>{userInfo.NickName}</span>
            	</a>
            </Dropdown>
        </div>;
    }
}
const mapStateToProps = (state) => {
	const { userInfo, newMessages} = state.profile;
	return {
		newMessages,
		userInfo, 
	};
};

const mapDispatchToProps = (dispatch) => {
return {
	fetchNewMessageInComponent: () =>{
		 dispatch( fetchNewMessage()).then((res) => {
        console.log('==================>>>>>>+', res)
    res.payload.status == 200 ? dispatch(fetchNewMessageSuccess(res.payload)) : dispatch(fetchNewMessageFailure(res.payload));
    }).catch( error => {
        console.log("error====>",error);
        dispatch(fetchRecommandWeiboFailure(error));
    });

	},
	fetchUserInfoInComponent: () => {
       dispatch( fetchUserInfo()).then((res) => {
        console.log('==================>>>>>>=', res)
    res.payload.status == 200 ? dispatch(fetchUserInfoSuccess(res.payload)) : dispatch(fetchUserInfoFailure(res.payload));
    }).catch( error => {
        console.log("error====>",error);
        dispatch(fetchUserInfoFailure(error));
    });
	},
} 

};

export default connect(mapStateToProps, mapDispatchToProps)(TopRightMenu);

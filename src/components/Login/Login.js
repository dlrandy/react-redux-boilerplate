import React , { PropTypes }from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { login, loginSuccess, loginFailure } from '../../actions/auth';
import { LOGIN, LOGIN_RESET } from '../../constants/auth';
const FormItem = Form.Item;
 

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
        this.state = {
        	loading: false,
        	visible: false
        };
        console.log(props,'sddddddddddddddddddddd')
        // this.state.visible = props.visible; //not work
        // this.handleOk.bind(this); wrong
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.currentFetch = null;

    }
     handleSubmit() {
      console.log('收到表单值：', this.props.form.getFieldsValue());
      // login( this.props.form.getFieldsValue());
      this.props.dispatch({
      	type: LOGIN
      });
      	this.currentFetch = this.props.signInUser(this.props.form.getFieldsValue(), this.props.dispatch);
      	this.currentFetch && this.currentFetch.then(() => {
      		this.setState({ loading: false});
            this.props.reset();
      	});
      	
   
      
      
      
      // this.props.reset();
    }

    handleOk(e){
    	e.preventDefault();
    	this.setState({ loading: true});
    	this.handleSubmit();
    // 	setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
      
    	
    	// this.state.loading = true;
    	// Login.js:21 Uncaught TypeError: Cannot set property 'loading' of undefined
    }
    handleCancel(){
    	this.currentFetch && this.currentFetch.abort();
    	this.setState({ visible: false});
    	this.props.reset();
    	this.setState({ loading: false});
    	this.props.dispatch({
    		type: LOGIN_RESET
    	})
    	// Login.js?26dd:21 Uncaught TypeError: this.setState is not a function
    }
	componentWillMount() {
	      console.log(this.state, this.props)
	}
	componentWillReceiveProps(nextProps) {
	    console.log(nextProps); 
	    this.state.visible = nextProps.visible; //这里需要改变
	    // this.props.reset = nextProps.reset;这里不需要改变
	}
    render() {
    	// console.log(this.state, this.props, this.state.visible = this.props.visible); wrong always rendering
    	const { getFieldProps } = this.props.form;
    	const { auth } = this.props;
        const formItemLayout = {
        	labelCol: { span: 6},
        	wrapperCol: { span: 14},
        };
        return (
        	<div>
        		<Modal ref="modal" visible={this.state.visible} 
        		title="登录期货圈" onOk={this.handleOk} onCancel={this.handleCancel}
        		footer={ [
						<Button key="cancelLogin" type="ghost" size="large" onClick={this.handleCancel} >
						取消
						</Button>,
						<Button key="login" type="primary" loading={auth.loading} size="large" onClick={this.handleOk} >
						登录
						</Button>        				
        			]}> 
        			<Form horizontal onSubmit={this.handleSubmit}>
                       <FormItem { ...formItemLayout} 
                         label="账户：">
                         <Input placeholder="请输入您的文华ID或昵称"
                           {...getFieldProps('userName')} />
                       </FormItem>
                       <FormItem { ...formItemLayout}
                         label="密码：">
                         <Input type="password" placeholder="请输入密码"
                           {...getFieldProps('password')} />
                       </FormItem>
                       <FormItem { ...formItemLayout} label={"  "}>
                         <label >
                           <Checkbox
                             {...getFieldProps('agreement')} />记住我
                         </label>
                       </FormItem>
                       
                   </Form>
        				
        		</Modal>
        	</div>
        );

    }
}

Login = Form.create()(Login);
// Login.propTypes = {
// 	visible: PropTypes.bool
// };
// <Button type="primary" htmlType="submit">登录</Button>

Login.contextTypes = {
	router: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired,
};
Login.propTypes = {
    auth: PropTypes.object,
    // loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state, ownProps) {
	return {
		auth: state.auth,
	};
}
const signInUser = (values, dispatch) => {
	return new Promise( (resolve, reject) => {
		dispatch(login(values)).then((res) => {
			console.log('========>',res);
			if (res.payload.status != 200) {
				throw new Error("signin error!");
			}
			return res.payload.json();
		}).then((res) => {
			let data = res;
			if (data.status == false) {
				return dispatch(loginFailure(data));
			} else {
			    dispatch(loginSuccess(data));
			}
		}).catch((error) => {
			const response = error.response;
			if (response === undefined) {
				dispatch(loginFailure(error));
			}else {
				dispatch(loginFailure(error));
			}
		});
	});
};
const mapDispatchToProps = (dispatch) => {
	return {
		signInUser,
		resetLogin: () => {
			// dispatch( resetUserFields());
		},
		dispatch,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//用了redux 就可以省略了自己传递状态
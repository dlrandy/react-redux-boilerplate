import React from 'react';
import { Button, Icon } from 'antd';
import { Login } from '../index';
const ButtonGroup = Button.Group;
class LogReg extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LogReg';
        this.state = {
            login: false,
            register: false,
        };
        this.register = this.register.bind(this);
        this.resetLogReg =  this.resetLogReg.bind(this);
    }
    login(e){
        e.preventDefault();
    	console.log(this,this.state, this.props)
        this.setState({
            login: true,
            register: false,
        });
    }
    register(e){
        e.preventDefault();
    }
    resetLogReg(){
        this.setState({
            login: false,
            register: false,
        });
    }
    render() {
        console.log(this.state, this.props);
        return (<div>
        	<ButtonGroup>
			  <Button type="primary" onClick={this.login.bind(this)} >
			    <Icon type="" />
			    <span>登录</span>
			  </Button>
			  <Button type="primary" onClick={this.register} >
			    <Icon type="" />
			    <span>注册</span>
			  </Button>
        	</ButtonGroup>
            <Login visible={ this.state.login} reset={ this.resetLogReg} />
        	</div>
    );
    }
}

export default LogReg;

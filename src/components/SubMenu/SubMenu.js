import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router';
class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SubMenu';
    }
    render() {
    	const currentTab = this.props.currentTab || 1;
        return <div><Menu theme="green" mode="horizontal"
                    defaultSelectedKeys={ [''+currentTab] } style={{ lineHeight: '64px', textAlign: 'right' }}>
                    <Menu.Item key="1"><Link to='/'>主页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/articles'>文章</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/about'>关于</Link></Menu.Item>
                  </Menu></div>;
    }
}

export default SubMenu;

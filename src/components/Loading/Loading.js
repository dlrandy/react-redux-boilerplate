import React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Loading';
    }
    render() {
        return (
        	<div className="">
        		< Spin />
        	</div>);
    }
}

export default Loading;

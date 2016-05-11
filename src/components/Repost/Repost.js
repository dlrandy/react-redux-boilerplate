import React from 'react';
import { Row, Col } from 'antd';
class Repost extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Repost';
    }
    render() {
    	const { Repost } = this.props;
      const { Circle, CommentList, User, Weibo} = Repost;
        return <div>
        	<Row >
              <Col span="4">
              	<a href={'/detail/' + Weibo.ID}>
              		<img src="/static/images/rec_icon.gif" />
              	</a>
              </Col>               
              <Col span="18">
              	<div><a href={'/detail/' +Weibo.ID }>{Weibo.Sugbject}</a></div>
              	<div>{Weibo.Remark}</div>
              	<div><a href={'/user/' +User.UserID}><span>作者：{User.NickName}</span></a>{Weibo.DateAndTime}</div>
              </Col>               
        	</Row>
        </div>;
    }
}

export default Repost;

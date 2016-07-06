import React from 'react';
import { Row, Col, Icon, message, Pagination } from 'antd';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

message.config({
    top: 120
});

import { imgConf } from '../../utils/config';

class WeiBo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Weibo';
        autoBind(this);
    }
   onStar(){}
   onRead(){}
   onDiscuss(){}
   onDelete(){}
    render() {
    	const { Weibo, UserInfo } = this.props;
        return <Row>
        	<Col span="4">
        	  <a href={'/user/' + UserInfo.UserID}>
        	  	<img src={UserInfo.FacePath + imgConf.SMALL_HEAD} alt={UserInfo.Remark} />
        	  </a>
        	</Col>
            <Col span="20">
        	<ul>
        		<span>{UserInfo.NickName}</span><br/>
        		<Row>
                    <Col span="18">{Weibo.Subject}</Col>
                    <Col span="6"><a href="#">查看全文</a></Col>
        		</Row>
        		<div>
          		 {Weibo.Remark}
        		</div>
        	</ul>
        	<Row> 
        		<Col span="12">{Weibo.DateAndTime}</Col>
				<Col span="12">
                  <Row>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onStar}>{!this.state.Gooded? (<span><Icon type="star-o" />点赞</span>) : (<span><Icon type="star" />已赞</span>)}</a></Col>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onRead}><Icon type="message" />阅读数{Weibo.CommentCount}</a></Col>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onDiscuss}><Icon type="team" />讨论</a></Col>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onDelete}><Icon type="delete" />删除</a></Col>
                  </Row>
                </Col>
                
        	</Row>

           </Col>
        </Row>;
    }
}


export default WeiBo;

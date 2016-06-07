import React from 'react';
import { Row, Col } from 'antd';

import { imgConf } from '../../utils/config';
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Comment';
    }
    render() {
    	console.log(this.props)
    	const {comment } = this.props;
    	if(!comment){
    		return <div></div>;
    	}
    	const {User} = comment;
    	const cmt = comment.Comment;
        return <Row key={cmt.ID}>
         <Col span="4">
           <a href="/user/{User.UserID}">
             <img src={User.FacePath + imgConf.SMALL_HEAD} />
           </a>
         </Col>
         <Col span="20">
           <Row>
            <Col span="6">{User.NickName}</Col>
            <Col span="18"><div dangerouslySetInnerHTML={{__html:cmt.Body}} /></Col>
           </Row>
           <Row>
                <Col span="18">
                  {cmt.DateAndTime}
                </Col>
                <Col span="6">
                  <Row>
                   <Col span="12">
                        删除
                   </Col>                    
                   <Col span="12">
                        <a href="#">回复</a>
                   </Col>
                  </Row>
                </Col> 
           </Row>
         </Col>
        </Row>;
    }
}

export default Comment;

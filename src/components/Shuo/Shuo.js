import React from 'react';
import { Row, Col, Icon, message, Pagination } from 'antd';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

message.config({
    top: 120
});
import { Commentlist } from '../../containers';
class Shuo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Shuo';
        let List = [], Page = {};
        if (this.props.CommentList) {//说说的评论列表不一定是总存在的
            List = this.props.CommentList.List;
            Page = this.props.CommentList.Page
        }
       
        this.state={
            Gooded: this.props.Weibo.Gooded,
            List, 
            Page,

        };//for init
        this.onStar = this.onStar.bind(this);
        this.onComment = this.onComment.bind(this); 
        this.onDiscuss = this.onDiscuss.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.renderFileList = this.renderFileList.bind(this);
    }
    onStar(){
        let idOfShuo = this.props.Weibo.ID;
    fetch('/api/Weibo/PostGood',{
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
         id: idOfShuo,
      })}).then((res) => {
            return res.json();
        }).then( json => {
            if (json.ErrorMessage.length > 0) {
                return message.warn(json.ErrorMessage[0].Message);
            }
           this.setState({"Gooded": !this.state.Gooded})
        }).catch((error) => {
          console.log(error);
           message.success("当前需要您刷新一下页面");
        });
    }
    onComment(){
     const weiboId = this.props.Weibo.ID;
     console.log('df')
     let url ='';
     if (this.state.user) {
      url="/api/weibo/CommentList";
     }else {
        url="/api/guest/CommentList";
     }
     const Circle =  this.props.Circle;
     fetch(url,{
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
         WeiboID: weiboId,
         circleid: Circle&&Circle.id || 0,
         Page: this.state.Page.Page || 1,
      })}).then((res) => {
            return res.json();
        }).then( json => {
            if (json.ErrorMessage&&json.ErrorMessage.length > 0) {
                return message.warn(json.ErrorMessage[0].Message);
            }
           this.setState({
            List: json.List,
            Page: {
                Page: json.Page,
                PageSize: json.PageSize,
                Total: json.Total,
            }
           })
        }).catch((error) => {
          console.log(error)
           message.success("当前需要您刷新一下页面");
        });
    
    }
    onDiscuss(){

    }
    onDelete(){

    }
    renderFileList() {
       let list = this.props.FileList.map((file, inx) => {
        return <span key={"file"+ inx}><a href={file.FilePath + file.FileName}><img/></a></span>;
        });
       return <div>
            {list}
       </div>;
    }
    render() {
    	const { Weibo, User } = this.props;
        let Circle = null, FileList = null;
         if (this.props.Circle) {
            Circle = this.props.Circle;
        }
        if (this.props.FileList) {
            FileList = this.props.FileList;
        }
        console.log(Weibo)
        // this.state.Gooded = Weibo ? Weibo.Gooded : false;//Shuo.js:48 Uncaught (in promise) TypeError: Cannot set property 'gooded' of null(…)
        // this.state.User = User || {};
        // this.state.CommentList = CommentList || [];
        console.log(this.props,"LLLLLLLLLLLLLLLLLLL") 
        // const { List, Page} = CommentList;
        const {List, Page,} = this.state;

        console.log('------------------------>>>>>>>><<<<<',List, Page);
        return <Row>
        	<Col span="4">
        	  <a href={'/user/' + User.UserID}>
        	  	<img src={User.FacePath} alt={User.Remark} />
        	  </a>
        	</Col>
            <Col span="20">
        	<ul>
        		<span>{User.NickName}</span><br/>
        		<p>
        			{Circle && <a href={'/q/' + Circle.id }><span>{Circle.name}</span></a>}
        			{Weibo.Remark}
                    {FileList && this.renderFileList}
        		</p>
        	</ul>
        	<Row> 
        		<Col span="12">{Weibo.DateAndTime}</Col>
				<Col span="12">
                  <Row>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onStar}>{!this.state.Gooded? (<span><Icon type="star-o" />点赞</span>) : (<span><Icon type="star" />已赞</span>)}</a></Col>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onComment}><Icon type="message" />评论数{Weibo.CommentCount}</a></Col>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onDiscuss}><Icon type="team" />讨论</a></Col>
                     <Col span="6"><a href="javascript:void(0);" onClick={this.onDelete}><Icon type="delete" />删除</a></Col>
                  </Row>
                </Col>
                
        	</Row>

        	{List.length > 0 && <Commentlist List = {List } />}
        	{Page && Page.Total && Page.Total > 5 && <Pagination defaultCurrent={Page.Page} total={Page.Total} />}
            </Col>
        </Row>;
    }
}

const mapStateToProps = (state) => {

const { user} = state.auth;
return {
    user
};

}

const mapDispatchToProps = (dispatch) => {
    return {
        ff: () => {

        }
        // fetchPostsInComponent: () =>{
        //     dispatch(fetchPosts()).then((response) => {
        // console.log('=>',response);
        //     dispatch(fetchPostsSuccess(response.payload));
        //     /*不加payload articles.js:32 Uncaught (in promise) TypeError: res.json is not a function(*/
        //   });
            
        // }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shuo);

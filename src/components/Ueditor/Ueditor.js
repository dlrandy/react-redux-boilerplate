import React from 'react';
import { message, Button } from 'antd';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../../actions/articles';

message.config({
  top: 120
});
const success = function () {
  message.success('这是一条成功提示');
};

const error = function () {
  message.error('这是一条报错提示');
};

const warn = function () {
  message.warn('这是一条警告提示');
};

class Ueditor extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Ueditor';
        this.editor = null;
        this.addWeibo = this.addWeibo.bind(this);

    }
    addWeibo(){
      console.log('.',this.editor.getContentTxt(),'.');
    if(this.editor.getContentTxt() =='' || this.editor.getContentTxt() == null || this.editor.getContentTxt().trim&&this.editor.getContentTxt().trim() == ''){
     message.warn('请填写要发表说说的内容');
     return 1;
    }
    fetch('/api/weibo/AddWeibo', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
         subject: '',
         body:this.editor.getContentTxt(),
         FileIds: '',
      })
    })
    .then(function(res){
      return res.json();
    }.bind(this))
    .then(function(res){
      console.log(res)
      if (res.status) {
       this.props.dispatch(fetchPosts()).then((response) => {
        console.log('=>',response);
            this.props.dispatch(fetchPostsSuccess(response.payload));
          }).catch((err) => {
             message.error('请刷新页面，查看大家发表的最新说说');
          });
        return  message.success('成功发表说说');
      }
      return message.warn(res.ErrMessage);
     
    }.bind(this)).catch(function(err){
      console.log(err);
      // if(err.status == 200){
      
      // }
       return message.error('说说发表出了点问题，请重新发表');
    });
    }
    addWeiboForQ(){

    }
    addComment(){

    }
    componentDidMount() {
      let editor = UE.getEditor(this.props.id, {
      	'toolbars': [['undo', 'redo', '|', 'emotion']],
      	lang: 'zh-cn',
      	initialFrameWidth: '700',
      	initialFrameHeight: '80',
      	enableAutoSave: false,

      });
    
      let me = this;
      editor.ready(function (ueditor) {
      	editor.setContent("");
        //怎么关闭“本地保存” 
        editor.on('showmessage', function(type, m){
                if (m['content'] == '本地保存成功') {
                    return true;
                }
            });
      }); 
      this.editor = editor;     
    }

    componentWillUnmount() {
         this.editor && this.editor.destroy();
    }
    render() {
    	let editorStyle ={
    		 width: '700px',
    		 height: '150px',
        margin: "0 auto",
    	};
         return (
         	<div>
             <div style={editorStyle}>
               <div id={this.props.id} name="content" ></div>
             </div>
             <div>
             <Button type="primary" onClick={this.addWeibo} style={{float: "right"}}>我说</Button>
             </div>
          </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};
export default connect(null, mapDispatchToProps)(Ueditor);

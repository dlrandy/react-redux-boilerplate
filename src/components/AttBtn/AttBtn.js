import React from 'react';
import { Button } from 'antd';
import fetch from 'isomorphic-fetch';

 
class AttBtn extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AttBtn';
        this.toggleAtt = this.toggleAtt.bind(this);
        this.atted = false;
        // this.cb.bind(this);这个不好使
        this.cb = this.cb.bind(this);

    }
    cb(res){
      console.log(res);
     this.atted = !this.atted
     this.setState({atted: this.atted});//为了触发render
    }

    toggleAtt(){
      let url = "/api/users/InUserAtt";
      if (this.atted) {
        url = "/api/users/DelUserAtt";
      }
      fetch(url, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',//这里不加，request不好使，不加，token不会覆盖
          body: JSON.stringify({
            Users: this.props.userId
          })
              
      }).then(this.cb).catch(function(rse){
        alert("关注失败");
      });
      
    }
    render() {
      console.log('this.atted',this.atted)
        return <Button type="primary" onClick={this.toggleAtt}>{!this.atted ?'关注':'取消'}</Button>;
    }
}

export default AttBtn;

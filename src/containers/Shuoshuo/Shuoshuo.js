import React from 'react';
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../../actions/articles';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';
import { Row } from 'antd';
import { Shuo, Repost } from '../../components';

class Shuoshuo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Shuoshuo';
    }
    componentWillMount() {
    this.props.fetchPostsInComponent();       
    }
    
    renderShuoshuo(posts){
    	console.log('----------------',posts);
//     	--------------- Object {List: Array[35], Nowtime: 1462331060, Page: 1, PageSize: 30, Total: 9860}
// Shuoshuo.js:18 Uncaught (in promise) TypeError: posts.map is not a function(…)
    	// if (posts.List == null) {
    		//看reducer的payload
    	// }
    	return posts.map( (post, inx) => {
    		/* Weibo,UserInfo, RepostWeibo*/
    		return (
    			<li key={'shuoshuo'+ inx}>
    				{ !post.Repost && <Shuo {...post} /> }
    				{ post.Repost && <Repost {...post} /> }
    			</li>
    		);
    	});
    }
//         
//         posts:
 // Code:"200"
// status:true
// Message:"OK"
// nowtime:"1462493896"
// ResultData:{} 2 keys
// List:[] 35 items
// Page:{} 3 keys
// ResultData{list page{Page:1
// PageSize:30
// Total:}}
//         
    render() {
    	const { posts, error, loading } = this.props.postsList;
    	console.log('::::::::::::::::',this.props);
    	if (loading) {
    		return <div> <Spin /> </div>;
    	}else if(error) {
    		return <Alert message={error.message} type="error" />;
    	}else if(posts == null){
           return <div> <Spin /> </div>; 
        }else if(posts.Code != 200) {
            return <Alert message={posts.Message} type="error" />;
        }



        return (
          <div>
            <ul>
            	{ this.renderShuoshuo(posts.ResultData.List) }
            </ul>
            {posts.ResultData.Page * posts.ResultData.Page.PageSize < posts.ResultData.Page.Total ? <Row type="flex" justify="center"><a href="#">点击加载更多</a></Row>: '' }
          </div>
        );
    }
}

const mapStateToProps = (state) =>{
	const { postsList } = state.articles;
	return {
		postsList
	};
}

const mapDispatchToPorps= (dispatch) =>{
	return {
		fetchPostsInComponent: () =>{
			dispatch(fetchPosts()).then((response) => {
        console.log('=>',response);
            dispatch(fetchPostsSuccess(response.payload));
            /*不加payload articles.js:32 Uncaught (in promise) TypeError: res.json is not a function(*/
          });
			
		}
	};
}

export default connect(mapStateToProps, mapDispatchToPorps)(Shuoshuo);

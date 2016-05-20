import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';
import { 
    fetchRecommandWeibo,
    fetchRecommandWeiboSuccess,
    fetchRecommandWeiboFailure } from '../../actions/recommandWeibo';

class RecommandWeibo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RecommandWeibo';
    }

    renderRecommandWeibo (List) {
      return  List && List.map(function (item, inx) {
          return <li key={"recommandWeibo"+ inx}>
          {item.Weibo.DateAndTime}
          {item.Weibo.Subject}
          </li>;
      });

    }
    componentWillMount() {
      this.props.fetchRecommandWeiboInComponent();      
    }
    render() {
    	const { item, error, loading  } = this.props.recommandWeibo;
    	console.log('88888888888888888888888',this.props.recommandWeibo)
    	if (loading ) {
    		return <div> <Spin /> </div>;
    	}else if(error) {
    		return <Alert message={error.message} type="error" />;
    	}else if(item == null) {
    		return <div> <Spin /> </div>;
    	}
        return <div><div>热点文章 更多</div>
        	<ul>
              {this.renderRecommandWeibo(item.List)}
        	</ul>
        </div>;
    }
}
RecommandWeibo.contextTypes = {
  store: PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
  const { recommandWeibo} = state;
  return {
    recommandWeibo,
  };
};

const mapDispatchToProps = (dispatch) => {

return {
    fetchRecommandWeiboInComponent: () => {
    dispatch( fetchRecommandWeibo()).then((res) => {
        console.log('==================>>>>>>', res)
    res.payload.status == 200 ? dispatch(fetchRecommandWeiboSuccess(res.payload)) : dispatch(fetchRecommandWeiboFailure(res.payload));
    }).catch( error => {
        console.log("error====>",error);
        dispatch(fetchRecommandWeiboFailure(error));
    });
 }
}
};
export default connect(mapStateToProps, mapDispatchToProps)(RecommandWeibo);

import React, { PropTypes }from 'react';
import QCircle from '../../components/QCircle/QCircle';
import { Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import { 
	fetchQCircleList,
    fetchQCircleListSuccess,
    fetchQCircleListFailure } from '../../actions/qcircle';

class QCircleList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QCircleList';
    }
    renderQCirclesList(circles){
    	return circles.map((circle) => {
    		return <Col key={'circle'+circle.id}><QCircle {...circle}  /></Col>;
    	});	
    }
    componentWillMount() {
        this.props.fetchCirclesInComponent();  
    }

    render() {
    	const { QCircles }  = this.props; 
console.log('========>',QCircles);
      const qcircles = QCircles.qcircles;
	if (qcircles == null) {
		return <div><Spin /></div>;
	}else{
		return (
			<div>
      <h2>欢迎加入小圈子</h2>
				<Row type="flex" justify="center">{this.renderQCirclesList(qcircles.filter(function (ele, index, array){
					return index < 4;
				}) )}</Row>
				<Row type="flex" justify="center">{this.renderQCirclesList(qcircles.filter(function (ele, index, array){
					return index >= 4 && index < 8;
				}))}</Row>
			</div>
		);
	}
        	

        
    }
}



QCircleList.propTypes = {
  // children: PropTypes.object.isRequired,
};

QCircleList.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { QCircles } = state;
  return {
    QCircles
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
  	fetchCirclesInComponent: () => {
  		dispatch(fetchQCircleList()).then( (res) => {
  			res.payload.status ? dispatch(fetchQCircleListSuccess(res.payload)) : dispatch(fetchQCircleListFailure(res.payload));
  		});
  	}
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QCircleList);

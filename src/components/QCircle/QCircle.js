import React from 'react';

class QCircle extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QCircle';
    }
    render() {
    	const {id, weibocount, name, icon} = this.props;
        return(
         <div className="q-circle" > 
           <a href={'q/'+ id}>
             <div>
             <img src={icon} />
             </div>
           	 <p>
                <span>{name}</span><br/>
                <span>帖子： {weibocount}</span>
           	 </p>
           </a>
         </div>
        );
    }
}

export default QCircle;

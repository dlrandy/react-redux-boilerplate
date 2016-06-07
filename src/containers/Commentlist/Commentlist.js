import React from 'react';
import { Table } from 'antd';
import { Comment } from '../../components';

class Commentlist extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Commentlist';
        this.renderComments = this.renderComments.bind(this);
    }
    renderComments(list) {
     return list.map( (comment) => 
       <li key={comment.Comment.ID}>
          <Comment comment={comment}  />
        </li>
     );
    }
    render() {
    	const { List } = this.props;
        if (!List || List&&List.length <= 0) {
            return <div></div>;
        }
        return <ul>{this.renderComments(List)}</ul>;
    }
}

export default Commentlist;

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
     return list && list.map( (comment) => {
        return <li key={comment.Comment.ID}>
          <Comment comment={comment}  />
        </li>
     });
    }
    render() {
    	const { List } = this.props;
        return <ul>{this.renderComments(List)}</ul>;
    }
}

export default Commentlist;

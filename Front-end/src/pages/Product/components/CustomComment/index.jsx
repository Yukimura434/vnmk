import React from 'react';
import { Avatar, Rate } from 'antd';

const CustomComment = ({ author, content, datetime, rating }) => (
  <div className="comment" style={{marginTop:'20px'}}>
    <div className="comment-avatar">
      <Avatar>{author[0]}</Avatar>
    </div>
    <div className="comment-content">
      <div className="comment-author">
        <span style={{fontFamily:'monospace', fontWeight:'600'}}>{author}</span>
        <span className="comment-datetime">{datetime}</span>
      </div>
      <div className="comment-body">
        {content}
        <div className="comment-rate">
          <Rate disabled defaultValue={rating} />
        </div>
      </div>
    </div>
  </div>
);

export default CustomComment;

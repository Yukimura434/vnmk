import React from "react";
import { Card, List, Button } from "antd";
import "./PostList.scss"; // Import file SCSS của bạn

const { Meta } = Card;


  

  const PostList = ({ data }) => {
    return (
      <div className="post-list">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                cover={<img alt={item.title} src={item.imageUrl} />}
                actions={[<Button type="primary" style={{ background: 'black' }}>Xem Chi Tiết</Button>]}
              >
                <Meta title={item.title} description={item.description} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  };
  
export default PostList;

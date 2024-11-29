import React, { useEffect, useState } from 'react';
import { Rate, Button, Form, Input, List, Typography } from 'antd';
import { Paper } from '@material-ui/core';
import CustomComment from './CustomComment'; // Import đúng component CustomComment
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

function ProductReviews({ onSubmitReview }) {
    const [form] = Form.useForm();
    const [rating, setRating] = useState(0);
    const { productId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [authors, setAuthors] = useState({}); 
    
    useEffect(() => {
        const fetchReviews = async () => {
            if (productId) {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/reviews/product/${productId}`,
                    );
                    setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
                    // Fetch tác giả sau khi đã có đánh giá
                    const authorPromises = response.data.reviews.map((review) =>
                        axios
                            .get(`http://localhost:5000/api/auth/${review.userId}`)
                            .then((res) => ({ [review.userId]: res.data })),
                    );
                    const authorsData = await Promise.all(authorPromises);
                    const authorsMap = authorsData.reduce(
                        (acc, author) => ({ ...acc, ...author }),
                        {},
                    );
                    setAuthors(authorsMap);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchReviews();
    }, [productId]);

    const handleFinish = (values) => {
        const newReview = {
            rate: rating,
            comment: values.comment,
            // author: 'User', // Thay thế bằng thông tin người dùng thực tế nếu có
            // date: new Date().toLocaleDateString(),
        };
        onSubmitReview(newReview);
        form.resetFields();
        setRating(0);
    };

    return (
        <Paper
            elevation={0}
            style={{ padding: '15px' }}
        >
            <Typography
                variant='h5'
                style={{ fontFamily: 'monospace', fontWeight: '600' }}
            >
                Đánh giá sản phẩm
            </Typography>
            <Form
                form={form}
                onFinish={handleFinish}
            >
                <Form.Item name='rating'>
                    <Rate
                        onChange={setRating}
                        value={rating}
                    />
                </Form.Item>
                <Form.Item
                    name='comment'
                    rules={[{ required: true, message: 'Vui lòng nhập nhận xét của bạn!' }]}
                >
                    <TextArea
                        rows={4}
                        placeholder='Nhập nhận xét của bạn'
                    />
                </Form.Item>
                <Form.Item>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: '10px',
                        }}
                    >
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{
                                margin: '20px 0',
                                color: 'white',
                                background: 'black',
                                borderRadius: '0px',
                                marginBottom: '10px',
                                right: '20px',
                            }}
                        >
                            Gửi đánh giá
                        </Button>
                    </div>
                </Form.Item>
            </Form>

            <List
                className='comment-list'
                header={`${reviews.length} đánh giá`}
                itemLayout='horizontal'
                dataSource={reviews}
                renderItem={(review) => (
                    <li key={review.id}>
                        <CustomComment
                            author={authors[review.userId]?.displayName || 'Unknown'}
                            content={review.comment}
                            datetime={review.date}
                            rating={review.rate}
                        />
                    </li>
                )}
            />
        </Paper>
    );
}

ProductReviews.propTypes = {};

export default ProductReviews;

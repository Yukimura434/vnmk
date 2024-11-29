import React, { useEffect, useState } from 'react';
import { List, Card, Spin, Alert, Modal, Typography, Row, Col } from 'antd';
import { format as formatDate } from 'date-fns';
import { vi } from 'date-fns/locale';
import orderApi from '../../../api/ordersApi';
import { formatPrice } from '../../../utils';

const OrderHistory = () => {
    const userId = localStorage.getItem('userId');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const orderData = await orderApi.getOrderHistory(userId);
                const sortedOrders = orderData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [userId]);

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const renderPaymentMethod = (method) => {
        switch (method) {
            case 'payment':
                return 'Thanh toán trực tuyến';
            case 'cash':
                return 'Thanh toán khi nhận hàng';
            default:
                return 'Phương thức không xác định'; // Giá trị mặc định nếu không khớp
        }
    };

    const renderPaymentStatus = (status) => {
      switch (status) {
          case 'Pending':
              return 'Chưa thanh toán';
          case 'Success':
              return 'Đã thanh toán';
          default:
              return status;
      }
  };
  

    const renderShippingStatus = (status) => {
        switch (status) {
            case 'not shipped':
                return 'Chưa vận chuyển';
            case 'processing':
                return 'Đang xử lý';
            case 'in transit':
                return 'Đang vận chuyển';
            case 'out for delivery':
                return 'Đang giao hàng';
            case 'delivered':
                return 'Đã giao hàng';
            case 'returned':
                return 'Đã trả lại';
            case 'canceled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const renderStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'Chưa hoàn tất';
            case 'success':
                return 'Hoàn tất';
            default:
                return status;
        }
    };

    if (loading) {
        return <Spin tip="Đang tải lịch sử đặt hàng..." />;
    }

    if (error) {
        return <Alert message="Lỗi" description={error} type="error" showIcon />;
    }

    return (
        <div style={{ marginTop: '100px', padding: '100px' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Lịch sử đặt hàng</h1>
            </div>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={orders}
                renderItem={order => (
                    <List.Item>
                        <Card
                            bordered={false}
                            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        >
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <h3 style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>Mã đơn hàng: {order._id}</h3>
                                </Col>
                                <Col>
                                    <Typography.Link
                                        onClick={() => showModal(order)}
                                        style={{ textDecoration: 'underline', color: 'black', fontWeight: 'bold' }}
                                    >
                                        Xem chi tiết
                                    </Typography.Link>
                                </Col>
                            </Row>
                            <p style={{ fontWeight: 'bold' }}>Ngày đặt hàng: {formatDate(new Date(order.orderDate), 'dd/MM/yyyy', { locale: vi })}</p>
                            <p style={{ fontWeight: 'bold' }}>Trạng thái vận chuyển: {renderShippingStatus(order.shippingStatus)}</p>
                            <p style={{ fontWeight: 'bold' }}>Tổng giá trị: {formatPrice(order.totalAmount)}</p>
                        </Card>
                    </List.Item>
                )}
            />

            {selectedOrder && (
                <Modal
                    title={`Chi tiết đơn hàng ${selectedOrder._id}`}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Card
                        bordered={false}
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                        <p style={{ fontWeight: 'bold' }}>Ngày đặt hàng: {formatDate(new Date(selectedOrder.orderDate), 'dd/MM/yyyy', { locale: vi })}</p>
                        <p style={{ fontWeight: 'bold' }}>Trạng thái: {renderStatus(selectedOrder.status)}</p>
                        <p style={{ fontWeight: 'bold' }}>Trạng thái vận chuyển: {renderShippingStatus(selectedOrder.shippingStatus)}</p>
                        <p style={{ fontWeight: 'bold' }}>Trạng thái thanh toán: {renderPaymentStatus(selectedOrder.paymentStatus)}</p>
                        {/* <p style={{ fontWeight: 'bold' }}>Phương thức thanh toán: {renderPaymentMethod(selectedOrder.paymentMethod)}</p> */}
                        <p style={{ fontWeight: 'bold' }}>Tổng giá trị: {formatPrice(selectedOrder.totalAmount)}</p>
                        <p style={{ fontWeight: 'bold' }}>Danh sách sản phẩm:</p>
                        <ul>
                            {selectedOrder.products.map(item => (
                                <li key={item.productId} style={{ marginBottom: '10px' ,marginLeft:'20px'}}>
                                    <img
                                        src={item.urlImage}
                                        alt="Product"
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                    <span>Số lượng: {item.quantity}</span>
                                    <br />
                                    <span>Giá sản phẩm: {formatPrice(item.price)}</span>
                                </li>
                            ))}
                        </ul>
                        <p style={{ fontWeight: '600'  }}>Thông tin vận chuyển:</p>
                        <p style={{ fontWeight: 'bold', marginLeft:'20px' }}>Người nhận: {selectedOrder.shippingInfo.receiver}</p>
                        <p style={{ fontWeight: 'bold', marginLeft:'20px' }}>Điện thoại: {selectedOrder.shippingInfo.phone}</p>
                        <p style={{ fontWeight: 'bold', marginLeft:'20px' }}>Địa chỉ: {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.addressDetail}</p>
                    </Card>
                </Modal>
            )}
        </div>
    );
};

export default OrderHistory;

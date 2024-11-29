
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Modal, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newShippingStatus, setNewShippingStatus] = useState('');  
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, [orders]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedOrder) {
      axios.put(
        `http://localhost:5000/api/orders/${selectedOrder._id}/shipping-status`,
        {
          shippingStatus: newShippingStatus
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}` 
          }
        }
      )
      .then(response => {
        setOrders(orders.map(order => 
          order._id === selectedOrder._id ? { ...order, shippingStatus: newShippingStatus } : order
        ));
        setIsModalVisible(false);
        setSelectedOrder(null);
        setNewShippingStatus('');
      })
      .catch(error => {
        console.error('There was an error updating the shipping status!', error.message);
        console.error('Error details:', error.config);
      });
    }
  };
  
  

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setNewShippingStatus('');
  };

  const columns = [
    {
      title: 'Người nhận',
      dataIndex: ['shippingInfo', 'receiver'],
      key: 'receiver',
      fixed: 'left',
    },
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'SĐT',
      dataIndex: ['shippingInfo', 'phone'],
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['shippingInfo', 'address'],
      key: 'address',
    },
    {
      title: 'Giá trị đơn hàng',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `${text} VND`,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'geekblue';
        if (status === 'pending') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Đã thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        let color = 'green';
        if (status === 'pending') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái vận chuyển',
      dataIndex: 'shippingStatus',
      key: 'shippingStatus',
      render: (status) => {
        let color = 'blue';
        if (status === 'Chờ xử lý') {
          color = 'orange';
        } else if (status === 'Đã giao hàng') {
          color = 'green';
        }else if (status === 'Đã hủy') {
          color = 'red';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpenModal(record)}>Cập nhật</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={orders} rowKey="_id" scroll={{
      x: 1300,
    }} />
      <Modal
        title="Cập nhật trạng thái giao hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          defaultValue={selectedOrder?.shippingStatus || 'pending'}
          style={{ width: "100%" }}
          onChange={setNewShippingStatus}
        >
          <Option value="Chờ xử lý">Chờ xử lý</Option>
          <Option value="Đang vận chuyển">Đang vận chuyển</Option>
          <Option value="đã giao hàng">Đã giao</Option>
          <Option value="Đã hủy">Đã hủy</Option>
        </Select>
      </Modal>
    </>
  );
};

export default OrderManagement;


import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import axios from 'axios';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ onUploadSuccess, product, accessToken }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (product && product.images) {
      const formattedFileList = product.images.map((url) => ({
        uid: url,
        name: url,
        status: 'done',
        url: url,
      }));
      setFileList(formattedFileList);
    }
  }, [product]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ file, fileList: newFileList }) => {
    if (file.status === 'uploading') {
      setFileList(newFileList);
      return;
    }
    if (file.status === 'done') {
      if (file.response && file.response.url) {
        const uploadedUrls = newFileList.map((file) => file.response?.url || file.url);
        onUploadSuccess(uploadedUrls);
      } else {
        message.error('Upload failed.');
      }
    } else if (file.status === 'error') {
      // message.error('Upload failed.');
    }
    setFileList(newFileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('productId', product._id);
    formData.append('files', file);

    try {
      const response = await axios.post('http://localhost:5000/api/uploads/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onSuccess(response.data);
    } catch (error) {
      onError(error);
      message.error('Upload failed.');
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
        src={previewImage}
      />
    </>
  );
};

export default UploadImage;

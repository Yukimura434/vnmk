import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss'; // Import CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="title-container">
        <h3>OOPS! PAGE NOT FOUND</h3>
        <div className="result-title">
          <span style={{ textShadow: "-0.8rem 0 0 #fff" }}>4</span>
          <span style={{ textShadow: "-0.8rem 0 0 #fff" }}>0</span>
          <span style={{ textShadow: "-0.8rem 0 0 #fff" }}>4</span>
        </div>
      </div>
      <Result
        icon={null}
        subTitle={<span className="result-subtitle">We are sorry, but the page you requested was not found</span>}
        extra={
          <Link to="/">
            <span className="wrapper__back__homet__button">BACK TO THE HOME PAGE</span>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;

import { Layout } from 'antd';
import React from 'react';
import Overview from '../Dashboard/components/Overview';
import SalePercent from '../Dashboard/components/SalePercent';
import TimeLine from '../Dashboard/components/TimeLine';


const Dashboard = () => {
    return (
        <div style={{  }}>
            <Overview />
            <SalePercent />
            <TimeLine />
        </div>
    );
};

export default Dashboard;
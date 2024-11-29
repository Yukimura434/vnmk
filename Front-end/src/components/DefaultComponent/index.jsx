import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppFooter from '../Footer';
import Header from '../Header';
import ChatBot from '../ChatBot/ChatBot';

function DefaultComponent({ children }) {
    const [marginTop, setMarginTop] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setMarginTop(Math.min(scrollY, contentHeight - window.innerHeight));
        };

        const handleResize = () => {
            // Update contentHeight when the viewport size changes
            setContentHeight(document.body.clientHeight);
        };

        // Initial setup
        setContentHeight(document.body.clientHeight);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [contentHeight]); // Run effect again if contentHeight changes

    const contentStyle = {
        marginTop: `${marginTop}px`,
    };

    return (
        <div>
            <Header />
            <div style={contentStyle}>{children}</div>
            <ChatBot />
            <AppFooter />
        </div>
    );
}

DefaultComponent.propTypes = {
    children: PropTypes.object.isRequired,
};

export default DefaultComponent;

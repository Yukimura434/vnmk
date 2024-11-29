import React, { Children } from 'react';
import { Carousel } from 'antd';
import slide0 from '../../assets/slide/slide0.jpg';
import slide1 from '../../assets/slide/slide1.jpg';
import slide2 from '../../assets/slide/slide2.jpg';
import slide3 from '../../assets/slide/slide3.jpg';
import slide4 from '../../assets/slide/slide4.jpg';
import slide5 from '../../assets/slide/slide5.jpg';
import slide6 from '../../assets/slide/slide6.jpg';
import slide7 from '../../assets/slide/slide7.jpg';
import slide8 from '../../assets/slide/slide8.jpg';
import slide9 from '../../assets/slide/slide9.jpg';
import slide10 from '../../assets/slide/slide10.jpg';
import slide11 from '../../assets/slide/slide11.jpg';

const imageList = [
    {
        key: '1',
        name: 'silde1',
        children: [
            {
                key: '1-1',
                src: slide0,
                alt: 'Image 1',
            },
            {
                key: '1-2',
                src: slide1,
                alt: 'Image 2',
            },
            {
                key: '1-3',
                src: slide2,
                alt: 'Image 3',
            },
            {
                key: '1-4',
                src: slide3,
                alt: 'Image 4',
            },
            {
                key: '1-5',
                src: slide4,
                alt: 'Image 5',
            },
            {
                key: '1-12',
                src: slide11,
                alt: 'Image 12',
            },
        ],
    },
    {
        key: '2',
        name: 'silde2',
        children: [
            {
                key: '1-6',
                src: slide5,
                alt: 'Image 6',
            },
            {
                key: '1-7',
                src: slide6,
                alt: 'Image 7',
            },
            {
                key: '1-8',
                src: slide7,
                alt: 'Image 8',
            },
            {
                key: '1-9',
                src: slide8,
                alt: 'Image 9',
            },
            {
                key: '1-10',
                src: slide9,
                alt: 'Image 10',
            },
            {
                key: '1-11',
                src: slide10,
                alt: 'Image 11',
            },
        ],
    },
];

const Slideshow = () => {
    return (
        <Carousel
            autoplay
            autoplaySpeed={1500}
            arrows
            draggable
            waitForAnimate
            speed={2000}
        >
            {imageList.map((boxSlide) => (
                <div key={boxSlide.key}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center', // Căn giữa theo chiều ngang
                        alignItems: 'center',     // Căn giữa theo chiều dọc
                    }}>
                        {boxSlide.children && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center', // Căn giữa các ảnh trong slide
                                gap: '10px'               // Khoảng cách giữa các ảnh
                            }}>
                                {boxSlide.children.map((image) => (
                                    <img
                                        key={image.key}
                                        src={image.src}
                                        alt={image.alt}
                                        style={{
                                            width: '261px',
                                            height: '313px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </Carousel>
    );
};


export default Slideshow;

import React from 'react';
import PropTypes from 'prop-types';
import '../AboutCompany/style.scss';

function AboutCompany(props) {
    return (
        <div>
            {/* Container 1 */}
            <div className='aban'>
                <div className='aban__wrap'>
                    <div className='aban__bg'>
                        <img
                            style={{height:"fitContent"}}
                            src='https://theme.hstatic.net/200000538213/1000921951/14/slide_4_img.jpg?v=641'
                            alt='About Company'
                        />
                    </div>
                    <div className='container'>
                        <div className='aban__inner'>
                            <div className='aban__ctn' data-aos='zoom-in'>
                                <span className='aban__text'>/VNMK/</span>
                                <h1 className='aban__title'>VIETNAM MECHANICAL KEYBOARD</h1>
                                <p className='aban__desc'>
                                    VNMK là nơi chuyên cung cấp các thiết bị, phụ kiện về bàn phím cơ và các phụ kiện có liên quan. Với sứ mệnh mang đến những trải nghiệm tốt nhất cho người dùng, chúng tôi sẽ nổ lực hết mình để các sản phẩm đến tay người dùng một cách hoàn hảo nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Container 2 */}
            <div className='aban2'>
                <div className='aban2__flex'>
                    <div className='aban2__left1'>
                        <div className='aban2__desc'>
                            <h2 className='aban2__title '>VIETNAM MECHANICAL KEYBOARD</h2>
                            <div className='aban2__desc2 '>
                                <p>
                                Được thành lập từ năm 2016, tiền thân là The Keycap Shop – nơi chuyên cung cấp hầu hết các loại keycap được sản xuất từ Trung Quốc.
                                    <span className='fw-6'>
                                    Đầu năm 2022 được đổi tên thành VNMK với mục tiêu trở thành nhà cung cấp lớn mạnh hàng đầu Việt Nam về các thiết bị như: Bàn phím cơ, Switch, Keycap, Lò xo, Stab,… và các phụ kiện liên quan khác.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='aban2__right1'>
                        <div className='aban2__img' >
                            <div className='aban2__box'>
                                <img
                                    src='https://theme.hstatic.net/200000538213/1000921951/14/categorybanner_1_img.jpg?v=641'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='aban2__flex' style={{height:"500px"}}>
                    <div className='aban2__left2' style={{height:"500px"}}>
                        <div className='aban2__img' data-aos='zoom-in' style={{height:"500px"}}>
                            <div className='aban2__box' style={{height:"500px"}}>
                                <img
                                    style={{height:"fitContent"}}
                                    src='https://theme.hstatic.net/200000538213/1000921951/14/categorybanner_3_img.jpg?v=641'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className='aban2__right2'>

                        <div className='aban2__desc' data-aos='fade-up'>
                            <h2 className='aban2__title f-title fw-7 t-center'>VNMK</h2>
                            <div className='aban2__desc2 fw-5 t16 t-center mona-content'>
                                <div>
                                    <div>
                                        <span>
                                        Với những sản phẩm được chế tác tỉ mỉ từ sự đam mê, nhiệt huyết và sáng tạo không ngừng của đội ngũ trẻ đầy nhiệt huyết, 
                                        chúng tôi tin rằng mỗi bàn phím cơ của chúng tôi sẽ không chỉ là công cụ, mà là người bạn đồng hành, truyền cảm hứng cho bạn trên mỗi cú gõ. 
                                        Tinh thần "Chạm đến đam mê, gõ đến thành công" sẽ luôn hiện hữu và tiếp thêm sức mạnh cho bạn, giúp bạn tạo nên những điều tuyệt vời mỗi ngày.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AboutCompany.propTypes = {};

export default AboutCompany;

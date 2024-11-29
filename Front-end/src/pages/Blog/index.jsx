import React from 'react';
import PropTypes from 'prop-types';
import './blog.scss';
import PostList from './components/PostList';
import { Divider, Typography, Button } from 'antd'; // Import các thành phần Ant Design

import logo from '../../assets/logo/logo.svg'

const { Title, Paragraph } = Typography;
const data = [
  {
    id: 1,
    title: "GP87 CP – Gasket",
    description: "Bàn phím gasket, thiết kế nhỏ gọn và tinh tế.",
    imageUrl: "https://anphat.com.vn/media/product/40394_fl_esports_gp87cp_white_gray_gasket_mount__5_.jpg"
  },
  {
    id: 2,
    title: "Keycool Y75 – 3Mode, Led Viền RGB",
    description: "Bàn phím có LED RGB với 3 chế độ kết nối, phù hợp mọi nhu cầu.",
    imageUrl: "https://gearzone.vn/wp-content/uploads/2024/01/keycool-y75-3mode-mach-xuoi-led-vien-rgb-12-510x646.jpg"
  },
  {
    id: 3,
    title: "Kit Zuoya GMK67 – Mạch Xuôi, 3Mode, Gasket",
    description: "Bàn phím 3 chế độ kết nối, thiết kế gasket và mạch xuôi.",
    imageUrl: "https://gearzone.vn/wp-content/uploads/2023/04/kit-ban-phim-co-zuoya-gmk67-6-510x510.jpg"
  },
  {
    id: 4,
    title: "Kit Feker 75V3 – Gasket 3Mode Hotswap RGB",
    description: "Bàn phím 3 chế độ, hỗ trợ hot-swap và LED RGB.",
    imageUrl: "https://gearzone.vn/wp-content/uploads/2022/11/kit-ir75-feker-75v3-1-510x510.png"
  },
  {
    id: 5,
    title: "Keydous NJ80 – AP 2022",
    description: "Bàn phím cơ kết nối không dây, phiên bản 2022.",
    imageUrl: "https://bizweb.dktcdn.net/100/438/322/products/nj80-hotswap.jpg?v=1730263494927"
  },
  {
    id: 6,
    title: "T-Series NiZ 82",
    description: "Bàn phím cơ tĩnh điện với độ bền và hiệu năng cao.",
    imageUrl: "https://gearzone.vn/wp-content/uploads/2021/11/niz-82-white-t-series-2021-1-510x510.jpg"
  },
];
const data2 = [
  {
    id: 7,
    title: "Kit MXRSKEY CK820 – Full Nhôm CNC",
    description: "Bàn phím full nhôm CNC, chắc chắn và bền bỉ.",
    imageUrl: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-y6b9uzxhcqjva5.webp"
  },
  {
    id: 8,
    title: "Kit MK870 – FL-Esports – Foam Silicon",
    description: "Bàn phím foam silicon, tối ưu cho trải nghiệm gõ êm ái.",
    imageUrl: "https://bizweb.dktcdn.net/100/438/322/products/bo-kit-ban-phim-co-khong-day-fl-esports-fl-mk870-1-white-3-modes-1658459471985.jpg?v=1730263905500"
  },
  {
    id: 9,
    title: "KEYCOOL GZ68 – 3Mode",
    description: "Bàn phím có kết nối 3 chế độ, dễ dàng chuyển đổi.",
    imageUrl: "https://nvs.tn-cdn.net/2022/07/ban-phim-co-keycool-gz68-nguyenvu.store-9-1.webp"
  },
  {
    id: 10,
    title: "T-Series NiZ 87",
    description: "Bàn phím cơ tĩnh điện, thiết kế layout 87 phím.",
    imageUrl: "https://gearzone.vn/wp-content/uploads/2018/09/niz-87-black-t-series-2021-3.png-510x510.jpg"
  },
  {
    id: 11,
    title: "Akko 3098B – 3Mode",
    description: "Bàn phím kết nối không dây, thiết kế layout 98 phím.",
    imageUrl: "https://akkogear.com.vn/wp-content/uploads/2022/04/ban-phim-co-akko-3098b-multi-modes-9009-05-510x510.jpg"
  },
  {
    id: 12,
    title: "Akko 3068B Plus",
    description: "Bàn phím thiết kế nhỏ gọn với nhiều tính năng hữu ích.",
    imageUrl: "https://akko.vn/wp-content/uploads/2022/11/ban-phim-co-akko-3068b-plus-black-gold-10-510x339-1.jpg"
  }
];
function Blog(props) {
  return (
    <div>
      {/* Container 1 */}
      <div className='aban'>
        <div className='aban__wrapBlog'>
          <div className='aban__bg'>
            <img
              style={{ height: 'fitContent' }}
              src='https://curnonwatch.com/blog/wp-content/themes/ashe/assets/images/bannerDesktop.png'
              alt='Blog'
            />
          </div>
          <div className='container'>
            <div className='aban__inner'>
              <div
                className='aban__ctn'
                data-aos='zoom-in'
              >
                <img
                  src={logo}
                  alt='VNMK'
                  className='bannerLogo'
                ></img>
                <p className='aban__desc'>
                  Tinh thần "Chạm đến đam mê, gõ đến thành công" sẽ luôn hiện hữu và tiếp thêm sức mạnh cho bạn,
                  giúp bạn tạo nên những điều tuyệt vời mỗi ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container2'>
        <nav className='wrapper__header1__navbar'>
          <a href='/products' className='active'>HOME</a>
          <a href='http://localhost:3000/products?_limit=16&_page=1&_sort=asc&categoryId=6749e63a24417ea8e0551c35'>Pre-Order</a>
          <a href='http://localhost:3000/products?_limit=16&_page=1&_sort=asc&categoryId=6749e62a24417ea8e0551c31'>KHUYẾN MÃI</a>
          <a href='#'>GROUP BUY</a>
          <a href='#'>DỊCH VỤ</a>
        </nav>
      </div>

      {/* Post List 1 */}
      <div className="wrapper__content">
        <PostList data={data} />
      </div>

      {/* Divider và UI giữa 2 PostList */}
      <Divider style={{ margin: '40px 0' }}>
        <Title level={2}>Khám phá thêm bài viết thú vị</Title>
        <Paragraph>
          Bạn muốn tìm hiểu thêm về xu hướng mới, các mẹo bảo quản đồng hồ và nhiều hơn nữa? Hãy khám phá thêm những bài viết bên dưới.
        </Paragraph>
        <Button type="primary" size="large" style={{ background: 'black', border: 'none' }}>
          Xem thêm bài viết
        </Button>
      </Divider>

      {/* Post List 2 */}
      <div className="wrapper__content">
        <PostList data={data2} />
      </div>
    </div>
  );
}

Blog.propTypes = {};

export default Blog;


import React from 'react';
import './style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <div className='city'>
          <box-icon name='map' type='solid' ></box-icon>
          <h4>Hà Nội</h4>
        </div>
        <p>Hồ Hoàn KiếmHàng Trống, Hoàn Kiếm, Hà Nội</p>
        <p>Km 10, Đường Trần Phú, phường Văn Quán, quận Hà Đông, thành phố Hà Nội</p>
      </div>
      <div className="footer__section">
        <div className='city'>
          <box-icon name='map' type='solid' ></box-icon>
          <h4>Đà nẵng</h4>
        </div>
        <p>179 Huỳnh Tấn Phát, Hoà Cườn Nam, Hải Châu, Đà Nẵng</p>
        <p>566 Núi Thành, Hoà Cường Nam, Hải Châu, Đà Nẵng</p>
      </div>
      <div className="footer__section">
        <h4>Phím</h4>
        <p>Kit bàn phím</p>
        <p>Bàn phím full size</p>
        <p>Numpad</p>
        <p>Bàn phím TKL</p>
        <p>Bàn phím alice</p>
        <p>Best Sellers</p>
      </div>
      <div className="footer__section">
        <h4>Switch</h4>
        <p>Linear switch</p>
        <p>Tactile switch</p>
        <p>Clicky switch</p>
        <p>Silent switch</p>
        <p>Clear Switch</p>
        <p>Best Sellers</p>
      </div>
      <div className="footer__section">
        <h4>Keycaps</h4>
        <p>OEM Profile keycap</p>
        <p>Cherry Profile keycap</p>
        <p>SA Profile keycap</p>
        <p>DSA Profile keycap</p>
        <p>XDA Profile keycap</p>
      </div>
      <div className="footer__section">
        <h4>VỀ CHÚNG TÔI</h4>
        <p>Về chúng tôi</p>
        <p>Cho doanh nghiệp</p>
        <p>Chính sách đổi trả</p>
        <p>Chính sách vận chuyển</p>
        <p>phongquoc434@gmail.com</p>
        <p>0487344434</p>
        <div className="wrapper__footer__social-media">
        <a style={{ "--i": 1 }} href="https://www.youtube.com/channel/UC0kL-L4W-QBwgwqCv408J2A">
           <box-icon type="logo" name="youtube" color="#000"></box-icon>
         </a>
         <a style={{ "--i": 2 }} href="https://www.facebook.com/lacdaustore">
           <box-icon
            type="logo"
            name="facebook-circle"
           color="#000"
           ></box-icon>
        </a>
        <a style={{ "--i": 3 }} href="https://www.instagram.com/lac.dau/">
          <box-icon type="logo" name="instagram-alt" color="#000"></box-icon>
        </a>
      </div>
      </div>
      <div className="footer__newsletter">
        <h4>Nhận thông tin mới nhất từ VNMK</h4>
        <input type="text" placeholder="Nhập số điện thoại" />
        <input type="text" placeholder="Nhập họ và tên" />
        <input type="email" placeholder="Nhập Email" />
        <button>Đăng ký ngay</button>
      </div>
      <div className="footer__copyright">
        <p>© 2021 - Bản quyền của CTCP PHÁT TRIỂN SẢN PHẨM SÁNG TẠO VIỆT</p>
        <p>Giấy chứng nhận ĐKKD số 62010001329761 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 12/07/2001</p>
        <p>Km 10, Đường Trần Phú, phường Văn Quán, quận Hà Đông, thành phố Hà Nội</p>
      </div>
    </footer>
  );
};

export default Footer;

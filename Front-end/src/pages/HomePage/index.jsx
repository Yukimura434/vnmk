import React from 'react'
import PropTypes from 'prop-types'
import '../HomePage/style.scss';
import newImageProduct from '../../assets/images/NewImageProduct.png';



function HomePage(props) {
  return (
    <div style={{
    }}
      className='wrapper'
    >
      <section className="wrapper__home">
          <div className='wrapper__home__content'>
            <h1>Bàn phím Asus ROG Strix Scope TKL Red Switch</h1>
            <h3>Giá chỉ từ 3.190.000₫</h3>
            <p> - Nhà Sản Xuất : Asus <br />
                - Tình Trạng : Mới 100% - Fullbox <br />
                - Bảo Hành : 24 tháng <br />
                - Switch : Red <br />
                - LED: RGB <br />
                + Nâng cao năng lực của bạn với bàn phím ROG Strix Scope, bàn phím cơ giá rẻ với Xccurate Design với nút Ctrl mở rộng. 
                Khả năng đồng bộ Aura Sync với đèn led RGB cực chất. 
                Chuyển đổi nhanh chóng giữa làm việc và giải trí, ngoài ra bạn có thể bước vào chế độ riêng tư chỉ với 1 nút bấm. 
                ROG Scope được hoàn thiện bằng nhôm cao cấp. Tiếp thêm sức mạnh để chiến thắng với bàn phím ROG Strix Scope. <br /></p>
            <a href="products" className="wrapper__home__content__button">SHOP NOW</a>
          </div>

          <div className='wrapper__home__image'>
            <div className='wrapper__home__image__rhombus'>
              <img src={newImageProduct} alt=""/>
            </div>
          </div>

          <div className="wrapper__home__rhombus2">

          </div>
        </section>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage

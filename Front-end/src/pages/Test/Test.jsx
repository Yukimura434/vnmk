import React from 'react'
import PropTypes from 'prop-types'

function Test(props) {
    const test = (N) => {
        let H = [N]; // Bắt đầu với giá trị N
        while (true) {
            let x = H[H.length - 1]; // Lấy phần tử cuối cùng của mảng H
            if (x === 1) {
                break; // Dừng khi giá trị bằng 1
            } else if (x % 2 === 0) {
                H.push(x / 2); // Nếu số chẵn, chia cho 2 và thêm vào mảng
            } else {
                H.push(x * 3 + 1); // Nếu số lẻ, nhân 3 cộng 1 và thêm vào mảng
            }
        }
        return H;
    };
    
    console.log(test(5));
    
    
  return (
    <div>Test</div>
  )
}

Test.propTypes = {}

export default Test

import React, { useState } from 'react';
import { Dropdown, Menu, Checkbox, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './ProductFilter.css';

const FilterViewer = ({ filters = {}, onChange = null }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    colors: filters.colors || [],
    sizes: filters.sizes || [],
    materials: filters.materials || [],
  });
  
  const [isHovered, setIsHovered] = useState(false); // Thêm state để theo dõi trạng thái hover

  const colors = ['Đen', 'Trắng', 'Xanh', 'Nâu', 'Hồng', 'Vàng', 'Đỏ'];
  const sizes = ['104', '98', '87', '75', '68', '61', '40'];
  const materials = [
    'Nhôm', 'Nhựa', 'Tạ gương'
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...selectedFilters,
      [category]: value,
    };
    setSelectedFilters(newFilters);

    if (onChange) {
      onChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = { colors: [], sizes: [], materials: [] };
    setSelectedFilters(resetFilters);
    if (onChange) {
      onChange(resetFilters);
    }
  };

  const filterMenu = (
    <Menu className="filter-menu" style={{backgroundColor:'white' ,borderRadius:'0px' ,border:'1px solid black'}}>
      <div className="filter-section">
        <Menu.ItemGroup title="MÀU SẮC">
          {colors.map((color, index) => (
            <Menu.Item key={`color-${index}`}>
              <Checkbox
                checked={selectedFilters.colors.includes(color)}
                onChange={(e) => {
                  const newColors = e.target.checked
                    ? [...selectedFilters.colors, color]
                    : selectedFilters.colors.filter(c => c !== color);
                  handleFilterChange('color', newColors);
                }}
              >
                {color}
              </Checkbox>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </div>
      <div className="filter-section">
        <Menu.ItemGroup title="SỐ LƯỢNG PHÍM">
          {sizes.map((size, index) => (
            <Menu.Item key={`size-${index}`}>
              <Checkbox
                checked={selectedFilters.sizes.includes(size)}
                onChange={(e) => {
                  const newSizes = e.target.checked
                    ? [...selectedFilters.sizes, size]
                    : selectedFilters.sizes.filter(s => s !== size);
                  handleFilterChange('keyCount', newSizes);
                }}
              >
                {size}
              </Checkbox>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </div>
      <div className="filter-section">
        <Menu.ItemGroup title="Chất liệu case">
          {materials.map((material, index) => (
            <Menu.Item key={`material-${index}`}>
              <Checkbox
                checked={selectedFilters.materials.includes(material)}
                onChange={(e) => {
                  const newMaterials = e.target.checked
                    ? [...selectedFilters.materials, material]
                    : selectedFilters.materials.filter(m => m !== material);
                  handleFilterChange('materials', newMaterials);
                }}
              >
                {material}
              </Checkbox>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </div>
      <Menu.Divider />
      <Menu.Item>
        {/* <Button type="link" onClick={handleReset} style={{ width: '100%' ,color:'black'}}>
          RESET
        </Button> */}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="filter-container" style={{background:'white' ,borderRadius:'0px'}}>
      <Dropdown overlay={filterMenu} trigger={['click']} style={{background:'#eaeaea' ,borderRadius:'0px'}}>
        <Button
          className="filter-button"
          style={{ background: 'white', borderRadius: 'none' }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
          Filter {isHovered ? <UpOutlined /> : <DownOutlined />}
        </Button>
      </Dropdown>
    </div>
  );
};

export default FilterViewer;

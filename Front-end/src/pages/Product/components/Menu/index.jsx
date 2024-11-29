import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import menuApi from "../../../../api/menuApi";

function MenuItemLeft({ onChange }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await menuApi.getAll();
        setData(response);
      } catch (error) {
        console.log('Failed to fetch menu list', error);
      }
    })();
  }, []);

  const handleOnClick = (e) => {
    const str = e.key;
    const result = str.split(' ');
    if (onChange) {
      const [typeId] = result.slice(-1);
      onChange([result[0], typeId]);
    }
  };

  const menuItem = data.map((menu) => {
    if (!menu._id || !menu.categories) return null; 
    return {
      key: menu._id.toString(),
      icon: <AppstoreOutlined />,
      label: menu.name,
      children: menu.categories.map((category) => {
        if (!category._id || !category.types) return null; 

        return {
          key: `categoryId ${category._id.toString()}`,
          label: category.name,
          onTitleClick: handleOnClick,
          children: category.types.map((type) => {
            if (!type._id) return null; 

            return {
              key: `typeId ${type._id.toString()}`,
              label: type.name,
            };
          }).filter(Boolean), 
        };
      }).filter(Boolean),
    };
  }).filter(Boolean);

  return <Menu mode="inline" style={{ width: '100%', background: 'white' }} items={menuItem} onClick={handleOnClick} />;
};

export default MenuItemLeft;

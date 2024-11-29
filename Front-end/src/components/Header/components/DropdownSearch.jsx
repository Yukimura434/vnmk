import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Input, Menu } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

function DropdownSearch(props) {
    const menu = (
        <Menu>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
        </Menu>
      );
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <div className="search-dropdown">
        <Input placeholder="Search" prefix={<SearchOutlined />} />
        <Button>
          <DownOutlined />
        </Button>
      </div>
    </Dropdown>
  )
}

DropdownSearch.propTypes = {}

export default DropdownSearch

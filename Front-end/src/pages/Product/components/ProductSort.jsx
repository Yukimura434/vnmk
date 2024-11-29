import { Tab, Tabs } from '@material-ui/core'
import PropTypes from 'prop-types'

ProductSort.propTypes = {
    currentSort : PropTypes.string.isRequired,
    onChange : PropTypes.func,
}

function ProductSort({ currentSort,onChange }) {
    
    const handleSortChange = (event , newValue) => {
        if (onChange) onChange(newValue)
    }

  return (
    <Tabs
        value={currentSort}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleSortChange}
        aria-label='disabled tabs exemple'
    >
        <Tab label=" GIÁ THẤP ĐẾN CAO " value="asc"></Tab>
        <Tab label=" GIÁ CAO ĐẾN THẤP " value="desc"></Tab>

    </Tabs>
  )
}

export default ProductSort

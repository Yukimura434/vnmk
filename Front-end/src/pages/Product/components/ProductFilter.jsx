import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import MenuItemLeft from '../components/Menu';

function ProductFilter({ filters, onChange }) {
    const handleCategoryChange = (newCategoryAvailabilityStatus) => {
        if (!onChange) return;
        const newFilters = {
          ...filters,
          typeId: newCategoryAvailabilityStatus[1] || filters.typeId,
        };
        onChange(newFilters);
      };
      

    return (
        <div>
            <MenuItemLeft onChange={handleCategoryChange} />
        </div>
    );
}

ProductFilter.propTypes = {};

export default ProductFilter;

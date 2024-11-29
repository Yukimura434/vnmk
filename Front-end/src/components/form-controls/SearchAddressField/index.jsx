import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useField, useFormikContext } from "formik";
import axios from "axios";

const SearchAddressField = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState(field.value || "");

    const { setFieldValue, setFieldTouched } = useFormikContext();

    useEffect(() => {
        if (inputValue) {
            axios
                .get(
                    `https://rsapi.goong.io/place/autocomplete?input=${inputValue}&api_key=TdpeykZUUxLdwjL0YR7ygbi0G8Jmk3TjBn8nkCuG`
                )
                .then((response) => {
                    const locations = response.data.predictions;
                    const options = locations.map((location) => ({
                        value: location.description,
                    }));
                    setOptions(options);
                })
                .catch((error) => {
                    console.log("error :", error);
                });
        }
    }, [inputValue]);

    const handleOnChange = (value) => {
        setInputValue(value);
        setFieldValue(name, value);
    };

    const handleOnSelect = (value) => {
        setInputValue(value);
        setFieldValue(name, value);
        setFieldTouched(name, true);
    };

    return (
        <AutoComplete
            {...props}
            style={{ width: "100%",fontFamily: 'monospace',height: "58px" }}
            options={options}
            placeholder="Phường/Xã....Quận/Huyện....Thành Phố/Tỉnh"
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onChange={handleOnChange}
            onSelect={handleOnSelect}
            value={inputValue}
        />
    );
};

export default SearchAddressField;

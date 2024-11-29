import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import axios from "axios";

const optionsValue = [
    { label: "Burns Bay Road", value: "1" },
    { label: "Downing Street", value: "2" },
    { label: "Wall Street", value: "3" },
];

export const SearchAddress = () => {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (inputValue) {
            axios
                .get(
                    `https://rsapi.goong.io/place/autocomplete?input=${inputValue}&api_key=TdpeykZUUxLdwjL0YR7ygbi0G8Jmk3TjBn8nkCuG`
                )
                .then((response) => {
                    const locations = response.data.predictions;
                    const options = locations.map((location) => {
                        return {
                            value: location.description,
                        };
                    });
                    setOptions(options);
                })
                .catch((error) => {
                    console.log("error :", error);
                });
        }
    }, [inputValue]);

    const handleOnChange = (value) => {
        setInputValue(value);
    };

    const handOnSelect = (value, option) => {
        console.log("option :", option);
        console.log("value :", value);
    };

    return (
        <AutoComplete
            style={{ width: 200 }}
            options={options}
            placeholder="input your place"
            filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            onChange={handleOnChange}
            onSelect={handOnSelect}
        />
    );
};

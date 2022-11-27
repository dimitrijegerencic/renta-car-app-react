import React, {useEffect} from "react";
import useDebounce from "../../hooks/useDebounce";
import "./Search.scss";
import { Input } from 'antd';
const { Search } = Input;

const SearchField = ({placeholder, onSearch, className = ''}) => {
    const [query, setQuery] = React.useState('');
    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        onSearch(debouncedQuery)
    }, [debouncedQuery])

    return <div className={className}>
        <Search
            placeholder={placeholder}
            size="large"
            allowClear
            onSearch={(value) => {
                setQuery(value)
            }}
            className="__search-field"
        />
    </div>
}

export default SearchField;
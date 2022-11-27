import React, {useEffect, useState} from "react";
import UserCard from "../userCard/UserCard";
import "./FilterList.css";

const FilterList = ({title, list = [], searchProperty}) => {
    const [query, setQuery] = useState("");
    const [filteredList, setFilteredList] = useState(list)

    useEffect(() => {
        if(query?.length > 1){
            const newState = list.filter(user => user[searchProperty].toString().toLowerCase().includes(query.toLowerCase()))

            setFilteredList(newState)
        }else{
            setFilteredList(list)
        }
    }, [query])

    return <div className="filter-list">
        <h3>{title}</h3>
        <div>
            <label htmlFor="search-field">Search:</label>
            <input type="text" id="search-field" onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <div>
            {
                filteredList.map(user => <UserCard key={user.id}
                                                   firstName={user.firstName}
                    lastName={user.lastName}
                    age={user.age}
                    city={user.city}
                    image={user.image}/>)
            }
        </div>
    </div>
}

export default FilterList;
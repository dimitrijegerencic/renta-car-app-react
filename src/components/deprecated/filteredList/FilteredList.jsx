import React, {useEffect, useState} from "react";
import UserCard from "../userCard/UserCard";
import "./FilteredList.css";
import {listOfUsers} from "../../../constants/constants";

const FilteredList = ({title, list = [], searchProperty, setList}) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if(query?.length > 1){
            setList(listOfUsers.filter(user => user[searchProperty].toString().toLowerCase().includes(query.toLowerCase())))
        }else{
            setList(listOfUsers)
        }
    }, [query])

    return <div className="filter-list" style={{height: '100px'}}>
        <h3>{title}</h3>
        <div>
            <label htmlFor="search-field">Search:</label>
            <input type="text" id="search-field" onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <div>
            {
                list.map(user => <UserCard key={user.id}
                                                   firstName={user.firstName}
                    lastName={user.lastName}
                    age={user.age}
                    city={user.city}
                    image={user.image}/>)
            }
        </div>
    </div>
}

export default FilteredList;
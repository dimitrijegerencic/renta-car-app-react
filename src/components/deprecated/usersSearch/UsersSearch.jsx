import React, {useEffect, useState} from "react";
import UserCard from "../userCard/UserCard";
import "./UsersSearch.css";

const UsersSearch = ({title, list = [], search}) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if(query?.length > 1){
            search(query)
        }else{
            search('')
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

export default UsersSearch;
import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

const SearchParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const searchParamName = searchParams?.get("name")
        const searchParamCity = searchParams?.get("city")
        console.log(searchParamName, searchParamCity)
    }, [searchParams])

    return(
        <div>
            Check search params

            <button onClick={() => setSearchParams({"name": "Ana"})}>Set search param name - Ana</button>
            <button onClick={() => setSearchParams({"city": "Podgorica"})}>Set search param city - Podgorica</button>
        </div>
    )
}

export default SearchParams;

import React from 'react';
import {movies} from "../../constants/constants";
import {Link, Outlet} from 'react-router-dom';

const Movies = () => {
    return <div>
        {movies.map(item => <Link key={item?.id} to={`/movies/${item.id}`}>{item.title}</Link>)}
    <div>
        <Outlet/>
    </div>
    </div>
}

export default Movies;
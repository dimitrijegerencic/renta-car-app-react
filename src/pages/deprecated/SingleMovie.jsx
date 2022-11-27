import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {movies} from "../../constants/constants";

const SingleMovie = () => {
    const [data, setData] = useState(null);
    let {id} = useParams();

    useEffect(() => {
        console.log(id)
      const movie = movies.find(item => item.id === parseInt(id, 10));
        console.log(movie)
      setData(movie)
    }, [id])

    return <div>
        {data?.id && data?.title}
    </div>
}

export default SingleMovie;
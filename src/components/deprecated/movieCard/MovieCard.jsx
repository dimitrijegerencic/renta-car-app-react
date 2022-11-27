import React from 'react';
import classes from './MovieCard.module.scss';

const MovieCard = () => {
    return <div className={classes['container']}>
        <div className={classes['image']}>
            <img src={"https://thumbs.dreamstime.com/b/kuala-lumpur-malaysia-april-captain-marvel-movie-poster-carol-danvers-becomes-one-universe-s-most-powerful-heroes-143872796.jpg"} alt="Marvel"/>
        </div>
            <div className={classes['overlay']}/>
            <div className={classes['content']}>
                Description
            </div>
    </div>
}

export default MovieCard;
import React from 'react';
import classes from "./TextWithBackground.module.scss";

const TextWithBackground = ({title}) => {
    return(
        <div className={classes['container']}>{title}</div>
    )
}

export default TextWithBackground;
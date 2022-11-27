import React from 'react';
import classes from "./ButtonRounded.module.scss";

const ButtonRounded = ({label = '', onClick}) => {
    return <button className={classes['button']}
                   onClick={(e) => {
                            e.preventDefault();
                            onClick()
                    }}>
                        {label}
                    </button>
}

export default ButtonRounded;
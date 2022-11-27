import React, {useEffect, useRef} from "react";
import classes from "./UserCard.module.scss";

const UserCard = ({firstName, lastName, age, city, image}) => {

    return <div className={classes["user-card"]}>
        <div className={classes["image-container"]}>
            <img src={image} alt="Profile photo"/>
        </div>
        <div className={classes["user-data"]}>
            <div className={classes["first-name"]}>{firstName}</div>
            <div>{lastName}</div>
            <div>{age}</div>
            <div>{city}</div>
        </div>
    </div>
}

export default UserCard;
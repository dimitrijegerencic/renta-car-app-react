import React from 'react';
import classes from "./BenefitCard.module.scss";
import clsx from "clsx";

const BenefitCard = ({
                         title,
                         description,
                         image,
                         reverseOrder = false
}) => {
    return <div className={clsx(classes['container'], reverseOrder && classes['reverse'])}>
        <div>
            <div>{title}</div>
            <p>{description}</p>
        </div>
        <img src={image} alt={title}/>
    </div>
}

export default BenefitCard;
import React from 'react';
import classes from "./Introduction.module.scss";
import IntroductionImg from "../../../../img/introduction/Group 1174.png";
import Button from "../../../../components/buttons/button/Button";
import InputField from "../../../../components/formFields/inputField/InputField";
import TextWithBackground from "../../../../components/deprecated/textWithBackground/TextWithBackground";
import ButtonRounded from "../../../../components/buttons/buttonRounded/ButtonRounded";

const Introduction = () => {
    return <section className={classes['container']}>
        <div>
            <div>
                <TextWithBackground title="away"/>
            <h1 className={classes['title']}>Sistem za upravljanje odmorima</h1>
            <p className={classes['introductory-text']}>
                Sistem za upravljanje godišnjim odmorima i slobodnim danima vaših zaposlenih, <span>jednostavan kao brojanje do 10.</span>
            </p>
            <div className={classes['input-container']}>
                <InputField placeholder="Enter your email address"/>
            </div>
            <Button label="Try 1 month free" onClick={() => console.log("try for free")}/>
            </div>
        </div>
        <div>
            <img src={IntroductionImg} alt="away Dashboard"/>
        </div>
    </section>
}

export default Introduction;
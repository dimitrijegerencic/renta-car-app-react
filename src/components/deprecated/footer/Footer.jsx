import React from 'react';
import FacebookIcon from "../../../img/footer/facebook.svg";
import InstagramIcon from "../../../img/footer/instagram.svg";
import LinkedinIcon from "../../../img/footer/linkedin.svg";
import YoutubeIcon from "../../../img/footer/youtube.svg";
import classes from "./Footer.module.scss";

const Footer = () => {
    const now = new Date();
    return <footer className={classes['container']}>
        <div className={classes['social']}>
            <a href="#"><img src={FacebookIcon} alt="Facebook"/></a>
            <a href="#"><img src={InstagramIcon} alt="Instagram"/></a>
            <a href="#"><img src={LinkedinIcon} alt="Linkedin"/></a>
            <a href="#"><img src={YoutubeIcon} alt="Youtube"/></a>
        </div>
        <div className={"copy"}>
            © Sva prava zadržana {now.getFullYear()} <a href="#">Amplitudo d.o.o.</a>
        </div>
        <div className={classes['contact']}>
            <a>Politika privatnosti</a>
            <a href="mailto:info@amplitudo.me">info@amplitudo.me</a>
            <a href="tel:+38220223244">+382 20 223 244</a>
        </div>
    </footer>
}

export default Footer;
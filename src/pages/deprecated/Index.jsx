import React from 'react';
import Navigation from "../../components/navigation/Navigation";
import Introduction from "./index/introduction/Introduction";
import WhyAway from "./index/whyAway/WhyAway";
import Benefits from "./index/benefits/Benefits";
import classes from "./Index.module.scss";
import Footer from "../../components/deprecated/footer/Footer";
import MovieCard from "../../components/deprecated/movieCard/MovieCard";

const Index = () => {
    return <div className={classes['container']}>
        <div className={classes['navigation']}>
            <Navigation/>
        </div>
        <div className={classes['page-body']}>
            <Introduction/>
            <WhyAway/>
            <div style={{
                paddingTop: '50px',
                paddingBottom: '50px'
            }}>
            <MovieCard/>
            </div>
            <Benefits/>
            <Footer/>
        </div>
    </div>
}

export default Index;
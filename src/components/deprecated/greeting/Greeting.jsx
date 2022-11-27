import React from "react";
import "./Greeting.css";
import Name from "../name/Name";

const Greeting = () => {
    return(<div className="container">Hello!
        <Name firstName="Marko"
              lastName="Markovic"
              age="15"
                city="Podgorica"/>
    </div>)
}

export default Greeting;
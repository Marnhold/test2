import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";


function Card({ astro }) {
    return (
        <div className="card">
        
            <img className="person-image" src={astro.src} alt="pic" />
            
            <h2 className="person-info"> {astro.name} </h2>
            <h4 className="person-info"> {astro.desc} </h4>
            <tr className="person-info"> {astro.text} </tr>
        </div>

      
    );
}

function GetAstros() {
    const [astros, setAstros] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get("http://api.open-notify.org/astros.json");
        var people = response.data.people;

        for (const astro of people){

            
            if (astro.name == "Sultan Alneyadi") astro.name = "Sultan Al Neyadi";
            var name = astro.name;
            name = name.replace(/\s/g, '_');
            var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + name;

            try {
                var response2 = await axios.get(url);
            } catch (error) {
                
            }

                if(response2.data.originalimage == null){
                    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + name + "_(cosmonaut)"; 

                    try {
                        response2 = await axios.get(url);
                    } catch (error) {
                        url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + name + "_(taikonaut)"; 
                        try {
                            response2 = await axios.get(url);
                        } catch (error) {
                            url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + name + "_(astronaut)"; 
                            try {
                                response2 = await axios.get(url);
                            } catch (error) {
                            }
                        }
                    }

                }

                astro.src = response2.data.originalimage.source;
                astro.desc = response2.data.description;
                astro.text = response2.data.extract;
                console.log(astro.name);
                console.log(astro.src);
                console.log(astro.desc);
                console.log(astro.text);
                console.log("!!!!!!!!!!!!!!!!!!!!!");


        }

        setAstros(people);

        } catch (error) {
        console.log(error);
        }
    };
    fetchData();
    }, []);


    const cardComponent = astros.map((astro) => (
        <Card key= {astro.name} astro={astro} />
    ));

    return (

            <div className="teamContainer">{cardComponent}</div>

    );

}

export default GetAstros;


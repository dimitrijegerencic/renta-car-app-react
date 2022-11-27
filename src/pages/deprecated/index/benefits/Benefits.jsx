import React from 'react';
import classes from "./Benefits.module.scss";
import TextWithBackground from "../../../../components/deprecated/textWithBackground/TextWithBackground";
import ApplicationImg from "../../../../img/benefits/aplikacija.svg";
import AutomatImg from "../../../../img/benefits/automatizacija.svg";
import OrgImg from "../../../../img/benefits/organizacija.svg";
import BenefitCard from "../../../../components/deprecated/benefitCard/BenefitCard";

const Benefits = () => {
    const list = [
        {
            title: 'Automatizacija procesa i izrade dokumentacije',
            description: <>aWay sistem će se pobrinuti za sve zbunjujuće kalkulacije vezane za <span> obračun, izvještaje, rješenja i plan slobodnih dana i odmora. </span> Dokumenta i procesi koji su administrativnim i HR službama oduzimali vrijeme, gotovi su uz samo par klikova. Pomoću automatizacije povećava se efikasnost poslovanja, a fokus se pomjera na ono što je najvažnije - Vaši zaposleni!</>,
            image: AutomatImg,
            reverseOrder: false,
        },
        {
            title: 'Bolja organizacija poslovanja',
            description: <>Automatizovani sistem za prisustvo i odlaske osigurava jasnu ideju o tome koji zaposleni su dostupni u određenom periodu i na taj način olakšava planiranje projekata i radnih zaduženja.</>,
            image: OrgImg,
            reverseOrder: true
        },
        {
            title: 'Mobilna aplikacija',
            description: <>Mobilni uređaji su uvijek uz nas, tako da su uz aWay mobilnu aplikaciju sve najažurnije informacije o odmorima i slobodnim danima zaposlenih dostupne 24/7.</>,
            image: ApplicationImg,
            reverseOrder: false
        },
    ]

    return <section className={classes['container']}>
        <div>
            <h3 className={classes['title']}><TextWithBackground title="Benefiti"/> koje donosi away</h3>
            <div className={classes['list-container']}>
                {
                    list.map((item, index) => <BenefitCard
                        key={`${item.title}-${index}`}
                        reverseOrder={index % 2}
                        title={item.title}
                        description={item.description}
                        image={item.image}/>)
                }
            </div>
        </div>
    </section>
}

export default Benefits;
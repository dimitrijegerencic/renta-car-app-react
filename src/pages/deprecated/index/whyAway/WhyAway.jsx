import React from 'react';
import classes from "./WhyAway.module.scss";

const WhyAway = () => {
    return <section className={classes['container']}>
        <div>
            <h2 className={classes['title']}>ZASTO aWAY?</h2>
            <p className={classes['text']}>
                Drago vam je što se zaposleni raduju ljetnjim odmorima - sve dok ne pogledate datume i ne shvatite da su svi oni zakazani za istu nedjelju u julu? Poznati scenario koji se uz aWay ne može dogoditi.
            </p>
            <p className={classes['text']}>
                Uz ovaj sistem u svakom trenutku postoji <span>jasan pregled svih slobodnih dana</span>, godišnjih odmora zaposlenih unutar organizacije, mogućnost kreiranja zahtjeva za iste, kao i opciju (ne)odobravanja termina od strane nadređenih i HR službe. Osim toga, aWay direktno pravi plan i rješenja o godišnjim odmorima, kao i potrebne propratne izvještaje koji su do sada uveliko oduzimali vrijeme administrativnim i HR službama.
            </p>
            <p className={classes['text']}>
                Automatizacija procesa upravljanja smanjuje mogućnost konfuzije, preklapanja odmora unutar sektora, vrijeme izrade plana i rješenja o odmorima, grešaka u slanju zahtjeva i nepravovremenih odobrenja, a povećava transparentnost informacija i efikasnost poslovanja.
            </p>
        </div>
    </section>
}

export default WhyAway;
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {green, blueGrey} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    text: {
        color: blueGrey[100],
        fontSize: 14,
    },
    title: {
        color: green[700],
        fontSize: 17,
    },
}));
export default function HelpText() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h3 className={classes.title}>Paste your decklist in the field below then press Submit to calculate percentages of playing your spells on curve.</h3>
            <p className={classes.text}>These numbers are conditional probabilities of being able to cast your spell assuming you have enough lands.</p>
            <p className={classes.text}>For example, if you wanna play a Jace, the mind's Sculptor, it will get every combination of 4 lands your deck can produce and calculate the ratio of them that can play the spell.</p>
            <p className={classes.text}>It won't work well on a decklist that doesn't have an accurate amount of lands, but will work on decks of any length.</p>
            <p className={classes.text}>The complexity is exponential, so while 40 cards decklist will be pretty quick to calculate, Brawl decklist could take a while.</p>
            <p className={classes.text}>This tool takes fetchlands, taplands and checklands into account. For example a guildgate and a checkland won't be able to play a 2 mana spell on curve, while a triome and a checkland will.</p>
            <p className={classes.text}>Project Manabase only evaluates lands so far, so mana dorks won't count towards your numbers.</p>
            <p className={classes.text}>I hope you'll use it and like it. I will continue improving the UI and adding features, so don't hesitate to reach out to me :)</p>
            <p className={classes.text}>This is a project I work on for free on my free time, so don't be too hard on me too !</p>
        </div>
    )
}

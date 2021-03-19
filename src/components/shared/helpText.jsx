import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    answer: {
        color: blueGrey[100],
        fontSize: 14,
    },
    question: {
        color: green[700],
        fontSize: 17,
    },
}));
export default function HelpText() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p className={classes.question}>How do I use it ?</p>
            <p className={classes.answer}>
                Export your decklist (from MTGA, Mtggoldfish, etc...) then paste your decklist and press Submit.
            </p>
            <p className={classes.question}>What do the numbers mean ?</p>
            <p className={classes.answer}>
                P2 numbers are conditional probabilities of being able to cast your spell assuming you have enough
                lands. For example, if you wanna play a Jace, the mind's Sculptor, it will get every combination of 4
                lands your deck can produce and calculate the ratio of them that can play the spell.
            </p>
            <p className={classes.answer}>
                P1 numbers are P2 numbers multiplied by the probability of hitting your Nth land by turn K (with K=N+7).
            </p>
            <p className={classes.answer}>
                The Lands numbers represent the ability of each land to play a spell on curve.
            </p>
            <p className={classes.question}>How am I supposed to use Project Manabase ?</p>
            <p className={classes.answer}>
                Look at the numbers, cut the worst lands and hardest spells to cast, and iterate until your manabase
                looks good enough. Ask more of your manabase !
            </p>
            <p className={classes.question}>Why are the numbers strange for my deck ?</p>
            <p className={classes.answer}>
                It won't work well on a decklist that doesn't have an accurate amount of lands, but will work on decks
                of any length.
            </p>
            <p className={classes.answer}>
                In addition, Project Manabase only evaluates lands so far, so mana dorks and Cantrips won't count
                towards your numbers.
            </p>
            <p className={classes.question}>Why does it take that much time ?</p>
            <p className={classes.answer}>
                The complexity is exponential, so while 40 cards decklist will be pretty quick to calculate, Brawl
                decklist could take a while. And I do pay for the computing power, so I keep it low so far.
            </p>
            <p className={classes.question}>Does it take every land into account ?</p>
            <p className={classes.answer}>
                This tool takes fetchlands, ravlands, taplands, checklands, fliplands into account. For example a
                guildgate and a checkland won't be able to play a 2 mana spell on curve, while a triome and a checkland
                will. Strange lands like Phyrexian Tower and Interplanar Beacon aren't handled yet. Almost every classic
                mana producing land is handled (including snow lands).
            </p>
            <p className={classes.question}>What about you ?</p>
            <p className={classes.answer}>
                I hope you'll use it and like it. I will continue improving the UI and adding features, so don't
                hesitate to reach out to me :) You can find me on Twitter @WickedFridge or on discord CharlesW
                (WickedFridge)#7589
            </p>
            <p className={classes.answer}>
                This is a project I work on for free on my free time, so don't be too hard on me too !
            </p>
        </div>
    );
}

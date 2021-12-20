import React from 'react';
import styles from './helpText.module.scss';

const HelpText = () => (
    <div className={styles.helpText}>
        <h4>How do I use it ?</h4>
        <p>Export your decklist (from MTGA, Mtggoldfish, etc...) then paste your decklist and press Submit.</p>
        <h4>What do the numbers mean ?</h4>
        <p>
            P2 numbers are conditional probabilities of being able to cast your spell assuming you have enough lands.
            For example, if you wanna play a Jace, the mind's Sculptor, it will get every combination of 4 lands your
            deck can produce and calculate the ratio of them that can play the spell.
        </p>
        <h4>
            P1 numbers are P2 numbers multiplied by the probability of hitting your Nth land by turn K (with K=N+7).
        </h4>
        <p>The Lands numbers represent the ability of each land to play a spell on curve.</p>
        <h4>How am I supposed to use Project Manabase ?</h4>
        <p>
            Look at the numbers, cut the worst lands and hardest spells to cast, and iterate until your manabase looks
            good enough. Ask more of your manabase !
        </p>
        <h4>Why are the numbers strange for my deck ?</h4>
        <p>
            It won't work well on a decklist that doesn't have an accurate amount of lands, but will work on decks of
            any length.
        </p>
        <p>
            In addition, Project Manabase only evaluates lands so far, so mana dorks and Cantrips won't count towards
            your numbers.
        </p>
        <h4>Why does it take that much time ?</h4>
        <p>
            The complexity is exponential, so while 40 cards decklist will be pretty quick to calculate, Brawl decklist
            could take a while. And I do pay for the computing power, so I keep it low so far.
        </p>
        <h4>Does it take every land into account ?</h4>
        <p>
            This tool takes fetchlands, ravlands, taplands, checklands, fliplands into account. For example a guildgate
            and a checkland won't be able to play a 2 mana spell on curve, while a triome and a checkland will. Strange
            lands like Phyrexian Tower and Interplanar Beacon aren't handled yet. Almost every classic mana producing
            land is handled (including snow lands).
        </p>
        <h4>What about you ?</h4>
        <p>
            I hope you'll use it and like it. I will continue improving the UI and adding features, so don't hesitate to
            reach out to me :) You can find me on Twitter @WickedFridge or on discord CharlesW (WickedFridge)#7589
        </p>
        <p>This is a project I work on for free on my free time, so don't be too hard on me too !</p>
    </div>
);

export default HelpText;

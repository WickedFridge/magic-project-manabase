import React from "react";

export default function HelpText(props) {
    const classes = { props };
    return (
        <div className={classes.root}>
            <h3>Paste your decklist in the field below then press Submit to calculate percentages of playing your spells on curve.</h3>
            <p>These numbers are conditional probabilities of being able to cast your spell assuming you have enough lands.</p>
            <p>For example, if you wanna play a Jace, the mind's Sculptor, it will get every combination of 4 lands your deck can produce and calculate the ratio of them that can play the spell.</p>
            <p>It won't work well on a decklist that doesn't have an accurate amount of lands, but will work on decks of any length.</p>
            <p>The complexity is exponential, so while 40 cards decklist will be pretty quick to calculate, Brawl decklist could take a while.</p>
            <p>This tool takes fetchlands, taplands and checklands into account. For example a guildgate and a checkland won't be able to play a 2 mana spell on curve, while a triome and a checkland will.</p>
            <p>Project Manabase only evaluates lands so far, so mana dorks won't count towards your numbers.</p>
            <p>I hope you'll use it and like it. I will continue improving the UI and adding features, so don't hesitate to reach out to me :)</p>
            <p>This is a project I work on for free on my free time, so don't be too hard on me too !</p>
        </div>
    )
}

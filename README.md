# Project Manabase
This Project is developped with a goal of color sources optimization.
The Goal is to have the best mix of lands to play your spells.
It has been started by Charles Wickham in February 2020.

## TODO
- [x] express
- [x] scryfall
    - [x] call scryfall with the decklist
    - [x] get simple objects
    - [x] test that everything matches
    - [x] test with mocked scryfall
- deployment
    - [x] expose cloud function
    - [x] expose basic front
- features
    - backEnd
        - mana
            - [x] handle ravlands
            - [ ] handle phyrexian mana
            - [x] handle hybrid mana
            - [ ] handle fetchlands
            - [ ] handle checklands
        - modal spells
            - [x] handle splitcards
            - [ ] handle evoke
            - [ ] handle escape
            - [ ] handle X spells
    - front
        - [ ] nice recap graph
        - [ ] mean / median / percentiles
        - [ ] navbar
            - [ ] chose X spell
            - [ ] %'s of playing spells at N+X
        - [ ] nice sideboard input
        
- performance upgrades
    - [ ] handle colorless spells
    - [ ] use reddis for the cache
    - [ ] parallelization
        - [x] try parallel.js
        - [x] try multi-services archi
        - [ ] try clusters
    - architecture refactoring
        - [ ] precalculate / cache "generic combinations"
        - [x] "on the go calculation"

## Usage

### Setup
```
cd functions/
npm run serve
```

### *[POST]* /analyze
```
{
    "deck": [
        "4 Temple of Mystery",
        "2 Island",
        "4 Forest",
        "2 Mountain",
        "1 Frilled Mystic",
        "2 Growth Spiral"
    ]
}
```

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
    - [ ] expose cloud function
    - [ ] expose basic front
- features
    - mana
        - [ ] handle ravlands
        - [ ] handle phyrexian mana
        - [ ] handle fetchlands
    - modal spells
        - [ ] handle evoke
        - [ ] handle escape
        - [ ] handle X spells
- performance upgrades
    - [ ] handle colorless spells
    - [ ] use reddis for the cache
    - [ ] parallelization
        - [ ] try parallel.js
        - [ ] try multi-services archi
    - architecture refactoring
        - [ ] "on the go calculation"

## Usage

### Setup
```
node src/
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

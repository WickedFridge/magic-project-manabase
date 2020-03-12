# Project Manabase
This Project is developped with a goal of color sources optimization.
The Goal is to have the best mix of lands to play your spells.

## TODO
- [x] express
- [x] scryfall
    - [x] call scryfall with the decklist
    - [x] get simple objects
    - [ ] test that everything matches
    - [ ] test with mocked scryfall


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
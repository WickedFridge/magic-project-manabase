# Project Manabase
This Project is developped with a goal of color sources optimization.
The Goal is to have the best mix of lands to play your spells.

## TODO
- [ ] express
- [ ] scryfall
    - [ ] call scryfall with the decklist
    - [ ] get simple objects
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
	"deck": "4 Arboreal Grazer
             2 Elvish Mystic
             2 Llanowar Elves
             4 Satyr Wayfinder
             4 Uro, Titan of Nature's Wrath
             4 Nissa's Pilgrimage
             4 Nissa, Who Shakes the World
             4 Cavalier of Thorns
             2 World Breaker
             3 Ugin, the Spirit Dragon
             1 Ulamog, the Ceaseless Hunger
             4 Breeding Pool
             1 Fabled Passage
             2 Ipnu Rivulet
             2 Yavimaya Coast
             3 Hinterland Harbor
             1 Island
             1 Sanctum of Ugin
             2 Castle Garenbrig
             9 Forest
             1 Lumbering Falls"
}
```
![BattleMap](./src/public/images/logo.png)

BattleMap is a fun tool that maps historical European battles.

You enter a place name and BattleMap plots all battles that have occurred in within a given-mile radius.

**Versions**
- Original submission ([v1.0](https://github.com/daveg1/battlemap/tree/v1.0))
- Upgrade backend to TypeScript ([v2.0](https://github.com/daveg1/battlemap/tree/v2.0))

## Instructions

### Importing to MongoDB
```sh
cd src/data
mongoimport --db=battlemap --collection=battles --file=battles.json --jsonArray
```

### Running Application
```sh
yarn
yarn start
# development
yarn dev
```

## Credits
### Authors
| Name | Link | Matric. |
| --- | --- | --- |
| David Graham | [daveg1](https://github.com/daveg1) | 1911734 |
| Simonas Lynikas | [YourRentIsDue](https://github.com/YourRentIsDue) | 1912153 |
| Calum Marr | [cazzy2812](https://github.com/cazzy2812) | 1901846 |
| Brodie Dack | [KuroUrbana](https://github.com/KuroUrbana) | 1901361 |

### Assets
| Name | Link |
| --- | --- |
| Europe GeoJSON | [github/leakyMirror/map-of-europe](https://github.com/leakyMirror/map-of-europe) |
| Map Tiles | [openstreetmap](https://www.openstreetmap.org/copyright) |
| Logo Font (Carolus FG) | [1001fonts/carolus-fg-font](https://www.1001fonts.com/carolus-fg-font.html) |
| Site Font (Frutiger) | [cufonfonts/frutiger](https://www.cufonfonts.com/font/frutiger) |
| Arrow Divider | [wpclipart](https://www.wpclipart.com/world_history/warfare/bow_arrow/Arrow.png.html) |
| Sword Outline | [patternuniverse](https://patternuniverse.com/download/viking-sword-pattern/) |
| Map Outline | [clipart-library](http://clipart-library.com/treasure-map-outline.html) |
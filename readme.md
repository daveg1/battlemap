# BattleMap

This is a modernised version of the [BattleMap](https://github.com/daveg1/battlemap) project I worked on in Year 3 at University.

The original version has been tagged as v1.0. Run `git show v1.0` to see more information.

This project converts the old Express-Mongo-jQuery stack into Express-Mongoose-x-typescript.

See the old project linked above for the full credits.

## Instructions for running
1. `npm i`
2. `cd public/json`
3. `mongoimport --db=battlemap --collection=battles --file=battles.json --jsonArray`
4. `cd ../..`
5. `npm start`
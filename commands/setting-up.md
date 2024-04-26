# Setting up the project 

Those are all the commands I ran to set up this project

## Initializing the project

```bash 
mkdir fixmi-microservice-templace
cd fixmi-microservice-templace

npm init -y
```

## Configuring the typescript compiler

```bash
npm install --save-dev typescript
```

Create the configuration file for the TypeScript compiler:

```bash 
touch tsconfig.json
```
Inside tsconfig.json:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

## Creating a Minimal TypeScript Express Server

```bash
npm install --save express
npm install -save-dev @types/express
```
The second command installs the express types for TypeScript support.

```bash 
mkdir src
touch src/app.ts
```

Inside `app.ts`:
```typescript 

import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
```

Compile to JavaScript:
```bash 
npx tsc
```

And run:
```bash 
node dist/app.js
```

## Configuring Typescript Linting with eslint

ESLint statically analyzes your code to quickly find problems. It allows creating a series of assertions called lint rules around what your code should look or behave like, as well as auto-fixer suggestions to improve your code for you, and loading in lint rules from shared plugins.

```bash 
npm install --save-dev eslint
npx eslint --init
```
I choose the following settings on the setup:
```
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

Run the linter to check all files with the .ts TypeScript extension:

```bash 
npx eslint . --ext .ts
```

## Updating the package.json File

We will add a start script to transpile the TypeScript and then run the application.
We will also add a slint script to run eslint 

Add those lines in `package.json`:
```json 
  "main": "dist/app.js",
  "scripts": {
    "start": "tsc && node dist/app.js",
    "lint": "eslint . --ext .ts",
 
```

From now on, when running the app we can do:
```bash 
npm run lint
npm run start 
```

## Pushing everything on github 

I created the new repo on github, now we need to create a local repo and push it.
I also created a README.md file
```bash 
git init 
git add --all
git commit -m "base project, express + typescript + eslint"
git branch -M main
git remote add origin https://github.com/IS-FixMi/fixme-microservice-template.git
git push -u origin main
```

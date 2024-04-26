# Setup React

Install react with typescript, It will take some time.
```bash 
npx create-react-app client --template typescript
```

Remove the git folder that Reacts installs by default.
```bash
cd client 
rm -rf .git
```

Now I have to find a way to compile everything nicely.
The first thing to do is to exclude `client/` from tsc transcription 
since reacs uses jsx.
I added the following line to the tsconfig.json adter `"compilerOptions": {}`
```json
  "exclude": [
    "client/*"
  ],
```

At this point we can run `npm run lint` to analyze the code, `npm run start` to start the backend, and inside `client/` we can run `npm start` 

React automatically refreshes the browser every time we make a change to the frontend, we want to achieve something similar to the backand

## Nodemon

```bash 
npm install nodemon 
```

And we can change the script inside `package.json` like so:
```json 
"start": "tsc && nodemon dist/app.js",
```

This will update the browser each time we change the javascript, but we are only working with typescript. We need to install `ts-node` and give the typescript file to nodemon
```json 
"start": "nodemon src/app.ts",
```

I removed tsc as It's no longer needed

We will need Axios for api calls inside react:
```bash 
npm install axios
```

## Linking front-end and back-end 

To allow both front end and back end to run in the same process we can use concurrently
```bash 
npm install concurrently 
```

Inside `package.json`
```json 
  "scripts": {
    "startfront": "PORT=3002 npx react-scripts start",
    "startback": "nodemon src/api/app.ts",
    "start": "concurrently \" npm run startback\" \" npm run startfront\" ",
    "lint": "eslint . --ext .ts",
 
```

I made a major refactoring, now react is in the same project as the backed

I had to exlude react components from tsc in `tsconfig.json`

```json 
  "exclude": [
    "client/*",
    "src/components/*",
    "src/index.tsx"
  ],
```

# Node Extract env variables
This repo will extract the environment variables in the .env.example file of the repo. 
## Steps to do that
- Clone the repo to local
- Install the packages `npm i`
- To scan files and generate the .env file run the below command. 

```js
node extract-env-vars.js <PATH_OF_YOUR_PROJECT>
```
- `.env.example` file will get generated at the given path if the environment variables found at the directory.

## Rules to scan 
__In the node project there should be the environment variables written with `process.env.VARIABLE_NAME`__ 


//This file exist only for set some configuration for typescript. 

//The app must be executed from the dist directory.
try{
	process.chdir('./dist');
}catch(error) {
	console.error("You need to run typescript compiler before executing the code.", error);
}

//tsconfig-paths: Adds the typescript modules resulution paths attribute to the normal node require.
const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
    baseUrl: tsConfig.compilerOptions.baseUrl,
    paths: tsConfig.compilerOptions.paths
});

//source-map-support: Adds support for the source maps that typescrpts generate. Helpfull for debugging stack traces.
require("source-map-support").install();

//Start the server
require('./dist/src/server.js');

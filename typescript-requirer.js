/*
This file exist only for set some configuration for typescript. 

"process.chdir('./dist')": The app must be executed from the dist directory.
tsconfig-paths: Adds the typescript modules resulution paths attribute to the normal node require.
source-map-support: Adds support for the source maps that typescrpts generate. Helpfull for debugging stack traces.
*/

try{
	process.chdir('./dist');
}catch(error) {
	console.error("You need to run typescript compiler before executing the code.", error);
}

const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
    baseUrl: tsConfig.compilerOptions.baseUrl,
    paths: tsConfig.compilerOptions.paths
});

require("source-map-support").install();

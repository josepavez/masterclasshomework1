

// Container for all the enviroments
var enviroments = {};

// Staging (default) enviroment
enviroments.staging = {
  'port' : 3000,
  'envName' : 'staging'
};

enviroments.production = {
  'port' : 5000,
  'envName' : 'production'
};

// Determine which enviroment was passed as a command-line argument
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

console.log("currentEnviroment",currentEnviroment);
console.log("currentEnviroment Value",enviroments[currentEnviroment]);

// Check that the current enviroment s one of the enviromens above, if not, default to staging
var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging;

module.exports = enviromentToExport;

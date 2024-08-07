# Postman variable injector for Openapi 3.0 spec

This tool automatically adds `{{postman_variables}}` with the same name as the request parameters and request body properties, so that you can quickly add parameterised test scripts to the endpoints.

## How to use the tool

First place the JSON file exported from Apicurio/Swagger/Openapi in the `/input` folder in this directory, and rename it to `data.json`.

### Docker

Requires [Docker](https://www.docker.com/) to be installed.

- Open a terminal in this directory
- Build the image: `./build.sh`
- Run the container: `./run.sh`
- The output file will now be available: `/output/collection.json`

### Locally

Requires Node v22 ([Linux, Mac, WSL](https://github.com/nvm-sh/nvm), [Windows](https://github.com/coreybutler/nvm-windows)) to be installed.

Follow the steps in the Dockerfile and the bash scripts.

## Import the generated file to Postman

You can now import the resulting file into Postman, and you should see that variables are now implemented on all query parameters and request body properties.

### Use the variables

Add pre-scripts to your requests to set the variable values (set collection variables).

Optionally set variables in environment variables, so that you can run any request at any time to check the response.

#### Arrays and Objects

In Postman request scripts, arrays and objects are set as follows:

```javascript
const myArray = ["some", "values"];
pm.collectionVariables.set("postman_array_var", JSON.stringify(myArray));
```

Normal values (strings, integers) can be set without being stringified first.

## Run the unit tests

You can run the unit tests by executing the bash script: `./test.sh`
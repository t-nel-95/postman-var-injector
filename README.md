# Postman variable injector for Openapi spec

This tool automatically adds `{{postman_variables}}` with the same name as the request parameters and request body properties, so that you can quickly add parameterised test scripts to the endpoints.

## How to use the tool

First place the JSON file exported from Apicurio/Swagger/Openapi in this directory, and rename it to `data.json`.

### Docker

- Run the included dockerfile
- Copy the created file `test.json` from the container
- `docker cp <containerId>:/file/path/within/container /host/path/target`
- You can get the containerId with `docker ps -a`

### Locally

- `node variable_injector.js`

## Import the generated file to Postman

You can now import the resulting file into Postman, and you should see that variables are now implemented on all query parameters are request body properties.

### Use the variables

Add pre-scripts to your requests to set the variable values (set collection variables).

### Arrays

Some request body properties may be arrays, you will need to set these values with a compatible value.

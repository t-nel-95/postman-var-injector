const Converter = require('openapi-to-postmanv2');
// TODO: Switch to a fetch
const fs = require("fs");
// Input file
let openapi_spec = require("./input/data.json");

// Helper functions
const postman_param_fmt = (param_name) => {
    return `{{${param_name}}}`;
}
const postman_var_fmt = (var_name, parent) => {
    return `{{${parent}_${var_name}}}`;
};
const postman_arr_var_fmt = (arr_name, parent) => {
    return `{{${parent}_arr_${arr_name}}}`;
};
const postman_obj_var_fmt = (obj_name, parent) => {
    return `{{${parent}_obj_${obj_name}}}`;
};
const remove_variable_quotes = (collection_as_string, regex) => {
    return collection_as_string.replace(regex, (match) => {
        return match.replace(/\\\"/gm, "");
    })
}

// iterate Endpoints
for (const [endpoint, endpoint_props] of Object.entries(openapi_spec.paths)) {
    // iterate Global params
    if (endpoint_props.hasOwnProperty("parameters")) {
        for (let index = 0; index < endpoint_props.parameters.length; index++) {
            const param = endpoint_props.parameters[index];
            const postman_var = postman_param_fmt(param.name);
            openapi_spec.paths[endpoint].parameters[index].schema.default = postman_var;
        }
    }
    // iterate Method-specific parameters
    ["get", "put", "post", "delete", "patch"].forEach((method) => {
        if (endpoint_props.hasOwnProperty(method)) {
            if (endpoint_props[method].hasOwnProperty("parameters")) {
                for (
                    let index = 0;
                    index < endpoint_props[method].parameters.length;
                    index++
                ) {
                    const param = endpoint_props[method].parameters[index];
                    const postman_var = postman_param_fmt(param.name);
                    openapi_spec.paths[endpoint][method].parameters[
                        index
                    ].schema.default = postman_var;
                }
            }
        }
    });
}

// iterate Request bodies
for (const [schema, schema_props] of Object.entries(openapi_spec.components.schemas)) {
    if (schema_props.hasOwnProperty("properties")) {
        // iterate Properties
        for (const [property, property_props] of Object.entries(
            schema_props.properties
        )) {
            if (property_props.type == "array") {
                openapi_spec.components.schemas[schema].properties[
                    property
                ].default = postman_arr_var_fmt(property, schema);
            } else if (property_props.type == "object") {
                openapi_spec.components.schemas[schema].properties[
                    property
                ].default = postman_obj_var_fmt(property, schema);
            } else {
                let property_name = property;
                openapi_spec.components.schemas[schema].properties[
                    property
                ].default = postman_var_fmt(property_name, schema);
            }
        }
    }
}

// Convert to Postman collection
let postman_collection;
const data = {
    type: 'json',
    data: openapi_spec
}
Converter.convert(data, undefined, (err, res) => {
    if (err) {
        console.error(err);
    }
    postman_collection = res.output[0].data;

    const array_var_regex = /\\\"{{\w+_arr_\w+}}\\\"/gm;
    const object_var_regex = /\\\"{{\w+_obj_\w+}}\\\"/gm;

    // Remove quotes around arrays and objects
    let collection_as_string = JSON.stringify(postman_collection);
    collection_as_string = remove_variable_quotes(collection_as_string, array_var_regex);
    collection_as_string = remove_variable_quotes(collection_as_string, object_var_regex);

    fs.writeFile("./output/collection.json", collection_as_string, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

module.exports = {
    postman_param_fmt,
    postman_var_fmt,
    postman_arr_var_fmt,
    postman_obj_var_fmt,
    remove_variable_quotes
}
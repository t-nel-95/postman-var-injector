// TODO: Switch to a fetch
const fs = require("fs");
let json = require("./input/data.json");

// Helper functions

const postman_var_fmt = (string) => {
  return `{{${string}}}`;
};
const postman_arr_var_fmt = (string) => {
  return [`{{arr_${string}}}`];
};

// iterate Endpoints
for (const [endpoint, endpoint_props] of Object.entries(json.paths)) {
  // iterate Global params
  if (endpoint_props.hasOwnProperty("parameters")) {
    for (let index = 0; index < endpoint_props.parameters.length; index++) {
      const param = endpoint_props.parameters[index];
      const postman_var = postman_var_fmt(param.name);
      json.paths[endpoint].parameters[index].schema.default = postman_var;
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
          const postman_var = postman_var_fmt(param.name);
          json.paths[endpoint][method].parameters[
            index
          ].schema.default = postman_var;
        }
      }
    }
  });
}

// iterate Request bodies
for (const [schema, schema_props] of Object.entries(json.components.schemas)) {
  if (schema_props.hasOwnProperty("properties")) {
    // iterate Properties
    for (const [property, property_props] of Object.entries(
      schema_props.properties
    )) {
      if (property_props.type == "array") {
        json.components.schemas[schema].properties[
          property
        ].default = postman_arr_var_fmt(property);
      } else {
        json.components.schemas[schema].properties[
          property
        ].default = postman_var_fmt(property);
      }
    }
  }
}

fs.writeFile("./output/pre_inject.json", JSON.stringify(json), (err) => {
  if (err) {
    console.log(err);
  }
});

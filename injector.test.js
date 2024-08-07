const { postman_param_fmt, postman_var_fmt, postman_arr_var_fmt, postman_obj_var_fmt,remove_variable_quotes } = require ("./injector.js");

test("Check parameter formatting", () => {
    expect(postman_param_fmt("myParameter")).toBe("{{myParameter}}");
});

test("Check variable formatting", () => {
    expect(postman_var_fmt("myVariable", "mySchema")).toBe("{{mySchema_myVariable}}");
});

test("Check array formatting", () => {
    expect(postman_arr_var_fmt("myVariable", "mySchema")).toBe("{{mySchema_arr_myVariable}}");
});

test("Check array formatting", () => {
    expect(postman_obj_var_fmt("myVariable", "mySchema")).toBe("{{mySchema_obj_myVariable}}");
});

test("Check variable quote removal", () => {
    const fullString = "Don't remove: <\\\"ignore\\\"> ; do remove: <\\\"target\\\">";
    const re = /<\S*target\S*>/gm
    expect(remove_variable_quotes(fullString, re)).toBe("Don't remove: <\\\"ignore\\\"> ; do remove: <target>");
});
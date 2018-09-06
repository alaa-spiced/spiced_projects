function logType(data) {
    data = this.data;
    var dataType;

    if (isUndefined(data)) {
        dataType = "undefined!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isNull(data)) {
        dataType = "null!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isNaN(data)) {
        dataType = "not a number!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isBoolean(data)) {
        dataType = "boolean!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isString(data)) {
        dataType = "string!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isFunction(data)) {
        dataType = "function!!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isObject(data)) {
        dataType = "object!";
        return console.log(data + "is of a " + dataType + "DataType");
    }

    if (isArray(data)) {
        dataType = "array!";
        return console.log(data + "is of a " + dataType + "DataType");
    } else console.log("I don't know what is that");
}

// Returns if a value is a string
function isString(value) {
    return typeof value === "string" || value instanceof String;
}

// Returns if a value is really a number
function isNumber(value) {
    return typeof value === "number" && isFinite(value);
}

// Returns if a value is an array
function isArray(value) {
    return value && typeof value === "object" && value.constructor === Array;
}

// Returns if a value is a function
function isFunction(value) {
    return typeof value === "function";
}

// Returns if a value is an object
function isObject(value) {
    return value && typeof value === "object" && value.constructor === Object;
}

// Returns if a value is null
function isNull(value) {
    return value === null;
}

// Returns if a value is undefined
function isUndefined(value) {
    return typeof value === "undefined";
}

// Returns if a value is a boolean
function isBoolean(value) {
    return typeof value === "boolean";
}

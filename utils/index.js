const {
	jsonToSchema,
} = require("@walmartlabs/json-to-simple-graphql-schema/lib");

module.exports = {
	getAllIndexes: function (arr, val) {
		var indexes = [],
			i = -1;
		while ((i = arr.indexOf(val, i + 1)) != -1) {
			indexes.push(i);
		}
		return indexes;
	},
	replaceRange: function (s, start, end, substitute) {
		return s.substring(0, start) + substitute + s.substring(end);
	},
	extractArrayType: function (array) {
		const extratedArrays = [];
		const arrayAux = Object.entries(array);
		arrayAux.map((res) => {
			if (res[1] == "array") {
				extratedArrays.push(res[0]);
			}
		});
		return extratedArrays;
	},
	generateSchemaType: (api, auxiliarInformation = {}) => {
		const { url, name } = api;
		const schemaName = name + url.split("/")[url.split("/").length - 2];
		// if (auxiliarInformation.interligation) {
		// 	console.log(auxiliarInformation.interligation);
		// 	api.parametersOut["result"] = auxiliarInformation.interligation;
		// }
		// console.log(api.parametersOut);

		const generatedSchema = jsonToSchema({
			jsonInput: JSON.stringify(api.parametersOut),
			baseType: "Result" + schemaName,
		});
		console.log(generatedSchema.value);
		return generatedSchema.value;
	},
	generateQuery: (api, returnType) => {
		const { url, name, parametersIn } = api;
		const lastUrlPart = url.split("/")[url.split("/").length - 2];
		const query = `${name}${lastUrlPart}(${JSON.stringify(
			module.exports.adapateParametersTypes(parametersIn)
		)}):${returnType}`;
		return query;
	},
	generateResolver: (api, returnType) => {
		const { url, name, parametersIn } = api;
		const lastUrlPart = url.split("/")[url.split("/").length - 2];
		const keysParameters = Object.keys(parametersIn);
		const resolver = `${name}${lastUrlPart}:async (_, {${keysParameters}}, {dataSources})=> {return await dataSources.${name}.${lastUrlPart}(${keysParameters});}`;
		return resolver;
	},

	adapateParametersTypes: (parameters) => {
		const obj = {};

		const keys = Object.keys(parameters);
		const values = Object.values(parameters);

		values.map((value, i) => {
			obj[keys[i]] = module.exports.adapateParametersValues(value);
		});
		return obj;
	},

	adapateParametersValues: (type) => {
		if (type == "int" || type == "Int") {
			return "Int!";
		} else if (type == "float" || type == "Float") {
			return "Float!";
		} else if (type == "string" || type == "String") {
			return "String!";
		} else if (type == "boolean" || type == "Boolean") {
			return "Boolean!";
		} else {
			return null;
		}
	},

	extracSchemaType: function (string) {
		// 5 is type length
		return string.substring(5, string.indexOf("{"));
	},
	removeArrayType: function (array, fieldsTypedArray) {
		const keyArray = Object.entries(array);
		// console.log(keyArray);
		let auxField = fieldsTypedArray;
		let auxkeyArray = keyArray;

		const ra = auxField.map((res) => {
			auxkeyArray.map((resKey) => {
				resKey[0] = resKey[0].replace(res + ".", "");
				return resKey;
			});
			auxkeyArray = auxkeyArray.filter((a) => a[0] != res);
			return auxkeyArray;
		});

		return ra[auxField.length - 1];
	},
};

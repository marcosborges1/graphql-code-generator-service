const SwaggerParser = require("@apidevtools/swagger-parser");
const { unflatten } = require("flat");
const flatten = require("flat");

const {
	jsonToSchema,
} = require("@walmartlabs/json-to-simple-graphql-schema/lib");
const data = {
	posts: [{ id: 1, title: ["Lorem Ipsum"], views: 254 }],
};

const schema = jsonToSchema({ jsonInput: JSON.stringify(data) });
// console.log(schema.value);
// console.log(schema["astNode"]["operationTypes"]["type"]);

const resolvers = {
	Query: {
		generateGraphQLCode: async (_, { similarities }) => {
			return {
				schema: "marcos",
				queries: "vinicius",
				resolvers: "borges",
			};
		},
	},
};

module.exports = resolvers;

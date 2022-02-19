const SwaggerParser = require("@apidevtools/swagger-parser");
const { unflatten } = require("flat");
const flatten = require("flat");

const {
	jsonToSchema,
} = require("@walmartlabs/json-to-simple-graphql-schema/lib");

const resolvers = {
	Query: {
		generateGraphQLCode: async (_, { similarities }) => {
			const schemas = [];
			similarities.map((similarity) => {
				const url = similarity.originAPI.url;
				const urlTarget = similarity.targetAPI.url;
				const name =
					similarity.originAPI.name + url.split("/")[url.split("/").length - 2];
				console.log(name);
				schemaOrigin = jsonToSchema({
					jsonInput: JSON.stringify(similarity.originAPI.parametersOut),
					baseType: "Result" + name,
				});
				const nameTarget =
					similarity.targetAPI.name +
					urlTarget.split("/")[urlTarget.split("/").length - 2];
				schemaTarget = jsonToSchema({
					jsonInput: JSON.stringify(similarity.targetAPI.parametersOut),
					baseType: "Result" + nameTarget,
				});
				schemas.push(schema);
				schemas.push(schemaTarget);
			});
			//Get Resolvers
			return {
				schema: schemas,
				queries: queries,
				resolvers: resolvers,
			};
		},
	},
};

module.exports = resolvers;

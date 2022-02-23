const SwaggerParser = require("@apidevtools/swagger-parser");
const { unflatten } = require("flat");
const flatten = require("flat");
const {
	generateSchemaType,
	extracSchemaType,
	generateQuery,
} = require("../../utils");
const {
	jsonToSchema,
} = require("@walmartlabs/json-to-simple-graphql-schema/lib");

const resolvers = {
	Query: {
		generateGraphQLCode: async (_, { similarities }) => {
			const schemas = [],
				queries = [],
				resolvers = [];

			similarities.map((similarity) => {
				const schemaOrigin = generateSchemaType(similarity.originAPI);
				const schemaTarget = generateSchemaType(similarity.targetAPI);

				const queryOrigin = generateQuery(
					similarity.originAPI,
					extracSchemaType(schemaOrigin)
				);
				const queryTarget = generateQuery(
					similarity.targetAPI,
					extracSchemaType(schemaTarget)
				);

				schemas.push(schemaOrigin);
				schemas.push(schemaTarget);
				queries.push(queryOrigin);
				queries.push(queryTarget);
			});

			//Get Resolvers
			return {
				schema: schemas,
				queries: `type Query { ${queries} }`,
				resolvers: resolvers,
			};
		},
	},
};

module.exports = resolvers;

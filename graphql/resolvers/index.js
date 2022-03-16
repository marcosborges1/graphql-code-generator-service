const SwaggerParser = require("@apidevtools/swagger-parser");
const { unflatten } = require("flat");
const flatten = require("flat");
const {
	generateSchemaType,
	extracSchemaType,
	generateQuery,
	generateResolver,
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
				const schemaOrigin = generateSchemaType(similarity.originAPI, {
					interligation: similarity.targetAPI.name,
				});
				const schemaTarget = generateSchemaType(similarity.targetAPI);

				const queryOrigin = generateQuery(
					similarity.originAPI,
					extracSchemaType(schemaOrigin)
				);
				const queryTarget = generateQuery(
					similarity.targetAPI,
					extracSchemaType(schemaTarget)
				);

				const resolverOrigin = generateResolver(
					similarity.originAPI,
					extracSchemaType(schemaOrigin)
				);
				const resolverTarget = generateResolver(
					similarity.targetAPI,
					extracSchemaType(schemaTarget)
				);

				// const interligationResolver = generateInterligationResolver();

				schemas.push(schemaOrigin);
				schemas.push(schemaTarget);
				queries.push(queryOrigin);
				queries.push(queryTarget);
				resolvers.push(resolverOrigin);
				resolvers.push(resolverTarget);
			});

			//Get Resolvers
			return {
				schema: schemas,
				queries: `type Query { ${queries} }`,
				resolvers: `Query: { ${resolvers} } `,
			};
		},
	},
};

module.exports = resolvers;

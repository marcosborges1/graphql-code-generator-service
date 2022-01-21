const { gql } = require("apollo-server");

const querySchema = gql`
	scalar JSON
	type GraphQLCode {
		schema: JSON
		queries: JSON
		resolvers: JSON
	}
	input TargetSimilarities {
		originAPI: JSON
		targetAPI: JSON
	}

	type Query {
		generateGraphQLCode(similarities: [TargetSimilarities]!): GraphQLCode
	}
`;

module.exports = querySchema;

// input TargetAPI {
// 	url: String
// 	method: String
// 	inputParameters: JSON
// 	outuputParameters: JSON
// }

// Library
// Genereted resolver
const resolvers = {
	//-------
	Query: {
		APIITTechCgetDataQuotes: async (
			_,
			{ buid, quoteNumbers },
			{ dataSources }
		) => {
			return await dataSources.APIITTechC.getDataQuotes(buid, quoteNumbers);
		},
		APIITTechNFgetNFData: async (
			_,
			{ quoteId, customerId },
			{ dataSources }
		) => {
			//Adapated Payload | Id, key, Number ~ same meaning.
			const payload = {
				OrderGroup: {
					OrderForm: {
						FulfillmentUnits: [
							{
								FulfillmentItemInformation: [],
							},
						],
						Items: [],
						ExtendedProperties: [],
					},
					InternalQuoteId: `${quoteId}`,
					QuoteVersionNumber: `1`,
					ExportForm: {
						Contact: {
							BackendCustomerNumber: `${customerId}`,
						},
					},
				},
			};
			return await dataSources.APIITTechNF.getNfData(payload);
		},
	},
	dataQuotes: {
		NFdata: async ({ quoteId, customerId }, __, { dataSources }) => {
			const payload = {
				OrderGroup: {
					OrderForm: {
						FulfillmentUnits: [
							{
								FulfillmentItemInformation: [],
							},
						],
						Items: [],
						ExtendedProperties: [],
					},
					InternalQuoteId: `${quoteId}`,
					QuoteVersionNumber: `1`,
					ExportForm: {
						Contact: {
							BackendCustomerNumber: `${customerId}`,
						},
					},
				},
			};
			return await dataSources.APIITTechNF.getNfData(payload);
		},
	},
	//-------
};

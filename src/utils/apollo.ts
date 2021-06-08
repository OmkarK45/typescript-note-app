import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

export const client = new ApolloClient({
	// Provide required constructor fields
	cache: cache,
	uri: '/api/graphql',
	ssrMode: true,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
})

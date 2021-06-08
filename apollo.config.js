module.exports = {
	client: {
		includes: ['./src/**/*.tsx'],
		service: {
			name: 'apollo-nextjs',
			url: 'http://localhost:3000/api/graphql',
		},
	},
}

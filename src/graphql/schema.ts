import { extendType, makeSchema, objectType, queryType } from 'nexus'
import { join } from 'path'
import * as Note from './Note'

export const schema = makeSchema({
	// Add typegen thing here
	types: [Note],
	outputs: {
		typegen: join(process.cwd(), 'nexus-typegen.ts'),
		schema: join(process.cwd(), 'schema.graphql'),
	},
	contextType: {
		module: join(process.cwd(), './src/graphql/context.ts'),
		export: 'Context',
	},
})

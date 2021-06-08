import { extendType, nonNull, nullable, objectType, stringArg } from 'nexus'
import { prisma } from '../context'

export const Note = objectType({
	name: 'Note',
	definition(t) {
		t.string('id')
		t.string('text')
		t.string('title')
	},
})

export const NoteQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.field('notes', {
			type: 'Note',
			resolve(root, args, ctx) {
				return ctx.prisma.note.findMany()
			},
		})
	},
})

export const CreateNoteMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('create', {
			type: 'Note',
			args: {
				title: nonNull(stringArg()),
				text: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				const newNote = {
					...args,
				}
				return ctx.prisma.note.create({
					data: newNote,
				})
			},
		})
	},
})

export const NoteMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('delete', {
			type: 'Note',
			args: {
				id: nonNull(stringArg()),
			},
			resolve(root, args, ctx) {
				return ctx.prisma.note.delete({
					where: {
						id: args.id,
					},
				})
			},
		})
	},
})

export const UpdateNoteMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('update', {
			type: 'Note',
			args: {
				title: stringArg(),
				text: stringArg(),
				id: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				const updatedNote = { ...args }
				return ctx.prisma.note.upsert({
					where: {
						id: args.id,
					},
					create: {
						text: args.text!,
						title: args.title!,
					},
					update: {
						text: args.text!,
						title: args.title!,
					},
				})
			},
		})
	},
})

import { useQuery, gql, useMutation } from '@apollo/client'
import React from 'react'
import {
	CreateNoteMutation,
	CreateNoteMutationVariables,
	Mutation,
	Query,
} from '../generated/graphql'

const GET_NOTES_QUERY = gql`
	query notes {
		notes {
			id
			text
			title
		}
	}
`

export default function Home(): JSX.Element {
	const { loading, data, error } = useQuery<Query>(GET_NOTES_QUERY)
	if (loading) return <h1>Loading request....</h1>
	if (error) return <h1>Oops something went wrong</h1>
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			{data?.notes.map((note) => {
				return (
					<li key={note?.id}>
						{note?.title} || {note?.text}
					</li>
				)
			})}
			<CreateNote />
		</div>
	)
}

const CREATE_NOTE_MUTATION = gql`
	mutation CreateNote($title: String!, $text: String!) {
		create(title: $title, text: $text) {
			id
			text
			title
		}
	}
`

function CreateNote(): JSX.Element {
	const [create, { data, error, loading }] = useMutation<
		CreateNoteMutation,
		CreateNoteMutationVariables
	>(CREATE_NOTE_MUTATION, {
		variables: {
			text: 'This is latest data',
			title: 'This is result of useMutation hook',
		},
	})
	if (error) return <p>Oops.. something went wrong</p>

	if (loading) return <p>Processing your request</p>

	return (
		<div>
			<button onClick={() => create()}>Create Note</button>
			{JSON.stringify(data)}
		</div>
	)
}

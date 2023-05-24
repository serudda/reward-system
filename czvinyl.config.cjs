const czvinylConfig = {
	headerFormat: '{type}: [{ticket_id}] {emoji} {subject}',
	skipTicketId: false,
	skipBody: true,
	subjectMaxLength: 140,
	subjectMinLength: 3,
	scopes: [],
	allowEmptyTicketIdForBranches: [],
	ticketIdQuestion: 'Enter the issue id preceded by the letter RS and a - (ex. RS-12):',
	commitTypes: [
		{
			description: 'A new feature',
			emoji: '🔥',
			value: 'feat'
		},
		{
			description: 'A bug fix',
			emoji: '🐞',
			value: 'fix'
		},
		{
			description: 'Documentation only changes',
			emoji: '📘',
			value: 'docs'
		},
		{
			description: 'Markup, white-space, formatting, missing semi-colons...',
			emoji: '🎨',
			value: 'style'
		},
		{
			description: 'A code change that neither fixes a bug or adds a feature',
			emoji: '💡',
			value: 'refactor'
		},
		{
			description: 'A code change that improves performance',
			emoji: '⚡',
			value: 'perf'
		},
		{
			description: 'CI related changes',
			emoji: '🚀',
			value: 'ci'
		},
		{
			description: 'Build process or auxiliary tool changes',
			emoji: '🤖',
			value: 'chore'
		},
		{
			description: 'Create a release commit',
			emoji: '🔖',
			value: 'release'
		},
		{
			description: 'Adding missing tests or correcting existing tests',
			emoji: '✅',
			value: 'test'
		},
	]
};

module.exports = czvinylConfig;

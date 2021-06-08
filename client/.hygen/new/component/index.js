module.exports = {
	prompt: ({ inquirer }) => {
		const questions = [
			{
				type: 'input',
				name: 'component_name',
				message: 'What is the component name?',
			},
		];
		return inquirer.prompt(questions).then((answers) => {
			const { component_name } = answers;
			const indexPath = 'src/components';
			const path = `${indexPath}/${component_name}`;
			return { component_name, path, indexPath };
		});
	},
};

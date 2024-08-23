export class InvalidDomainGenerationInputError extends Error {
	constructor(message: string = 'Invalid input data.') {
		super(message);
	}
}

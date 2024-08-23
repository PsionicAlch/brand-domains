import { SplitString } from '$lib/utilities/splitstring';

const validateKeywordAllowedCharacters = (keyword: string): boolean => {
	const allowedCharsRegex = /^[a-zA-Z0-9_!?#,."' ]+$/;

	return allowedCharsRegex.test(keyword);
};

const retrieveInvalidCharacters = (keyword: string): string => {
	return keyword
		.split('')
		.filter((char) => !validateKeywordAllowedCharacters(char))
		.join('');
};

const validateKeywordTwoWordsMax = (keyword: string): boolean => {
	const keywordList = keyword.split(' ');

	return keywordList.length <= 5;
};

const validateExtensionStartsWithFullStop = (domain: string): boolean => {
	return domain[0] === '.';
};

export const validateKeywords = (keywords?: string): string[] => {
	const keywordsErrors: string[] = [];

	if (keywords) {
		const keywordsList = SplitString(keywords);

		for (const keyword of keywordsList) {
			if (!validateKeywordAllowedCharacters(keyword)) {
				const invalidChars = retrieveInvalidCharacters(keyword);
				keywordsErrors.push(`${keyword} can't contain "${invalidChars}"!`);
			}

			if (!validateKeywordTwoWordsMax(keyword)) {
				keywordsErrors.push(`${keyword} can't contain more than 5 words!`);
			}
		}
	}

	return keywordsErrors;
};

export const validateExtensions = (extensions?: string): string[] => {
	const extensionsErrors: string[] = [];

	if (extensions) {
		const extensionsList = SplitString(extensions);

		for (const extension of extensionsList) {
			if (!validateExtensionStartsWithFullStop(extension)) {
				extensionsErrors.push(`${extension} should start with a "."`);
			}
		}
	}

	return extensionsErrors;
};

export const validateDescription = (description?: string): string[] => {
	const descriptionErrors: string[] = [];

	if (description) {
		if (description.length > 1000) {
			descriptionErrors.push('Please keep your description to 1000 characters or less!');
		}

		if (!validateKeywordAllowedCharacters(description)) {
			const invalidChars = retrieveInvalidCharacters(description);
			descriptionErrors.push(`Your description cannot contain ${invalidChars}`);
		}
	}

	return descriptionErrors;
};

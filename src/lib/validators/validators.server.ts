import { validDomainExtension } from '$lib/data/tld.server';
import { SplitString } from '$lib/utilities/splitstring';
import { validateDescription, validateExtensions, validateKeywords } from './validators';

const validateExtensionIsValid = (domain: string): boolean => {
	return validDomainExtension(domain);
};

export const validateKeywordsServer = (keywords?: string): string[] => {
	return validateKeywords(keywords);
};

export const validateExtensionsServer = (extensions?: string): string[] => {
	const extensionsErrors: string[] = [];

	if (extensions) {
		const extensionsErrorsClient = validateExtensions(extensions);
		if (!extensionsErrorsClient.length) {
			const extensionsList = SplitString(extensions);

			for (const extension of extensionsList) {
				if (!validateExtensionIsValid(extension)) {
					extensionsErrors.push(`${extension} is not a valid domain extensions!`);
				}
			}
		}
	} else {
		extensionsErrors.push('You need to specify at least one valid domain extension!');
	}

	return extensionsErrors;
};

export const validateDescriptionServer = (description?: string): string[] => {
	return validateDescription(description);
};

export const validateKeywordsAndExtensionsServer = (
	keywords?: string,
	description?: string
): string[] => {
	return !keywords && !description ? ['You need to add either a keyword or a description!'] : [];
};

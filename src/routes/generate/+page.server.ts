import { fail, type ActionFailure } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { ActionReturn } from './types';

import {
	validateDescriptionServer,
	validateExtensionsServer,
	validateKeywordsAndExtensionsServer,
	validateKeywordsServer
} from '$lib/validators/validators.server';
import { generateDomains } from '$lib/utilities/openai.server';
import { InvalidDomainGenerationInputError } from '$lib/errors/errors';
import { SplitString } from '$lib/utilities/splitstring';

export const actions = {
	default: async ({ request, fetch }): Promise<ActionReturn | ActionFailure<ActionReturn>> => {
		const data = await request.formData();
		const keywords = data.get('keywords')?.toString() || '';
		const extensions = data.get('extensions')?.toString() || '';
		const description = data.get('description')?.toString() || '';

		let keywordsErrors = validateKeywordsServer(keywords);
		const extensionsErrors = validateExtensionsServer(extensions);
		let descriptionErrors = validateDescriptionServer(description);

		keywordsErrors = keywordsErrors.concat(
			validateKeywordsAndExtensionsServer(keywords, description)
		);
		descriptionErrors = descriptionErrors.concat(
			validateKeywordsAndExtensionsServer(keywords, description)
		);

		try {
			if (
				keywordsErrors.length > 0 ||
				extensionsErrors.length > 0 ||
				descriptionErrors.length > 0
			) {
				throw new InvalidDomainGenerationInputError();
			}

			const domainNames = await generateDomains(keywords, description, 25);

			const responses: Promise<Response>[] = [];
			for (const domainName of domainNames) {
				for (const extension of SplitString(extensions)) {
					responses.push(
						fetch('/api/domain/available', {
							method: 'post',
							body: JSON.stringify({ domain: domainName + extension }),
							headers: {
								'Content-Type': 'application/json'
							}
						})
					);
				}
			}

			const settledResponses = await Promise.allSettled(responses);
			const settledDomainNames = await Promise.allSettled(
				settledResponses.map(async (response) => {
					if (response.status === 'fulfilled') {
						return await response.value.json();
					}
				})
			);
			const domains: { domain: string; available: boolean }[] = settledDomainNames.map(
				(domainName) => {
					if (domainName.status === 'fulfilled') {
						return domainName.value;
					}
				}
			);

			domains.toSorted((a, b) => {
				return a.available === b.available ? 0 : a.available ? -1 : 1;
			});

			return {
				keywords: {
					value: data.get('keywords')?.toString() || '',
					errors: []
				},
				extensions: {
					value: data.get('extensions')?.toString() || '',
					errors: []
				},
				description: {
					value: data.get('description')?.toString() || '',
					errors: []
				},
				domains: domains.toSorted((a, b) => {
					return a.available === b.available ? 0 : a.available ? -1 : 1;
				})
			};
		} catch (error) {
			console.log(error);
			let code = 500;
			if (error instanceof InvalidDomainGenerationInputError) {
				code = 422;
			}

			return fail<ActionReturn>(code, {
				keywords: {
					value: data.get('keywords')?.toString() || '',
					errors: keywordsErrors
				},
				extensions: {
					value: data.get('extensions')?.toString() || '',
					errors: extensionsErrors
				},
				description: {
					value: data.get('description')?.toString() || '',
					errors: descriptionErrors
				},
				domains: []
			});
		}
	}
} satisfies Actions;

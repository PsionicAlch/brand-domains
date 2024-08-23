import { OPENAI_API_KEY } from '$env/static/private';
import { OpenAI } from 'openai';

export const generateDomains = async (
	keywords: string,
	description: string,
	number_of_domains: number
): Promise<string[]> => {
	const client = new OpenAI({ apiKey: OPENAI_API_KEY });
	const chatCompletion = await client.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content:
					'You are a branding lead, skilled at creating smart, witty, and uniquely creative brandable domain names without the domain extensions. Your response must be in valid JSON. Input will be JSON with "keywords" (a list for domain name ideas), "description" (a description of what the user\'s company or idea entails), and "number_of_domains" (number of names to generate). Output JSON must have a key "domain_names" that contains an array of strings. Example: { "domain_names": ["name1", "name2"] }.'
			},
			{
				role: 'user',
				content: JSON.stringify({ keywords, description, number_of_domains })
			}
		],
		response_format: { type: 'json_object' }
	});

	const content: { domain_names: string[] } = JSON.parse(
		chatCompletion.choices[0].message.content || '[]'
	);

	if (!content.domain_names.length) {
		throw new Error(
			`Failed to generate proper response: ${chatCompletion.choices[0].message.content}`
		);
	}

	return content.domain_names;
};

export const domainExists = async (raw: string) => {
	const client = new OpenAI({ apiKey: OPENAI_API_KEY });
	const chatCompletion = await client.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content:
					'Does the following suggest that the domain is available? Output correct JSON in the form { available: boolean } where "available" is whether or not the domain is available.'
			},
			{
				role: 'user',
				content: raw
			}
		],
		response_format: { type: 'json_object' }
	});

	const content: { available: boolean } = JSON.parse(
		chatCompletion.choices[0].message.content || '[]'
	);

	return content.available;
};

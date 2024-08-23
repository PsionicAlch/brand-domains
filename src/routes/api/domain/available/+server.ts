import { checkDomainAvailability } from '$lib/utilities/domains.server';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { domain } = await request.json();
	const available = await checkDomainAvailability(domain);

	return json({ domain, available });
}

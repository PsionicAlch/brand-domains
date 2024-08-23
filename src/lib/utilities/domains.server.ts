/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { resolve } from 'dns/promises';
import { domainExists } from './openai.server';

// First check if there are any DNS records (cheap and quick).
const dnsCheck = async (domain: string, timeout: number = 5000): Promise<boolean> => {
	try {
		// Create a timeout promise that rejects after the specified time
		const timeoutPromise = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Timeout')), timeout)
		);

		// Race between the DNS resolution and the timeout
		await Promise.race([resolve(domain), timeoutPromise]);

		// If it reaches this point it found DNS records, so the domain is taken
		return false;
	} catch (error) {
		// If it reaches this point it either couldn't find any records or it errored
		return true;
	}
};

const whoisjsCheck = async (domain: string): Promise<boolean> => {
	try {
		const response = await axios.get<{
			success: boolean;
			raw: string;
		}>(`https://whoisjs.com/api/v1/${domain}`);
		const data = response.data;

		if (!data.success) throw new Error(`whoisjs check failed: ${JSON.stringify(response)}`);

		return await domainExists(data.raw);
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const checkDomainAvailability = async (domain: string): Promise<boolean> => {
	if (!(await dnsCheck(domain))) {
		return false;
	}

	return await whoisjsCheck(domain);
};

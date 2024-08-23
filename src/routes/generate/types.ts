export type InputDataType = {
	value: string;
	errors: string[];
};

export type ActionReturn = {
	keywords: InputDataType;
	extensions: InputDataType;
	description: InputDataType;
	domains: { domain: string; available: boolean }[];
};

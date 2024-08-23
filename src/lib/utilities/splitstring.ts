export function SplitString(str: string): string[] {
	return str
		.split(',')
		.map((word) => word.trim())
		.filter((word) => word);
}

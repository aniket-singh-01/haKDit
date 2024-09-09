export const compareData = (
	apiData: string | null,
	userData: string | null
) => {
	return apiData
		?.toLowerCase()
		.replaceAll(' ', '')
		.replaceAll('-', '')
		.replaceAll('/', '') ===
		userData
			?.toLowerCase()
			.replaceAll(' ', '')
			.replaceAll('-', '')
			.replaceAll('/', '')
		? 'Yes'
		: 'No';
};

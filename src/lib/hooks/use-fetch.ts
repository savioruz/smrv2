const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function useFetch<T>(
	url: string,
	options: RequestInit,
	accessToken?: string
): Promise<T> {
	try {
		const response = await fetch(`${baseUrl}${url}`, {
			...options,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				...options.headers
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (err) {
		console.error('Fetch error:', err);
		throw err instanceof Error ? err : new Error(String(err));
	}
}

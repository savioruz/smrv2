import type { PageServerLoad } from './$types';
import type { GetStudyProgramsResponse } from '$lib/types/study-programs';
import { useFetch } from '$lib/hooks/use-fetch';

export const load: PageServerLoad = async () => {
	try {
		const queryParams = new URLSearchParams({
			limit: '10',
			sort_by: 'id',
			sort_dir: 'asc'
		});

		const response = await useFetch<GetStudyProgramsResponse>(
			`/v1/study-programs?${queryParams.toString()}`,
			{
				method: 'GET'
			}
		);

		return {
			initialStudyPrograms: response?.data?.study_programs || []
		};
	} catch (error) {
		console.error('Error loading initial study programs:', error);
		return {
			initialStudyPrograms: []
		};
	}
};

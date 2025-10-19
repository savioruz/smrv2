export interface Faculty {
	id: number;
	name: string;
	created_at: string;
	created_by: string;
	modified_at: string;
	modified_by: string;
}

export interface GetFacultiesResponse {
	faculties: Faculty[];
	total_data: number;
	total_page: number;
}

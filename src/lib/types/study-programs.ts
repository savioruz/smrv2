export interface StudyProgram {
	id: number;
	name: string;
	faculty_id: number;
	faculty_name: string;
	created_at: string;
	created_by: string;
	modified_at: string;
	modified_by: string;
}

export interface GetStudyProgramsResponseData {
	study_programs: StudyProgram[];
	total_data: number;
	total_page: number;
}

export interface GetStudyProgramsResponse {
	data: GetStudyProgramsResponseData;
}

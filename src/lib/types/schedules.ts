import type { MessageResponse } from './api';

export interface StudentSchedule {
	id: string;
	class_code: string;
	course_code: string;
	course_name: string;
	credits: number;
	day_of_week: string;
	start_time: string;
	end_time: string;
	room_number: string;
	semester: string;
	lecturer_name: string;
	study_program_id: number;
	study_program_name: string;
	created_at: string;
	created_by: string;
	modified_at: string;
	modified_by: string;
}

export interface GetStudentSchedulesResponseData {
	student_schedules: StudentSchedule[];
	total_data: number;
	total_page: number;
}

export interface GetStudentSchedulesResponse {
	data: GetStudentSchedulesResponseData;
}

export interface SyncSchedulesRequest {
	strategy: 'replace_all' | 'upsert';
}

export type SyncSchedulesResponse = MessageResponse;

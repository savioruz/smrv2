export interface Response<T> {
	data?: T;
	total_page?: number;
	total_data?: number;
}

export interface ErrorResponse {
	error: string;
}

export interface MessageResponse {
	message: string;
}

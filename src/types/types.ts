export interface IJobs {
  id: number;
  name: string;
  companyName: string;
  location: string;
  salary: number;
  description: string;
  createdAt: string;
}

export interface IUser {
  id: string;
  profileImage: string;
  email: string;
  appliedJobs: string[];
}

export interface IJobsResponse {
  data: IJobs[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

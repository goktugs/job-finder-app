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

export interface ILoginResponse {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  user: IUser;
}

export interface IJobsResponse {
  data: IJobs[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

export interface IProfile {
  id: string;
  name: string;
  surname: string;
  profileImage: string;
  email: string;
  phone: string;
  address: {
    country: string;
    city: string;
    details: string;
  };
  dateOfBirth: string;
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
  }[];
  languages: {
    language: string;
    level: string;
  }[];
  skills: string[];
  isEmployer: boolean;
  appliedJobs: string[];
}

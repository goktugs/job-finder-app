export interface IJobs {
  id: number;
  name: string;
  companyName: string;
  location: string;
  salary: number;
  description: string;
  createdAT: string;
}

export interface IUser {
  id: string;
  profileImage: string;
  email: string;
  appliedJobs: string[];
}

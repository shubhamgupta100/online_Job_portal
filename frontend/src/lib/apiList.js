export const server = "http://localhost:4444";

// const apiList = {
//   login: `${server}/auth/login`,
//   signup: `${server}/auth/signup`,
//   uploadResume: `${server}/upload/resume`,
//   uploadProfileImage: `${server}/upload/profile`,
//   jobs: `${server}/api/jobs`,
//   applications: `${server}/api/applications`,
//   rating: `${server}/api/rating`,
//   user: `${server}/api/user`,
//   applicants: `${server}/api/applicants`,
//   users: `${server}/api/users`,
//   sendMail: `${server}/api/sendMail`,
//   recruiterinfo: `${server}/api/recruiterinfo`,
// };
const apiList = {
  login: `/auth/login`,
  signup: `/auth/signup`,
  uploadResume: `/upload/resume`,
  uploadProfileImage: `/upload/profile`,
  jobs: `/api/jobs`,
  applications: `/api/applications`,
  rating: `/api/rating`,
  user: `/api/user`,
  applicants: `/api/applicants`,
  users: `/api/users`,
  sendMail: `/api/sendMail/`,
  recruiterinfo: `/api/recruiterinfo/:id`,
};

export default apiList;

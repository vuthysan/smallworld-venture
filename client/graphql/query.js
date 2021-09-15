import { gql } from "@apollo/client";

// === get all jobs ===
const GET_JOBS = gql`
  query {
    get_jobs {
      id
      position
      type
      createdAt
      company {
        name
        city
      }
    }
  }
`;

// === get job detail by job id ===
const GET_JOB = gql`
  query ($id: ID!) {
    get_job(id: $id) {
      id
      position
      company_name
      salary
      type
      requirements
      descriptions
      createdAt
      company {
        name
        about
        user_position
      }
      user {
        name
        phone
        email
      }
      applicants {
        id
        name
        createdAt
        additional
        gender
        email
        phone
        cv
      }
    }
  }
`;

// === get employer by id ===
const GET_USER = gql`
  query ($id: ID!) {
    get_user(id: $id) {
      id
      name
      email
      phone
      gender
    }
  }
`;

// === get employer posted job ===
const GET_USER_POSTED_JOB = gql`
  query ($id: ID!) {
    get_user(id: $id) {
      jobs {
        id
        position
        company {
          name
          city
        }
        createdAt
      }
    }
  }
`;

// === get employer's companies ===
const GET_USER_COMPANIES = gql`
  query ($id: ID!) {
    get_userr(id: $id) {
      id
      companies {
        id
        name
        city
        createdAt
        about
        logo
      }
    }
  }
`;
// === get company by company's id ===
const GET_COMPANY = gql`
  query ($id: ID!) {
    get_company_by_id(id: $id) {
      id
      name
      city
      userId
      user_position
      about
      logo
      website
    }
  }
`;
// === get company by company's name ===
const GET_COMPANY_BY_NAME = gql`
  query ($name: String!) {
    get_company(name: $name) {
      name
      createdAt
      logo
      about
      city
      website
      user_position
      user {
        name
        phone
        email
      }
      jobs {
        id
        position
        createdAt
      }
    }
  }
`;

// === get jobseeker's applications record ===
// const GET_JOBSEEKER_APPLICATIONS = gql`
//   query ($jobseekerId: ID!) {
//     get_jobseeker_applications(jobseekerId: $jobseekerId) {
//       id
//       createdAt
//       job {
//         company {
//           name
//           city
//         }
//         position
//         createdAt
//       }
//     }
//   }
// `;

export { GET_JOBS, GET_JOB, GET_COMPANY_BY_NAME, GET_COMPANY };

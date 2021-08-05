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
        employer_position
      }
      employer {
        name
        phone
        email
      }
    }
  }
`;

// === get employer by id ===
const GET_EMPLOYER = gql`
  query ($id: ID!) {
    get_employer(id: $id) {
      id
      name
      email
      phone
      gender
    }
  }
`;
// === get employer posted job ===
const GET_EMPLOYER_POSTED_JOB = gql`
  query ($id: ID!) {
    get_employer(id: $id) {
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
const GET_EMPLOYER_COMPANIES = gql`
  query ($id: ID!) {
    get_employer(id: $id) {
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
      employer_position
      employerId
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
      employer_position
      employer {
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

// === get jobseekr by id ===
const GET_JOBSEEKER = gql`
  query ($id: ID!) {
    get_jobseeker(id: $id) {
      id
      name
      email
      gender
      phone
      cv
      interest
    }
  }
`;
// === get jobseeker's applications record ===
const GET_JOBSEEKER_APPLICATIONS = gql`
  query ($jobseekerId: ID!) {
    get_jobseeker_applications(jobseekerId: $jobseekerId) {
      id
      createdAt
      job {
        company {
          name
          city
        }
        position
        createdAt
      }
    }
  }
`;

// ===== get job's applicants ====
const GET_JOB_APPLICANTS = gql`
  query ($jobId: ID!) {
    get_job_applicants(jobId: $jobId) {
      id
      createdAt
      name
      email
      gender
      phone
      cv
      additional
      job {
        position
        company_name
      }
    }
  }
`;
export {
  GET_JOBS,
  GET_EMPLOYER,
  GET_JOBSEEKER,
  GET_JOBSEEKER_APPLICATIONS,
  GET_EMPLOYER_POSTED_JOB,
  GET_EMPLOYER_COMPANIES,
  GET_COMPANY_BY_NAME,
  GET_COMPANY,
  GET_JOB,
  GET_JOB_APPLICANTS,
};

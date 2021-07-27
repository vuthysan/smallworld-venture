import { gql } from "@apollo/client";

// ========== job part =========

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

// === get employer by id ===
const GET_EMPLOYER = gql`
  query ($id: ID!) {
    get_employer(id: $id) {
      id
      name
      email
      phone
      password
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
      }
    }
  }
`;

// ========== jobseeker part ==========

// === get jobseekr by id ===
const GET_JOBSEEKER = gql`
  query ($id: ID!) {
    get_jobseeker(id: $id) {
      id
      name
      email
      gender
    }
  }
`;
// === get jobseeker's applications ===
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

// ========== company part ==========
const GET_COMPANY = gql`
  query ($name: String!) {
    get_company(name: $name) {
      id
      name
      description
      logo
      opportunities {
        id
        position
        status
        companyName
        department {
          name
        }
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
};

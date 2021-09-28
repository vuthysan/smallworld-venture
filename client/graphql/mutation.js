import { gql } from "@apollo/client";

// === register user ===
const REGISTER_USER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    register_user(name: $name, email: $email, password: $password) {
      message
    }
  }
`;
// === login ===
const USER_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
    }
  }
`;

// === edit user info ===
const EDIT_USER = gql`
  mutation (
    $name: String!
    $email: String!
    $phone: String!
    $gender: String!
    $interest: [String]
    $cv: String
  ) {
    edit_user(
      name: $name
      email: $email
      gender: $gender
      phone: $phone
      interest: $interest
      cv: $cv
    ) {
      message
    }
  }
`;
// === add new company ===
const ADD_COMPANY = gql`
  mutation (
    $name: String!
    $city: String!
    $user_position: String!
    $about: String!
    $logo: String!
    $website: String!
  ) {
    add_company(
      name: $name
      city: $city
      user_position: $user_position
      about: $about
      logo: $logo
      website: $website
    ) {
      message
    }
  }
`;
// === Employer edit company ===
const EDIT_COMPANY = gql`
  mutation (
    $id: ID!
    $name: String!
    $city: String!
    $user_position: String!
    $about: String!
    $logo: String!
    $website: String!
  ) {
    edit_company(
      id: $id
      name: $name
      city: $city
      user_position: $user_position
      about: $about
      logo: $logo
      website: $website
    ) {
      message
    }
  }
`;
// === delete company and jobs in company ===
const DELETE_COMPANY = gql`
  mutation ($id: ID!, $name: String!) {
    delete_company(id: $id, name: $name) {
      message
    }
  }
`;

// === search job ===
const SEARCH = gql`
  mutation ($search: String!) {
    search(search: $search) {
      position
      id
      createdAt
      company {
        name
        city
      }
    }
  }
`;
//  === add job ===
const ADD_JOB = gql`
  mutation (
    $position: String!
    $salary: String!
    $company_name: String!
    $type: [String]!
    $requirements: [String]!
    $descriptions: [String]!
  ) {
    add_job(
      position: $position
      salary: $salary
      company_name: $company_name
      type: $type
      requirements: $requirements
      descriptions: $descriptions
    ) {
      message
    }
  }
`;
// === edit job ====
const EDIT_JOB = gql`
  mutation (
    $id: ID!
    $position: String!
    $salary: String!
    $company_name: String!
    $type: [String]!
    $requirements: [String]!
    $descriptions: [String]!
  ) {
    edit_job(
      id: $id
      position: $position
      salary: $salary
      company_name: $company_name
      type: $type
      requirements: $requirements
      descriptions: $descriptions
    ) {
      message
    }
  }
`;
// === delete job ===
const DELETE_JOB = gql`
  mutation ($id: ID!) {
    delete_job(id: $id) {
      message
    }
  }
`;
// === smallworld message ===
const POST_MESSAGE = gql`
  mutation ($fullname: String!, $email: String!, $message: String!) {
    post_message(fullname: $fullname, email: $email, message: $message) {
      respond
    }
  }
`;
// === application ===
const POST_APPLICATION = gql`
  mutation (
    $jobId: ID!
    $additional: String!
    $userId: ID!
    $name: String!
    $email: String!
    $gender: String!
    $phone: String!
  ) {
    post_application(
      jobId: $jobId
      additional: $additional
      userId: $userId
      name: $name
      email: $email
      gender: $gender
      phone: $phone
    ) {
      message
    }
  }
`;

// === delete application ===
const DELETE_APPLICATION = gql`
  mutation ($id: ID!) {
    delete_application(id: $id) {
      message
    }
  }
`;

export {
  REGISTER_USER,
  USER_LOGIN,
  EDIT_USER,
  ADD_COMPANY,
  EDIT_COMPANY,
  DELETE_COMPANY,
  ADD_JOB,
  EDIT_JOB,
  DELETE_JOB,
  SEARCH,
  POST_MESSAGE,
  POST_APPLICATION,
  DELETE_APPLICATION,
};

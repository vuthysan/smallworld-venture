import { gql } from "@apollo/client";

// === employer login ===
const EMPLOYER_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login_employer(email: $email, password: $password) {
      message
    }
  }
`;
// === employer login ===
const JOBSEEKER_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login_jobseeker(email: $email, password: $password) {
      message
    }
  }
`;
// === Empoyer add new company ===
const ADD_COMPANY = gql`
  mutation (
    $name: String!
    $city: String!
    $employer_position: String!
    $about: String!
    $logo: String!
    $employerId: ID!
    $website: String!
  ) {
    add_company(
      name: $name
      city: $city
      employer_position: $employer_position
      about: $about
      logo: $logo
      employerId: $employerId
      website: $website
    ) {
      message
    }
  }
`;
// === message ===
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
    $name: String!
    $email: String!
    $additional: String
    $phone: String!
    $cv: String!
    $company: String!
    $department: String!
    $position: String!
  ) {
    post_application(
      name: $name
      email: $email
      additional: $additional
      phone: $phone
      cv: $cv
      company: $company
      department: $department
      position: $position
    ) {
      message
    }
  }
`;
export {
  EMPLOYER_LOGIN,
  JOBSEEKER_LOGIN,
  POST_MESSAGE,
  POST_APPLICATION,
  ADD_COMPANY,
};

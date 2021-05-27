import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
    }
  }
`;

// ====== company part ======

const ADD_COMPANY = gql`
  mutation ($name: String!, $description: String!, $logo: String!) {
    add_company(name: $name, description: $description, logo: $logo) {
      message
      existed
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation ($id: ID!) {
    delete_company(id: $id) {
      message
    }
  }
`;

const EDIT_COMPANY = gql`
  mutation ($id: ID!, $name: String!, $description: String!, $logo: String!) {
    edit_company(id: $id, name: $name, description: $description, logo: $logo) {
      message
    }
  }
`;

// ====== department part ======
const ADD_DEPARTMENT = gql`
  mutation ($name: String!, $icon: String!) {
    add_department(name: $name, icon: $icon) {
      message
    }
  }
`;

const DELETE_DEPARTMENT = gql`
  mutation ($id: ID!) {
    delete_department(id: $id) {
      message
    }
  }
`;

const EDIT_DEPARTMENT = gql`
  mutation ($id: ID!, $name: String!, $icon: String!) {
    edit_department(id: $id, name: $name, icon: $icon) {
      message
    }
  }
`;

// ==== Opportunity part ====

const ADD_OPPORTUNITY = gql`
  mutation (
    $position: String!
    $status: Boolean!
    $companyName: String!
    $departmentId: ID!
    $requirements: [String]!
    $responsibilities: [String]!
    $conditions: [String]!
  ) {
    add_opportunity(
      position: $position
      status: $status
      companyName: $companyName
      departmentId: $departmentId
      requirements: $requirements
      conditions: $conditions
      responsibilities: $responsibilities
    ) {
      message
    }
  }
`;

const EDIT_OPPORTUNITY = gql`
  mutation (
    $id: ID!
    $position: String!
    $status: Boolean!
    $companyName: String!
    $departmentId: ID!
    $requirements: [String]!
    $responsibilities: [String]!
    $conditions: [String]!
  ) {
    edit_opportunity(
      id: $id
      position: $position
      status: $status
      companyName: $companyName
      departmentId: $departmentId
      requirements: $requirements
      conditions: $conditions
      responsibilities: $responsibilities
    ) {
      message
    }
  }
`;

const DELETE_OPPORTUNITY = gql`
  mutation ($id: ID!) {
    delete_opportunity(id: $id) {
      message
    }
  }
`;

// ======= Message part =======
const DELETE_MESSAGE = gql`
  mutation ($id: ID!) {
    delete_message(id: $id) {
      respond
    }
  }
`;
export {
  LOGIN,
  ADD_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  EDIT_DEPARTMENT,
  ADD_OPPORTUNITY,
  EDIT_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  DELETE_MESSAGE,
};

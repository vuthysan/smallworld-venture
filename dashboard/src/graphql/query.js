import { gql } from "@apollo/client";

// ==== company part ====
const GET_COMPANIES = gql`
  query {
    get_companies {
      id
      name
      logo
      description
      createdAt
    }
  }
`;
const GET_COMPANY = gql`
  query ($id: ID!) {
    get_company(id: $id) {
      id
      name
      logo
      description
    }
  }
`;
// ==== department part ===
const GET_DEPARTMENTS = gql`
  query {
    get_departments {
      id
      name
      icon
      createdAt
    }
  }
`;
const GET_DEPARTMENT = gql`
  query ($id: ID!) {
    get_department(id: $id) {
      id
      name
      icon
    }
  }
`;

// ===== opportuity part =====
const GET_OPPORTUNITIES = gql`
  query {
    get_opportunities {
      id
      position
      status
      responsibilities
      conditions
      requirements
      companyName
      department {
        name
        id
      }
    }
  }
`;
const GET_OPPORTUNITY = gql`
  query ($id: ID!) {
    get_opportunity(id: $id) {
      id
      position
      status
      responsibilities
      conditions
      requirements
      companyName
      departmentId
    }
  }
`;

// ====== message part ======

const GET_MESSAGES = gql`
  query {
    get_messages {
      id
      fullname
      email
      message
      createdAt
    }
  }
`;

const GET_MESSAGE = gql`
  query ($id: ID!) {
    get_message(id: $id) {
      fullname
      id
      email
      message
    }
  }
`;

export {
  GET_COMPANIES,
  GET_COMPANY,
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  GET_OPPORTUNITIES,
  GET_OPPORTUNITY,
  GET_MESSAGES,
  GET_MESSAGE,
};

import { gql } from "@apollo/client";

// === company part ===
const GET_COMPANIES = gql`
  query {
    get_companies {
      id
      logo
      name
    }
  }
`;

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
// === department ===
const GET_DEPARTMENTS = gql`
  query {
    get_departments {
      id
      icon
      name
    }
  }
`;
const GET_DEPARTMENT = gql`
  query ($id: ID!) {
    get_department(id: $id) {
      id
      name
      opportunities {
        id
        position
        status
        companyName
      }
    }
  }
`;

// === opportunity ===
const GET_OPPORTUNITY = gql`
  query ($id: ID!) {
    get_opportunity(id: $id) {
      id
      position
      requirements
      conditions
      responsibilities
      companyName
      department {
        name
        id
      }
    }
  }
`;

export {
  GET_COMPANIES,
  GET_COMPANY,
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  GET_OPPORTUNITY,
};

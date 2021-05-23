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

export { GET_COMPANIES, GET_COMPANY, GET_DEPARTMENTS };

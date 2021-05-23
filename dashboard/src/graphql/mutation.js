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

export {
  LOGIN,
  ADD_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  EDIT_DEPARTMENT,
};

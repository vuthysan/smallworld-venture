import { BrowserRouter as Router, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

// === components ===
import Dashboard from "./components/Pages/dashbord";
import Login from "./components/Pages/login";

// === pages ====
import Companies from "./components/Pages/companies/companies";
import AddCompany from "./components/Pages/companies/addCompany";
import EditCompany from "./components/Pages/companies/editCompany";
import Departments from "./components/Pages/departments/departments";
import AddDepartment from "./components/Pages/departments/addDepartment";
import EditDepartment from "./components/Pages/departments/editDepartment";
import Opportunities from "./components/Pages/opportunities/opportunities";
import AddOpportunity from "./components/Pages/opportunities/addOpportunity";
import EditOpportunity from "./components/Pages/opportunities/editOpportunity";
import Messages from "./components/Pages/messages";
import Applications from "./components/Pages/applications";

// === routers ===
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" restricted={true} exact component={Login} />
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/admin/companies" exact component={Companies} />
        <PrivateRoute path="/admin/add-company" exact component={AddCompany} />
        <PrivateRoute
          path="/admin/edit-company/:id"
          exact
          component={EditCompany}
        />
        <PrivateRoute path="/admin/departments" exact component={Departments} />
        <PrivateRoute
          path="/admin/add-department"
          exact
          component={AddDepartment}
        />
        <PrivateRoute
          path="/admin/edit-department/:id"
          exact
          component={EditDepartment}
        />
        <PrivateRoute
          path="/admin/opportunities"
          exact
          component={Opportunities}
        />
        <PrivateRoute
          path="/admin/add-opportunity"
          exact
          component={AddOpportunity}
        />
        <PrivateRoute
          path="/admin/edit-opportunity/:id"
          exact
          component={EditOpportunity}
        />
        <PrivateRoute path="/admin/messages" exact component={Messages} />
        <PrivateRoute
          path="/admin/applications"
          exact
          component={Applications}
        />
      </Switch>
    </Router>
  );
}

export default App;

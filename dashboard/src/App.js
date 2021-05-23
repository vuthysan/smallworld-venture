import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Layout } from "antd";

// === components ===
import Dashboard from "./components/Pages/dashbord";
import Login from "./components/Pages/login";
import LeftNav from "./components/Layout/LeftNav";
import TopNavbar from "./components/Layout/TopNavbar";
import Footer from "./components/Layout/Footer";

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

// === routers ===
// import PrivateRoute from "./routers/PrivateRoute";
// import PublicRoute from "./routers/PublicRoute";
const { Content } = Layout;
function App() {
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          {window.location.pathname === "/login" ? (
            <Route path="/login" exact component={Login} />
          ) : (
            <>
              <LeftNav />
              <Layout>
                <TopNavbar />
                <Content className="content">
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route
                      path="/admin/companies"
                      exact
                      component={Companies}
                    />
                    <Route
                      path="/admin/add-company"
                      exact
                      component={AddCompany}
                    />
                    <Route
                      path="/admin/edit-company/:id"
                      exact
                      component={EditCompany}
                    />
                    <Route
                      path="/admin/departments"
                      exact
                      component={Departments}
                    />
                    <Route
                      path="/admin/add-department"
                      exact
                      component={AddDepartment}
                    />
                    <Route
                      path="/admin/edit-department/:id"
                      exact
                      component={EditDepartment}
                    />
                    <Route
                      path="/admin/opportunities"
                      exact
                      component={Opportunities}
                    />
                    <Route
                      path="/admin/add-opportunity"
                      exact
                      component={AddOpportunity}
                    />
                    <Route
                      path="/admin/edit-opportunity/:id"
                      exact
                      component={EditOpportunity}
                    />
                  </Switch>
                </Content>
                <Footer />
              </Layout>
            </>
          )}
        </Router>
      </Layout>
    </div>
  );
}

export default App;

/* <PrivateRoute path="/" exact component={Dashboard} /> */
/* <PublicRoute
                path="/login"
                restricted={true}
                exact
                component={Login}
              /> */

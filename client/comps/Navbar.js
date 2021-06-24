import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { Row, Col, Drawer, Menu, Dropdown } from "antd";

function Navbar() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  var user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleLogout = () => {
    localStorage.clear();
  };
  // === employer menu ===
  const EmMenu = (
    <Menu className="user-menu">
      <p>Sea Viseth</p>
      <p className="email">seaviseth@gmail.com</p>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/job.svg" alt="setting svg" />
          Posted Job
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/company.svg" alt="setting svg" />
          Companies
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/add.svg" alt="setting svg" />
          Add Company
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/addjob.svg" alt="setting svg" />
          Add job
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          onClick={handleLogout}
          rel="noopener noreferrer"
          href="/open-opportunities"
        >
          <img src="/images/navbar/logout.svg" alt="setting svg" />
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );
  // job seeker menu ===
  const SeMenu = (
    <Menu className="user-menu">
      <p>Sea Viseth</p>
      <p className="email">seaviseth@gmail.com</p>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/application.svg" alt="setting svg" />
          Application Record
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          onClick={handleLogout}
          rel="noopener noreferrer"
          href="/open-opportunities"
        >
          <img src="/images/navbar/logout.svg" alt="setting svg" />
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="nav">
      <div className="container">
        <Row align="middle" justify="space-between" className="logo">
          <Col className="nav-logo">
            <Link href="/">
              <img
                width="130px"
                height="75.84px"
                src="/images/home/sw-white.png"
                alt="Smallworld Venture Logo"
              />
            </Link>
          </Col>
          <Col className="nav-menu">
            <Row className="nav-list" gutter={60}>
              <Col>
                <Link href="/about">
                  <a
                    className={router.pathname == "/about" ? "nav-active" : ""}
                  >
                    About
                  </a>
                </Link>
              </Col>
              <Col>
                <Link href="/works">
                  <a
                    className={router.pathname == "/works" ? "nav-active" : ""}
                  >
                    Works
                  </a>
                </Link>
              </Col>
              <Col>
                <Link href="/news">
                  <a className={router.pathname == "/news" ? "nav-active" : ""}>
                    News
                  </a>
                </Link>
              </Col>
              <Col>
                <Link href="/spaces">
                  <a
                    className={router.pathname == "/spaces" ? "nav-active" : ""}
                  >
                    Spaces
                  </a>
                </Link>
              </Col>
              <Col>
                <Link href="/contact">
                  <a
                    className={
                      router.pathname == "/contact" ? "nav-active" : ""
                    }
                  >
                    Contact
                  </a>
                </Link>
              </Col>
              <Col>
                <Link href="/open-opportunities">
                  <a
                    className={
                      router.pathname == "/open-opportunities"
                        ? "nav-active"
                        : ""
                    }
                  >
                    Oppen-Opportunities
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>
          {user ? (
            user.role === "employer" ? (
              <Dropdown overlay={EmMenu} placement="bottomRight" arrow>
                <img
                  id="user-menu"
                  src="/images/navbar/avatar.svg"
                  alt="avatar menu svg"
                />
              </Dropdown>
            ) : (
              <Dropdown overlay={SeMenu} placement="bottomRight" arrow>
                <img
                  id="user-menu"
                  src="/images/navbar/avatar.svg"
                  alt="avatar menu svg"
                />
              </Dropdown>
            )
          ) : (
            ""
          )}

          <FiMenu className="open-menu-btn" onClick={showDrawer} />
          <Drawer
            closable={false}
            placement="left"
            onClose={onClose}
            visible={visible}
          >
            <div className="nav logo">
              <img
                width="130px"
                height="75.84px"
                src="/images/home/sw-white.png"
                alt="Smallworld Venture Logo"
              />
            </div>
            <Menu className="side-nav">
              <Menu.Item onClick={onClose}>
                <Link className="sample" href="/">
                  Home
                </Link>
              </Menu.Item>

              <Menu.Item onClick={onClose}>
                <Link href="/about" exact>
                  About
                </Link>
              </Menu.Item>
              <Menu.Item onClick={onClose}>
                <Link href="/works">Works</Link>
              </Menu.Item>
              <Menu.Item onClick={onClose}>
                <Link href="/news">News</Link>
              </Menu.Item>
              <Menu.Item onClick={onClose}>
                <Link href="/spaces">Spaces</Link>
              </Menu.Item>
              <Menu.Item onClick={onClose}>
                <Link href="/contact">Contact</Link>
              </Menu.Item>
              <Menu.Item onClick={onClose}>
                <Link href="/open-opportunities">Open-Opportunities</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </Row>
      </div>
    </div>
  );
}

export default Navbar;

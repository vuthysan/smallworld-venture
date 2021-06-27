import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { Row, Col, Drawer, Menu, Dropdown } from "antd";
// === comps ===
import UserNavMenu from "./UserNavMenu";

function Navbar() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
          {/* === user menu bar === */}
          <UserNavMenu />

          {/* === responsive navbar === */}
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

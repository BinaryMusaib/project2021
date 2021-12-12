import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubjectIcon from "@mui/icons-material/Subject";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TopicIcon from "@mui/icons-material/Topic";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import NavBtn from "./NavBtn";
import { Link, useHistory } from "react-router-dom";
import logo from "../logo.png";
import IfAuthenticated from "./IfAuthenticated";
import IfNotAuthenticated from "./IfNotAuthenticated";
import AuthService from "../services/auth.service";
import PagesIcon from "@mui/icons-material/Pages";
import GroupIcon from "@mui/icons-material/Group";
import QuizIcon from "@mui/icons-material/Quiz";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const history = useHistory();

  return (
    <AppBar position="fixed" style={{ background: "#FFFFFF" }}>
      <Toolbar>
        <div className="trylogo">
          <Link to="/">
            <img src={logo} alt="mainLogo" />
          </Link>
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {" "}
        </Typography>
        <div className="padd">
          <IfAuthenticated>
            <NavBtn url="/exams" startIcon={<QuizIcon />} text="Assigned Tests" />
            <NavBtn url="/tests" startIcon={<QuizIcon />} text="Create Tests" />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography>
                  <NavBtn
                    url="/subjects"
                    startIcon={<SubjectIcon />}
                    text="Subjects"
                  />
                  <br />
                  <NavBtn
                    url="/topics"
                    text="Topics"
                    startIcon={<TopicIcon />}
                  />
                  <br />
                  <NavBtn
                    url="/question-papers"
                    text="Papers"
                    startIcon={<PagesIcon />}
                  />
                  <br />
                  <NavBtn
                    url="/examinee-lists"
                    text="Examinees"
                    startIcon={<GroupIcon />}
                  />
                  <br />
                  <Button
                    size="large"
                    color="primary"
                    variant="text"
                    onClick={() => {
                      AuthService.logout();
                      history.push("/");
                    }}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </Typography>
              </MenuItem>
            </Menu>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography>
                  <NavBtn
                    url="/signup"
                    text="Register"
                    startIcon={<HowToRegIcon />}
                  />
                  <br />
                  <br />

                  <NavBtn
                    url="/login"
                    text="Login"
                    startIcon={<LockOpenIcon />}
                  />
                </Typography>
              </MenuItem>
            </Menu>
          </IfNotAuthenticated>
        </div>
      </Toolbar>
    </AppBar>
  );
};

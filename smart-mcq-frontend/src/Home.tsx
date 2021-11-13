import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AssessmentIcon from "@mui/icons-material/Assessment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import designImage from "./designImage.png";
import logo from "./logo.png";
import { Link } from "react-router-dom";


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <div className="trylogo">
          <Link to="/">
             <img src={logo} alt="mainLogo"  />
          </Link>
          </div>
          <div className="padd">
          <Button
            size="large"
            color="inherit"
            variant="text"
            href="/questions/subjects"
            startIcon={<AssessmentIcon />}
          >
            Subjects
          </Button>
          <Button
            size="large"
            color="inherit"
            variant="text"
            href="#"
            startIcon={<AnnouncementIcon />}
          >
            About Us
          </Button>
          <Button
            size="large"
            color="inherit"
            variant="text"
            href="./signup"
            startIcon={<HowToRegIcon />}
          >
            Register
          </Button>
          <Button
            size="large"
            color="inherit"
            variant="text"
            href="./login"
            startIcon={<LockOpenIcon />}
          >
            Login
          </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="faq">
        <p>FAQs </p>
       </div>
       <hr />
       <div className = "cardParent">
       <Card className="card1" elevation={0}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            <h4><b>What is an aptitude test?</b></h4>
          </Typography>
          <br />
          <Typography variant="body2">
            An aptitude test is an assessment used to determine a candidate’s
            cognitive ability or personality. They’re extremely common in job
            assessments as they can be used to predict the likelihood of a
            candidate’s success in a job role, whilst eliminating any bias
            through its standardised administration. You are likely to encounter
            them in selection for all job sectors; however, they will be
            specialised to cater for the specific job requirements of the role.
          </Typography>
        </CardContent>
      </Card>
      <Card className="card1" elevation={0}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            <h4><b>What are the different types of aptitude test?</b></h4>
          </Typography>
          <br />
          <Typography variant="body2">
            Aptitude tests come in many different forms due to the range of
            skills required for different roles. Generally, they fall into two
            categories: verbal and non-verbal. Common non-verbal tests such as
            numerical reasoning or inductive reasoning, assess your ability to
            handle numerical data, patterns and problem-solving. Verbal tests
            such as verbal reasoning, comprehension and situational judgement
            tests are focused on your ability to analyse verbal data and make
            astute decisions.
          </Typography>
        </CardContent>
      </Card>
      <Card className="card1" elevation={0}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary"gutterBottom>
          <h4><b>How do I prepare for an aptitude test?</b></h4>
          </Typography>
          <br />
          <Typography variant="body2">
          The best way to prepare for a test and maximise your chances of
              success is to practise. Practise will help you identify patterns,
              recognise question styles, and ultimately give you confidence in
              your test taking abilities. We have practice material for all
              aptitude tests and have helped millions of job candidates over the
              world improve their score. Browse our test material and advice and
              join the tens of thousands each year that we’ve helped take that
              first step into their dream career.
          </Typography>
        </CardContent>
      </Card>
      </div>
      <div className = "designImage">
        <img src={designImage} alt="DesignBg" />
        </div>
    </Box>
  );
}
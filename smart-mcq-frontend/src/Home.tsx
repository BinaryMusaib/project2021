import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import designImage from "./designImage.png";
import HomeSlat from "./HomeSlat.jpg";
import Layout from "./components/Layout";

export default function ButtonAppBar() {
    return (
        <Layout>
            <img src={HomeSlat} alt="Home Slat" className="HomeSlat" />
            <div className="designImage">
                <img src={designImage} alt="DesignBg" />
            </div>
            <div className="faq">
                <p>FAQs </p>
            </div>
            <hr />
            <div className="cardParent">
                <Card className="card1" elevation={0}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.primary"
                            gutterBottom
                        >
                            <h4>
                                <b>What is an aptitude test?</b>
                            </h4>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                            An aptitude test is an assessment used to determine
                            a candidate’s cognitive ability or personality.
                            They’re extremely common in job assessments as they
                            can be used to predict the likelihood of a
                            candidate’s success in a job role, whilst
                            eliminating any bias through its standardised
                            administration. You are likely to encounter them in
                            selection for all job sectors; however, they will be
                            specialised to cater for the specific job
                            requirements of the role.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card1" elevation={0}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.primary"
                            gutterBottom
                        >
                            <h4>
                                <b>
                                    What are the different types of aptitude
                                    test?
                                </b>
                            </h4>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                            Aptitude tests come in many different forms due to
                            the range of skills required for different roles.
                            Generally, they fall into two categories: verbal and
                            non-verbal. Common non-verbal tests such as
                            numerical reasoning or inductive reasoning, assess
                            your ability to handle numerical data, patterns and
                            problem-solving. Verbal tests such as verbal
                            reasoning, comprehension and situational judgement
                            tests are focused on your ability to analyse verbal
                            data and make astute decisions.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card1" elevation={0}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.primary"
                            gutterBottom
                        >
                            <h4>
                                <b>How do I prepare for an aptitude test?</b>
                            </h4>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                            The best way to prepare for a test and maximise your
                            chances of success is to practise. Practise will
                            help you identify patterns, recognise question
                            styles, and ultimately give you confidence in your
                            test taking abilities. We have practice material for
                            all aptitude tests and have helped millions of job
                            candidates over the world improve their score.
                            Browse our test material and advice and join the
                            tens of thousands each year that we’ve helped take
                            that first step into their dream career.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <br />
        </Layout>
    );
}

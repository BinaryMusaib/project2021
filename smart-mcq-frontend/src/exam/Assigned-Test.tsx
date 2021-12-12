import Layout from "../components/Layout";
import { Paper, Button} from "@mui/material";
import { useHistory } from "react-router-dom";


export default function AssignedTest() {

    const history = useHistory();
    
    return (
        <Layout title="Assigned Test">
            <Paper className="entity-list paper paper-list">
                <Button
                    size="large"
                    color="primary"
                    variant="text"
                    onClick={() => {
                      history.push("/exam/new");
                    }}
                 >
                    Take Test
                </Button>
            </Paper>
        </Layout>
    )
}
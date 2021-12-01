import Layout from "../components/Layout";
import { Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

export default function QuestionPaper() {
        
    const history = useHistory();

    return (
        <Layout title="Question Paper">
            <Paper className="entity-list paper paper-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() =>
                        history.push(`/question-paper/new`)
                    }
                >
                    <AddIcon />
                </Fab>
            </Paper>
        </Layout>
    );
}
import TopicService from "../../services/topic.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../../Form";
import { CreateTopicDto } from "../../dto/question";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import { FetchContext } from "../../context";
import { FormError } from "../../Form/types";
import Paper from "@mui/material/Paper";

export default function AddModify() {
    const [topic, setTopic] = React.useState<CreateTopicDto>(
        initTopic(),
    );
    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                TopicService.getById(Number.parseInt(id)).then((res) =>
                    setTopic(res.body as CreateTopicDto),
                ),
            );
        }
    }, [id, whileLoading]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            TopicService.save(id, topic)
                .then(() => history.push("/questions/topics"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setTopic((topic) => ({ ...topic, [key]: value }));

    return (
        <Layout title="Add/Modify Topic">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={topic}
                        fields={formFields}
                        onChange={handleChange}
                        errors={errors}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

const formFields = [
    { name: "subject", label: "Subject", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
];

const initTopic = () => ({
    subject: "",
    title: "",
    description: "",
});

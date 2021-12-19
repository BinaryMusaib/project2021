import Layout from "./Layout";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingPage.css";

type LoadingPageProps = {
    title?: string;
};

export default function LoadingPage({ title = "Loading..." }: LoadingPageProps) {
    return (
        <Layout title={title}>
            <div className="loading-page-centralize">
                <CircularProgress />
            </div>
        </Layout>
    );
}

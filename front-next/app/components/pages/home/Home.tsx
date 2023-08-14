import Layout from "@/components/layout/Layout";
import { FC } from "react";
import Discover from "./discover/Discover";
import Catalog from "./catalog/Catalog";

const Home: FC = () => {
    return (
        <Layout title="ВидеоХостинг">
            <Discover />

            <Catalog />
        </Layout>
    )
}

export default Home;
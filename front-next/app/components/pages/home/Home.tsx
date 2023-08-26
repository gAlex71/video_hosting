import Layout from "@/components/layout/Layout";
import { FC } from "react";
import Discover from "./discover/Discover";
import Catalog from "./catalog/Catalog";
import { IHome } from "./Home.interface";

const Home: FC<IHome> = ({newVideos, topVideo, randomVideo}) => {
    return (
        <Layout title="ВидеоХостинг">
            <Discover topVideo={topVideo} randomVideo={randomVideo}/>

            <Catalog newVideos={newVideos}/>
        </Layout>
    )
}

export default Home;
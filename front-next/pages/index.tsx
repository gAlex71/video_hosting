import Home from "@/components/pages/home/Home";
import { IHome } from "@/components/pages/home/Home.interface";
import { NextPageAuth } from "@/providers/private-route.interface";
import { VideoService } from "@/services/video.service";
import { IVideo } from "@/types/video.interface";
import { GetStaticProps } from "next";
import shuffle from 'lodash/shuffle';

const HomePage: NextPageAuth<IHome> = (props) => {
    return (
        <Home {...props}/>
    )
};
//Вынести
export const getStaticProps: GetStaticProps = async () => {
    try {
        const {data: newVideos} = await VideoService.getAll();
        const {data: topVideos} = await VideoService.getMostPopular();

        return {
            props: {
                newVideos,
                topVideo: topVideos[0]  || [],
                randomVideo: shuffle(newVideos.filter(v => v.id !== topVideos[0].id))[0] || ({} as IVideo),
            } as IHome
        }
    } catch (e) {
        return {
            props: {
                newVideos: [],
                topVideo: {} as IVideo,
                randomVideo: {} as IVideo
            } as IHome
        }
    }
}

//Добавили свой тип для проверки на авторизацию в next
// HomePage.isOnlyUser = true

export default HomePage;
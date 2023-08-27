import Layout from "@/components/layout/Layout";
import Menu from "@/components/layout/sidebar/Menu/Menu";
import { NextPageAuth } from "@/providers/private-route.interface";
import { api } from "@/store/api/api";

const MySubscriptionsPage: NextPageAuth = () => {
    const { data } = api.useGetProfileQuery(null)

    return (
        <Layout title="Мои подписки">
            <Menu title='Мои подписки' items={
                data?.subscriptions.map(({toChannel}) => ({
                    image: toChannel.avatarPath,
                    title: toChannel.name,
                    link: '/c/' + toChannel.id
                })) || []
            } />
        </Layout>
    )
}

MySubscriptionsPage.isOnlyUser = true

export default MySubscriptionsPage;
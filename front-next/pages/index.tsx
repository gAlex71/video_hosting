import Home from "@/components/pages/home/Home";
import { NextPageAuth } from "@/providers/private-route.interface";

const HomePage: NextPageAuth = () => {
    return (
        <Home />
    )
};

//Добавили свой тип для проверки на авторизацию в next
// HomePage.isOnlyUser = true

export default HomePage;
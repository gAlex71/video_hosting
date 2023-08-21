import { FC, PropsWithChildren } from 'react';
import { TypeComponentAuthFields } from "./private-route.interface";
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
    children,
    Component: { isOnlyUser }
}) => {
    const { isLoading, user } = useAuth()
    const { replace, pathname } = useRouter();

    const Children = () => <>{children}</>

    if (isLoading) return null;
    //Для всех зарегистрированных пользователей все доступно
    if (user) return <Children />;
    //Если страница только для авторизованных, и мы не на главное, то перебрасываем на /
    if (isOnlyUser) pathname !== '/' && replace('/');

    return null;
}

export default CheckRole;
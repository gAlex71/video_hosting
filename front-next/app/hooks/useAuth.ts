import { useTypedSelector } from "./useTypedSelector";

//Получаем стор с авторизацией
export const useAuth = () => useTypedSelector(state => state.auth);
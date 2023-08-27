//Типизируем стандартные методы браузера увеличения на весь экран
export interface IVideoElement extends HTMLVideoElement {
    msRequestFullscreen?: () => void
    mozRequestFullscreen?: () => void
    webkitRequestFullscreen?: () => void
}
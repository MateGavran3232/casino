export interface GameData {
  id: number;
  title: string;
  image: string;
  description: string;
  publisher: string;
  bigImage: string;
}
export interface CarouselProps {
  images: string[];
}
export interface GameProps {
  data: {
    id: number;
    title: string;
    image: string;
    description: string;
    publisher: string;
  };
}
export interface LoginProps {
  setLoginDisplay: (value: boolean) => void;
}
export interface RegisterProp {
  setRegisterDisplay: (value: boolean) => void;
}

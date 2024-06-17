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
export interface RegisterProp {
  setRegisterDisplay: (value: boolean) => void;
}

export interface User {
  created_at: string;
  email: string;
  password: string;
  role: string;
  user_id: number;
  username: string;
}

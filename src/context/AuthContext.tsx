import { createContext, useState, useContext, ReactNode, FunctionComponent} from 'react';
import { getUserById, loginUser } from '../services/userService';
import { clearFavoritesOnLogout, removeFromStorage, saveToStorage } from '../utils/storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { string } from 'yup';

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}
interface User {
    _id: string;
    name: {
        first:  string;
        middle:  string;
        last:  string;
        _id:  string;
    },
    phone:  string;
    email:  string;
    image: {
        url:  string;
        alt:  string;
        _id:  string;
    },
    address: {
        state:  string;
        country:  string;
        city:  string;
        street:  string;
        houseNumber:number;
        zip:number;
        _id:  string;
    },
    isAdmin: boolean;
    isBusiness: boolean;
    classCode: string;
    createdAt:  string;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) =>void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async(email: string, password: string) => {
      try {
        const res = await loginUser(email, password);
        console.log("Server response:", res.data);
        if (res.data) {
          saveToStorage("token", res.data);
          const decode = jwtDecode<CustomJwtPayload>(res.data);

          const userResponse = await getUserById(decode['_id']);
          console.log("user:", userResponse);
    
          setUser(userResponse);
          localStorage.setItem("user", JSON.stringify(userResponse));
      }
  } catch(e) {
    console.log("Error:", e)
  }
}
    const logout = () => {
        setUser(null);
        removeFromStorage('user')
        removeFromStorage('token')
        clearFavoritesOnLogout();
      };
      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
    export const useAuth = (): AuthContextType => {
      const context = useContext(AuthContext);
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };
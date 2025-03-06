import { createContext, useState, useContext, ReactNode, FunctionComponent} from 'react';
interface User {
  [x: string]: ReactNode;
  username: ReactNode;
  email: string;
  token: string; 
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) =>void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, token: string) => {
      const user: User = {
        email, token,
        username: undefined
      }; 
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
  };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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
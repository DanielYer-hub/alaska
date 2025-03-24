import { FunctionComponent, useContext, useState } from 'react';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Cards from './Cards';
import { useAuth } from '../context/AuthContext';

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const { user } = useAuth();
  const themeContext = useContext(ThemeContext) as ThemeContextType;
  const { theme } = themeContext;
 
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`theme-${theme}`}> 
    <Navbar  onSearch={setSearchTerm} />
    <hr />
    <Cards searchTerm={searchTerm} />
    <Footer/> 
    </div>
  );
};

export default Dashboard;
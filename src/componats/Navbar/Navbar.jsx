
import { useContext } from 'react';
import { Link } from 'react-router'; 
import { UserinfoContext } from '../../Contexts/UserContext';

const Navbar = () => {
 
  
  return (
    <div className='flex justify-between py-3 bg-teal-700 text-white px-5'>
      <div>
        <h1 className="text-xl font-bold">DailyMart</h1>
        
      </div>
      <div>
        <ul className='flex gap-10 items-center'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/signin">SignIn</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

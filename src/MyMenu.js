import {Link,Outlet} from 'react-router-dom'
import Cookies from 'js-cookie';
function MyMenu(){
    // check whether user has logged in or not 
    // alert(Cookies.get('userid'));
    var userid = Cookies.get('userid');
    if(userid === undefined)
    {
        window.location = "/adminlogin";
    }
    else 
    {
      return(
        <div>
        <nav className="navbar navbar-expand-xl navbar-light bg-light shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/adminhome">Online shop - admin panel</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse show" id="navbarBasic">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              <li className="nav-item">
                <Link className="nav-link" to="/adminhome">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category">Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminchangepassword">Change Password</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminlogout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <Outlet />
        </div>
      )
    }
}
export default MyMenu;
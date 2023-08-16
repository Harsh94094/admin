import Cookies from "js-cookie";
import { Component } from "react";
class AdminLogout extends Component {
    constructor(props) {
        super(props);
        Cookies.remove("userid");
        alert('logout successfull');
        window.location = "/adminlogin";
    }
    render()
    {
        return (<div></div>);
    }
}
 
export default AdminLogout;
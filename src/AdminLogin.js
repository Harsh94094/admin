import axios from "axios";
import Cookies from "js-cookie";
import { Component } from "react";

class AdminLogin extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    login = (e) =>{
        console.log(this.state);
        var ApiAddress = "https://www.theeasylearnacademy.com/shop/ws/login.php";
        var form = new FormData();
        //  input : email,password(required) 
        form.append("email",this.state.email);
        form.append("password",this.state.password);
        axios({
          url:ApiAddress,
          method:'post',
          responseType:'json',
          data:form
        }).then((response) =>{
            var data = response.data;
            console.log(data);
            // [{"error":"input is missing"}] 
            // [{"error":"no"},{"success":"no"},{"message":"invalid login attempt"}]
            // [{"error":"no"},{"success":"yes"},{"message":"login successful"},{"id":"3"}]
            var error = data[0]['error'];
            if(error !='no')
              alert(error);
            else 
              {
                var success = data[1]['success'];
                alert (data[2]['message']);
                if(success == 'yes')
                {
                   var id = data[3]['id'];
                   Cookies.set("userid",id);
                   window.location = '/adminhome';
                }
              }
        });
        e.preventDefault();
    }
    changeValue = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    render(){
        return (<div className="container">
        <div className="row mt-5">
          <div className="col-sm-6 col-12 offset-sm-3">
            <div className="card  shadow">
              <div className="card-header text-bg-primary">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <form action onSubmit={this.login}>
                  <div className="mb-3">
                    <input type="email" name="email" id="email" placeholder="email" className="form-control" onChange={(e) => this.changeValue(e)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" name="password" id="password" placeholder="password" className="form-control" onChange={(e) => this.changeValue(e)} />
                  </div>
                  <div className="d-grid">
                    <input type="submit" defaultValue="Login" className="btn btn-primary" value='Login' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
}
export default AdminLogin;
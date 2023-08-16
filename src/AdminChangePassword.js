import { Component } from "react";
import Cookies from "js-cookie";
import axios from "axios";

class AdminChangePassword extends Component
{
    constructor(props)
    {
        super(props);
    }
    changeValue = (e) =>{
      this.setState({
          [e.target.name] : e.target.value
      });
    }

    changePassword = (e) => {
      console.log(this.state);
      if(this.state.new_password != this.state.confirm_new_password)
      {
         alert("new password and confirm new password must be same");
      }
      else 
      {
        var ApiAddress = "https://www.theeasylearnacademy.com/shop/ws/change_password.php";
        var form = new FormData();
        //id,password,newpassword(required)
        form.append("id",Cookies.get("userid"));
        form.append("password",this.state.current_password);
        form.append("newpassword",this.state.new_password);
        axios({
          url:ApiAddress,
          method:'post',
          responseType:'json',
          data:form
        }).then((response) =>{
            var data = response.data;
            /*
              [{"error":"input is missing"}] 
              [{"error":"no"},{"success":"no"},{"message":"invalid change password attempt"}]
              [{"error":"no"},{"success":"yes"},{"message":"password changed"}]
            */
           var error = data[0]['error'];
           if(error != 'no')
           {
              alert(error);
           }
           else 
           {
              alert(data[2]['message']);
              if(data[1]['success'] == 'yes')
              {
                  Cookies.remove("userid");
                  window.location = '/adminlogin';
              }
           }
        });

      }
      e.preventDefault();
    }
    render()
    {
        return (<div className="container">
        <div className="row">
          <div className="col-sm-8 col-12 offset-sm-2">
            <div className="card  shadow">
              <div className="card-header text-bg-danger">
                <h3>Change password</h3>
              </div>
              <div className="card-body">
                <form action onSubmit={this.changePassword}>
                  <div className="row mb-3">
                    <label htmlFor="current_password" className="col-form-label col-sm-4">Current password</label>
                    <div className="col-sm-8">
                      <input type="password" name="current_password" id="current_password" className="form-control" onChange={(e) => this.changeValue(e)} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="new_password" className="col-form-label col-sm-4">New password</label>
                    <div className="col-sm-8">
                      <input type="password" name="new_password" id="new_password" className="form-control" onChange={(e) => this.changeValue(e)} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="confirm_new_password" className="col-form-label col-sm-4">Confirm new password</label>
                    <div className="col-sm-8">
                      <input type="password" name="confirm_new_password" id="confirm_new_password" className="form-control" onChange={(e) => this.changeValue(e)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-end">
                        <button type="submit" className="btn btn-danger">Save changes</button>
                        <button type="reset" className="btn btn-dark">Clear all</button>
                      </p>
                    </div>
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
export default AdminChangePassword;
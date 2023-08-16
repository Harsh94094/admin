import React, { Component } from 'react';
import {getApiBaseAddress} from './CommonFuncions';
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           category: 0,
           product: 0,
           user: 0,
           order: 0,
           isOnline : true,
         }; //empty 
        window.addEventListener('online', () => this.setStatus(true))
        window.addEventListener('offline', () => this.setStatus(false))
    }
    setStatus = (status) =>{
        alert('internet connection status changed....');
        this.setState({
          isOnline : status
        })
    }
    componentDidMount(){
      var ApiAddress = getApiBaseAddress() + `summary.php`;
      fetch(ApiAddress).then((response) => response.json()).then((data) =>{
          console.log(data);
      }).catch((error) => {
        alert('server is not available');
      });
    }
    render() { 
      var output = '';
      if(this.state.isOnline == false)
      {
         output = <div class="alert alert-danger" role="alert">you are offline. (no internet connection)</div>;
      }
      else 
      {
          output = <div class="alert alert-success alert-dismissible fade show" role="alert">
  you are Online.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
      }
        return ( 
            <div className="container mt-3">
  <div className="row">
    <div className="col-12">
      {output}
      <div className="card shadow">
        <div className="card-header text-bg-danger">
          <h3>Home/Dashboard</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0 text-bg-warning">
                <div className="card-body">
                  <div className="row">
                    <div className="col ">
                      <span className="h6 font-semibold text-white text-sm d-block mb-2">Orders</span>
                      <span className="h3 font-bold mb-0">{this.state.order}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0 text-bg-warning">
                <div className="card-body">
                  <div className="row">
                    <div className="col ">
                      <span className="h6 font-semibold text-white text-sm d-block mb-2">Categories</span>
                      <span className="h3 font-bold mb-0">{this.state.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0 text-bg-warning">
                <div className="card-body">
                  <div className="row">
                    <div className="col ">
                      <span className="h6 font-semibold text-white text-sm d-block mb-2">Products</span>
                      <span className="h3 font-bold mb-0">{this.state.product}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0 text-bg-warning">
                <div className="card-body">
                  <div className="row">
                    <div className="col ">
                      <span className="h6 font-semibold text-white text-sm d-block mb-2">Users</span>
                      <span className="h3 font-bold mb-0">{this.state.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

         );
    }
}
 
export default AdminHome;
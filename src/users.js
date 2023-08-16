import React, { Component } from 'react'
class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users : [] 
        }
    }
    componentDidMount()
    {
        var ApiAddress = "https://theeasylearnacademy.com/shop/ws/users.php";
        fetch(ApiAddress).then((response) => response.json()).then((data) => {
            console.log(data);
            var error = data[0]['error'];
            if(error != 'no') //there is an error 
            {
                alert(error);
            }
            else 
            {
               var total =  data[1]['total'];
               if (total == 0)
               {
                    alert('no users found');
               }
               else 
               {
                    //there are some users
                    data.splice(0,2); //1st argument start position, 2nd argument no of elements to be deleted
                    this.setState({
                        users:data
                    });

               }
            }
        });
    }
    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header text-bg-danger">
                                <h3>User management</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width="5%">Id</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th width="15%">View Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.users.map((user) => {
                                            return (<tr>
                                                <td>{user['id']}</td>
                                                <td>{user['email']}</td>
                                                <td>{user['mobile']}</td>
                                                <td>
                                                    <a href="orders" className="btn btn-danger">View order</a>
                                                </td>
                                            </tr>)
                                      })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Users;
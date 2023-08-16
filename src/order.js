import React, { Component } from 'react'
import axios from 'axios'
class order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
    }
    componentDidMount()
    {
        var ApiAddress = "https://www.theeasylearnacademy.com/shop/ws/orders.php";
        /*
        [
            0{"error":"no"},
            1{"total":2},
            2{"id":"2","fullname":"nikunj bhatt","address1":"hill drive","address2":"eva subhi","city":"baroda","pincode":"364001","amount":"45600"},
            3{"id":"1","fullname":"ankit patel","address1":"hill drive","address2":"opp aksharwadi ","city":"bhavnagar","pincode":"364001","amount":"12500"}
        ]
        */
        //call api and get data 
        var self = this;
        axios({
            method:'get',
            url:ApiAddress,
            responseType:'json'
        }).then((response) =>{
            var data = response['data'];
            console.log(data);
            var error = data[0]['error'];
            if(error !='no')
            {
                alert(error);
            }
            else 
            {
                var total = data[1]['total'];
                if(total == 0)
                {
                    alert('no orders found');
                }
                else 
                {
                    data.splice(0,2); //remove first two object
                    self.setState({
                        orders:data
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
                                <h3>Order management</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width="5%">Order <br /> No</th>
                                            <th width="10%">Order Date</th>
                                            <th>Order Detail</th>
                                            <th width="10%">Amount</th>
                                            <th width="10%">Status</th>
                                            <th width="10%">Payment <br /> Mode</th>
                                            <th width="15%">View Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.orders.map((item) => {
                                            return this.DisplayOrder(item)
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
    DisplayOrder(item)
    {
        return (<tr>
            <td>{item['id']}</td>
            <td>24-05-2023</td>
            <td>{item['fullname']} <br />
                {item['address1']} <br />
                {item['address2']} <br />
                City {item['city']} Pincode {item['pincode']} <br />
            </td>
            <td>₹ {item['amount']}</td>
            <td>Confirmed</td>
            <td>Cash on delivery</td>
            <td>
                <a href={"order-detail/" + item['id']} className="btn btn-danger">
                    View
                </a>
            </td>
        </tr>);
    }
}
export default order;
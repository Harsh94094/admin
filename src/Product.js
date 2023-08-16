import React, { Component } from 'react'
import axios from 'axios';
import {getApiBaseAddress,getImageBaseAddress} from './CommonFuncions';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    var self = this;
    var ApiAddress =  getApiBaseAddress() + `product.php`;
    /* 
      [
        0{"id":"50","categoryid":"0","title":"hi","price":"34444","stock":"455","weight":"0","size":"","photo":"Screenshot_20190823-142153.jpg","detail":"it is are","islive":"1","isdeleted":"0"},
        1{"id":"68","categoryid":"0","title":"dell","price":"120000","stock":"20","weight":"0","size":"","photo":"images.png","detail":"dell laptop","islive":"1","isdeleted":"0"},
        2{"id":"69","categoryid":"0","title":"iam","price":"77","stock":"7","weight":"0","size":"","photo":"G.jpg","detail":"iam","islive":"1","isdeleted":"0"},{"id":"70","categoryid":"0","title":"heee","price":"10","stock":"10","weight":"0","size":"","photo":"G.jpg","detail":"dashlkdljff","islive":"1","isdeleted":"0"},{"id":"71","categoryid":"0","title":"bag","price":"299","stock":"100","weight":"0","size":"","photo":"81mmaolsY5L._UX522_.jpg","detail":"for boy","islive":"1","isdeleted":"0"},{"id":"74","categoryid":"0","title":"watch","price":"12500","stock":"11","weight":"0","size":"","photo":"right_arrow.png","detail":"test","islive":"1","isdeleted":"0"}]
    */
    fetch(ApiAddress).then((response) => response.json()).then(function (data) 
    {
      console.log(data);
      var error = data[0]['error'];
      if (error != 'no') //there is some error
      {
        alert(error);
      }
      else  //no error
      {
        var total = data[1]['total'];
        if (total == 0) {
          alert('no product found');
        }
        else {
          //we have products
          data.splice(0, 2); //delete first two element from array/list

          self.setState({
            products: data
          });
          // console.log('after we set data ',self.state.products);
        }
      }
    });
  }
  DeleteProduct = (productid) => {
    //alert(productid);
    var ApiAddress =  getApiBaseAddress() + `delete_product.php?id=${productid}`;
    axios({
      url:ApiAddress,
      method:'get',
      responseType:'json'
    }).then((response) => {
      let data = response.data;
      /* 
        [{"error":"input is missing"}] 
        [{"error":"no"},{"message":"category removed success"}]
      */
      var error = data[0]['error'];
      if(error != 'no')
        alert(error);
      else 
      {
         let message = data[1]['message'];
         let temp = this.state.products.filter(function(product){
            if(productid !=product['id'])
              return product
         });
         this.setState({
            products : temp
         },() => {
            alert(message);
         });
      }
    });
  }
  render() {
    return (<div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header text-bg-danger">
              <div className="row">
                <div className="col">
                  <h3>Product management</h3>
                </div>
                <div className="col text-end">
                  <a className="btn btn-warning" href="/insert-product">Add product</a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="5%">id</th>
                      <th width="10%">Category</th>
                      <th width="25%">title</th>
                      <th width="10%">photo</th>
                      <th width="8%">price</th>
                      <th width="5%">Stock</th>
                      <th width="5%">Weight</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((item) => {
                      var temp = null;
                      if(item['islive'] == "1")
                        temp = <span className="badge bg-primary">Live</span>
                      else 
                        temp = <span className="badge bg-danger">Not Live</span>
                      
                      return (   <tr>
                        <td> {item['id']}
                          <br />
                          {temp}
                        </td>
                        <td>
                          Laptop
                        </td>
                        <td>
                          <div>{item['title']}</div>
                          <div className="row mt-2">
                            <div className="col-6">
                              <button onClick={(e) => this.DeleteProduct(item['id'])} className="btn btn-danger w-100">Delete</button>
                            </div>
                            <div className="col-6">
                              <a href={"/edit-product/" + item['id']} className="btn btn-warning w-100">Edit</a>
                            </div>
                          </div>
                        </td><td>
                          <a className="image" href={getImageBaseAddress() + `product/` + item['photo']}>
                            <img src={getImageBaseAddress() +  `product/` + item['photo']} className="img-fluid" alt='image not available' />
                          </a>
                        </td>
                        <td>{item['price']}</td>
                        <td>{item['stock']}</td>
                        <td>{item['weight']}</td>
                        <td>{item['detail']}</td>
                      </tr>);
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default Product
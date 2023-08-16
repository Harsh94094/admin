import axios from 'axios';
import React, { Component } from 'react'
class editproduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
           productid : '',
           title : '',
           price : '',
           stock : '',
           weight : '',
           photo : '',
           detail : '',
        }

        var url = new URL(window.location.href);
        var CurrentPage = url.href;
        var position_of_last_slash = CurrentPage.lastIndexOf("/");
        var productid = CurrentPage.substring(position_of_last_slash+1);
        // alert(productid);
        var ApiAddress = `http://theeasylearnacademy.com/shop/ws/product.php?productid=${productid}`;
        axios({
            url:ApiAddress,
            method:'get',
            responseType:'json'
        }).then((response) => {
            var data = response.data;
            console.log(data);
            var error = data[0]['error'];
            if(error != 'no')
                alert(error);
            else 
            {
                var total = data[1]['total'];
                if(total==0)
                    alert('no product found');
                else 
                {
                    this.setState({
                        productid: data[2]['id'],
                        title: data[2]['title'],
                        price: data[2]['price'],
                        stock: data[2]['stock'],
                        weight: data[2]['weight'],
                        photo: data[2]['photo'],
                        detail: data[2]['detail'],
                    });
                }
            }
        });
    }
    updateProduct = (e) => 
    {
        console.log(this.state);
        e.preventDefault();
        //name,photo,price,stock,detail,productid,weight 
        var ApiAddress = "https://www.theeasylearnacademy.com/shop/ws/update_product.php";
        var form = new FormData();
        form.append('name', this.state.title)
        form.append('price', this.state.price)        
        form.append('stock', this.state.stock)        
        form.append('detail', this.state.detail)        
        form.append('productid', this.state.productid)        
        form.append('filename', this.state.filename)        
        axios({
            method:'post',
            url: ApiAddress,
            data:form,
            responseType:'json',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then((response) =>{
            var data = response.data;
            console.log(data);
            var error = data[0]['error'];
            if(error != 'no')
                alert(error);
            else 
            {
                var message = data[2]['message'];
                alert(message);
                var success = data[1]['success'];
                if(success == 'yes')
                    window.location = '/product'
            }
        });

    }
    changeValue = (e) =>
    {
        this.setState({
           [e.target.name] : e.target.value
        });
    }
    ChangeFile = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
    }
    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header text-bg-danger">
                                <h3>Product management</h3>
                            </div>
                            <div className="card-body">
                                <form action onSubmit={this.updateProduct}>
                                    <div className="row">
                                        <div className="col-12"><h5>Edit Product</h5></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="text" className="form-control" id="title" placeholder="Product title" name="title" value={this.state.title} onChange={(e) => this.changeValue(e)} />
                                                <label htmlFor="title">Edit Product title
                                                </label></div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="form-floating mt-3">
                                                <select className="form-select" id="categoryid" aria-label="Select categoryid" name="categoryid">
                                                    <option selected>Change categoryid</option>
                                                    <option value={1}>Laptop</option>
                                                    <option value={2}>Mobile</option>
                                                    <option value={3}>TV</option>
                                                    <option value={4}>Camera</option>
                                                </select>
                                                <label htmlFor="categoryid">Change category</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <label htmlFor="filename" className="form-label">Default file input</label>
                                            <input className="form-control" type="file" id="filename" name='filename' onChange={(e) => this.ChangeFile(e)} />
                                            <hr/>
                                            <img src={"http://www.theeasylearnacademy.com/shop/images/product/" + this.state.photo} className='img-fluid' />
                                        </div> 
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="number" className="form-control" id="price" placeholder="Price" name="price" value={this.state.price} onChange={(e) => this.changeValue(e)} />
                                                <label htmlFor="price" >Edit price</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="number" className="form-control" id="stock" placeholder="Stock" name="stock" value={this.state.stock} onChange={(e) => this.changeValue(e)} />
                                                <label htmlFor="stock">Edit Stock</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="number" className="form-control" id="Weight" placeholder="weight" value={this.state.weight} name="weight" onChange={(e) => this.changeValue(e)} />
                                                <label htmlFor="weight">Edit Weight</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <p>is Available?</p>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="status" id="yes" />
                                                <label className="form-check-label" htmlFor="yes">Yes</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="status" id="no" />
                                                <label className="form-check-label" htmlFor="no">No</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" name="detail" id="detail" style={{ "height": "100px" }} defaultValue={this.state.detail} onChange={(e) => this.changeValue(e)} />
                                                <label htmlFor="detail">Edit Detail</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <button type="submit" className="btn btn-danger w-100 mt-5">Save changes</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default editproduct;
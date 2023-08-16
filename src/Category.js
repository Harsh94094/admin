import React, { Component } from 'react';
import {getApiBaseAddress} from './CommonFuncions';
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          categories: []
         };
    }
    componentDidMount()
    {
      console.log('componentDidMount called....');
      var ApiAddress = getApiBaseAddress() + `category.php`;
      //api call
      fetch(ApiAddress).then((response) => response.json()).then((data) => {
          console.log(data);
      /*  
      [
          0{"id":"99","title":"home & furniture","photo":"C:fakepathdownload (2).jpg"},
          1{"id":"91","title":"rutwik","photo":"C:fakepathcategory.png"},
          2{"id":"103","title":"Laptop","photo":"C:fakepathsigndivyakant.jpg"},
          3{"id":"102","title":"Electronics","photo":"C:fakepathimg-1.jpg"},
          4{"id":"97","title":"mobile","photo":"C:fakepathdownload (1).jpg"},
          5{"id":"98","title":"mobile","photo":"C:fakepathdownload (1).jpg"},
          6{"id":"85","title":"test","photo":"testphoto.jpg"},
          {"id":"104","title":"furniture","photo":"C:fakepathdownload.jpg"},
          {"id":"105","title":"diwali colors","photo":"C:fakepath\right_arrow.png"},
          {"id":"81","title":"test","photo":"testphoto.jpg"},
          {"id":"82","title":"test","photo":"testphoto.jpg"},
          {"id":"79","title":"test","photo":"testphoto.jpg"},
          {"id":"80","title":"test","photo":"testphoto.jpg"},
          {"id":"106","title":"diwali colors","photo":"C:fakepath\right_arrow.png"}] */
          var error = data[0]['error'];
          console.log(error);
          if(error != 'no')
          {
            alert(error);
          }
          else 
          {
             //no error
             var total = data[1]['total'];
             console.log(total);
             if(total == 0)
             {
                alert('no category found');
             }
             else 
             {
                data.splice(0,2); //1st argument start position, 2nd argument no of elements
                this.setState({
                  categories : data
                });
             }
          }
      });
    }
    DeleteCategory = (categoryid) => {
      //alert(categoryid);
      var ApiAddress = getApiBaseAddress() + `delete_category.php?id=${categoryid}`; 
      /*
        [{"error":"input is missing"}] 
        [{"error":"no"},{"message":"category removed sucessfuly"}]
      */
      fetch(ApiAddress).then((response) => response.json()).then((data) => {
          console.log(data);
          var error = data[0]['error'];
          if(error != 'no')
            alert(error);
          else 
          {
              var temp = this.state.categories.filter((category) => {
                if(categoryid != category['id'])  
                  return category;
              });
              this.setState({
                categories:temp
              },() => {
                alert(data[1]['message']);
              });
              
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
          <div className="row">
            <div className="col"><h3>Category Management</h3></div>
            <div className="col text-end">
              <a href="insert-category.html" className="btn btn-warning">Add new category</a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>id</th>
                  <th width="30%">Name</th>
                  <th width="30%">Photo</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((category) =>{
                   return ( <tr>
                  <td>{category['id']}</td>
                  <td>{category['title']}</td>
                  <td>
                    <img src="https://picsum.photos/100" className="img-fluid" />
                  </td>
                  <td>
                    <button onClick={(e) => this.DeleteCategory(category['id'])} className="btn btn-danger btn-sm">Delete</button>
                    <a href="edit-category.html" className="btn btn-warning btn-sm">Edit</a>
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
</div>

         );
    }
}
export default Category;

 
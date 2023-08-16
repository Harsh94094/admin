import React, { Component } from 'react'
class printorder extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <button type="button" onclick="window.print();">Print</button>
                <table width="100%" cellPadding={10} border={2} align="center">
                    <thead>
                        <tr>
                            <th width="5%">Order <br /> No</th>
                            <th width="10%">Order Date</th>
                            <th>Order Detail</th>
                            <th width="10%">Amount</th>
                            <th width="10%">Status</th>
                            <th width="10%">Payment <br /> Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>24-05-2023</td>
                            <td>Ankit Patel <br />
                                105 - Eva surbhi, Opp aksharwadi <br />
                                Waghawadi Road - Bhavnagar <br />
                                Contact No - 9662512857
                            </td>
                            <td>₹ 125000</td>
                            <td>Confirmed</td>
                            <td>Cash on delivery</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Order items</h3>
                <table width="100%" cellPadding={10} border={2} align="center">
                    <tbody><tr>
                    </tr></tbody><thead>
                        <tr className="bg-dark">
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Acer Laptop</td>
                            <td>50000</td>
                            <td>1</td>
                            <td>50000</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Washing machine</td>
                            <td>25000</td>
                            <td>3</td>
                            <td>75000</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>Total</td>
                            <td>125000</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }

}
export default printorder;
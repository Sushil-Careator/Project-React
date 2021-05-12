import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType } from "../types";

type Props = {
    cartData: any;
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
    state = { change: false };

    render() {
        const allId: any = [];
        let allData: any = [];
        const datas = this.props.cartData.cart;
        let finaldata = datas.map((data: any, index: number, arr: any) => {
            if (allId.includes(data.productId) === false) {
                allData.push(data);
                allId.push(data.productId);
            }
        });

        const decQut = (e: any) => {
            let dataForFilter = allData.map(
                (data: any, index: number, arr: any) => {
                    if (
                        JSON.parse(e.target.value) ===
                        JSON.parse(data.productId)
                    ) {
                        data.productQty = JSON.parse(data.productQty) - 1;
                    }
                }
            );
            this.setState({ change: true });
        };

        const incQut = (e: any) => {
            allData.map((data: any, index: number, arr: any) => {
                if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
                    data.productQty = JSON.parse(data.productQty) + 1;
                }
            });
            this.setState({ change: true });
        };

        const processSubmit = (e: any) => {
            e.preventDefault();

            const orderData = allData.filter(
                (data: any) => data.productQty >= 1
            );

            const dataPass = {
                products: JSON.stringify(orderData),
            };

            return StorageService.getData("token").then((token) =>
                axios.post("http://localhost:5000/order", dataPass, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );
        };
        let allTotalAmount: number = 0;
        return (
            <Column size={12}>
                <div className="container">
                    <h1 className="text-primary">Cart Details</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">product Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Product Quantity</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.map((data: any, index: number) =>
                                data.productQty > 0 ? (
                                    <tr key={data.productId}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.productId}</td>
                                        <td>{data.productName}</td>
                                        <td>INR {data.productSalePrice}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger m-2"
                                                onClick={decQut}
                                                value={data.productId}
                                            >
                                                -
                                            </button>
                                            {data.productQty}
                                            <button
                                                className="btn btn-primary m-2"
                                                onClick={incQut}
                                                value={data.productId}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            INR{" "}
                                            {data.productSalePrice *
                                                data.productQty}
                                            <p style={{ display: "none" }}>
                                                {
                                                    (allTotalAmount =
                                                        allTotalAmount +
                                                        data.productSalePrice *
                                                            data.productQty)
                                                }
                                            </p>
                                        </td>
                                    </tr>
                                ) : null
                            )}
                        </tbody>
                    </table>
                    <p className={"totalProductPrice"}>
                        Total Product Price <b>INR {allTotalAmount}</b>
                    </p>
                </div>
                <div className="container">
                    <button
                        className="btn btn-primary p-3"
                        onClick={processSubmit}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </Column>
        );
    }
}

const mapStoreToProps = (store: CartType) => {
    return {
        cartData: store,
    };
};

export default connect(mapStoreToProps, null)(Cart);

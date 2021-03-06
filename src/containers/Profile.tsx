import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ProfileUpload from "../components/ProfileUpload";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
import { StoreType } from "../types";
type Props = {
    uploadClick: () => void;
    selectedCurrency: any;
} & RouteComponentProps;
type State = {
    orderAddress: any;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: number;
    changed: boolean;
    productsFromApi: any;
    orderDate: any;
    shippingDate: any;
    orderIds: any;
    userProfileImage: string;
    userName: string;
    userEmail: string;
    hide: boolean;
    profileImage: any;
};
// type uploadFile = () => void;
class Profile extends React.Component<Props, State> {
    state: State = {
        orderAddress: [],
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: 0,
        changed: false,
        productsFromApi: [],
        orderIds: [],
        orderDate: [],
        shippingDate: [],
        userProfileImage: "",
        userName: "",
        userEmail: "",
        hide: true,
        profileImage: "",
    };

    ordersData = [];

    async componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({ productsFromApi: [] });
        this.setState({ orderIds: [] });
        this.setState({ orderDate: [] });
        this.setState({ shippingDate: [] });
        this.setState({
            hide: true,
        });

        try {
            const { data } = await UserService.profile();
            this.setState({ userName: data.userName.toUpperCase() });
            this.setState({ userEmail: data.userEmail });
            this.setState({ userProfileImage: data.profileImage });

            data.order.map((data: any) => {
                this.setState({
                    productsFromApi: [
                        ...this.state.productsFromApi,
                        JSON.parse(data.products),
                    ],
                });

                // this.ordersData.push()

                if (data.isCancelled == false) {
                    this.setState({
                        orderIds: [
                            ...this.state.orderIds,
                            JSON.parse(data.orderId),
                        ],
                    });
                } else {
                    this.setState({
                        orderIds: [...this.state.orderIds, 0],
                    });
                }

                this.setState({
                    orderDate: [...this.state.orderDate, data.orderDate],
                });

                this.setState({
                    shippingDate: [
                        ...this.state.shippingDate,
                        data.shippingDate,
                    ],
                });
            });

            this.setState({ orderAddress: data.address });
        } catch (e) {
            console.log(e.response.data);
        }

        axios
            .get(
                `http://localhost:5000/auth/profileImage/${this.state.userProfileImage}`
            )
            .then((response) =>
                this.setState({
                    profileImage: response.request.responseURL,
                })
            );
    };

    addAddress = (e: any) => {
        e.preventDefault();
        let dataPass = {
            line1: this.state.line1,
            line2: this.state.line2,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
        };

        return StorageService.getData("token").then((token) =>
            axios
                .post("http://localhost:5000/address", dataPass, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    // e.target.reset();

                    this.getData();
                })
        );
    };

    delete = (e: any) => {
        let deleteId = e.target.value;
        return StorageService.getData("token").then((token) =>
            axios
                .delete(`http://localhost:5000/address/${deleteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    this.getData();
                })
        );
    };

    redirecting = () => {
        if (this.state.changed === true) {
            return <Redirect to="/profile" />;
        }
    };

    cancelOrder = (e: any) => {
        let cancelId = parseInt(e.target.value);
        console.log(cancelId);

        let dataPass = {
            isCancelled: true,
        };

        return StorageService.getData("token").then((token) =>
            axios
                .patch(`http://localhost:5000/order/${cancelId}`, dataPass, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    this.getData();
                })
        );
    };

    iconClicked = () => {
        this.setState({
            hide: false,
        });
    };

    render() {
        return (
            <>
                {this.redirecting()}
                <Row>
                    <h2 className="text-primary mb-4">Profile Details</h2>
                    <Column size={12}>
                        <div className="container user text-center">
                            <div className="profileImage" id="profileImage">
                                <img
                                    src={this.state.profileImage}
                                    alt="Profile Image"
                                    className="img-thumbnail"
                                    width="250px"
                                />

                                <i
                                    className="fas fa-upload"
                                    onClick={this.iconClicked}
                                ></i>
                                {this.state.hide ? null : (
                                    <ProfileUpload getData={this.getData} />
                                )}
                            </div>
                            <h3>{this.state.userName}</h3>
                            <h4>{this.state.userEmail}</h4>
                        </div>
                    </Column>

                    <div className="col-md-12 text-center">
                        {this.state.productsFromApi.map(
                            (data: any, index: number) => (
                                <Row>
                                    <div className="bg-primary p-3">
                                        <h3>Order {index + 1}</h3>
                                        <h4>
                                            Order Date :{" "}
                                            {new Date(
                                                this.state.orderDate[index]
                                            ).toLocaleString()}
                                        </h4>
                                        {data.map((data: any) => (
                                            <>
                                                <tr
                                                    className={
                                                        this.state.orderIds[
                                                            index
                                                        ] == 0
                                                            ? "bg-warning flexDisplay"
                                                            : "bg-success flexDisplay"
                                                    }
                                                >
                                                    <td className="imageDivThum p-2 flex-auto flexDisplay">
                                                        <img
                                                            className="img-thumbnail"
                                                            src={
                                                                data.productImage
                                                            }
                                                        />
                                                    </td>
                                                    <td className="full-width col-4">
                                                        <p>
                                                            {" "}
                                                            <b>Product Name</b>
                                                        </p>
                                                        {data.productName}
                                                    </td>
                                                    <td className="full-width col-2">
                                                        <p>
                                                            <b>Price Per Qty</b>
                                                        </p>
                                                        {
                                                            this.props
                                                                .selectedCurrency
                                                        }
                                                        {data.productSalePrice}
                                                    </td>
                                                    <td className="full-width col-2">
                                                        <p>
                                                            <b>
                                                                Product Quantity
                                                            </b>
                                                        </p>
                                                        {data.productQty}
                                                    </td>
                                                    <td className="full-width col-2">
                                                        <p>
                                                            <b>Total Amount</b>
                                                        </p>
                                                        {
                                                            this.props
                                                                .selectedCurrency
                                                        }
                                                        {data.productSalePrice *
                                                            data.productQty}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                        {this.state.orderIds[index] == 0 ? (
                                            <p className="bg-danger p-md-3">
                                                Order Cancelled
                                            </p>
                                        ) : (
                                            <button
                                                value={
                                                    this.state.orderIds[index]
                                                }
                                                onClick={this.cancelOrder}
                                                className="btn btn-danger"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </Row>
                            )
                        )}
                    </div>

                    <Column size={12}>
                        <h1 className="pt-5">Address</h1>
                        <div className="bg-light-gray text-center">
                            {this.state.orderAddress.map((data: any) => (
                                <div
                                    className="container order bg-gray m-5 p-3 text-capitalize"
                                    id={data.id}
                                    key={data.id}
                                >
                                    <h5>
                                        {data.firstName !== null ? (
                                            <p>
                                                NAME: {data.firstName}{" "}
                                                {data.lastName}
                                            </p>
                                        ) : null}
                                        {data.mobileNo !== null ? (
                                            <p>Mobile No: {data.mobileNo}</p>
                                        ) : null}
                                        ADDRESS: {data.line1} {data.line2} ,{" "}
                                        {data.city}, {data.state} ,
                                        {data.pincode}
                                    </h5>
                                    <button
                                        onClick={this.delete}
                                        value={data.id}
                                        className="btn btn-danger"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Column>
                </Row>
                <Row>
                    <Column size={2}></Column>
                    <Column size={8}>
                        <form onSubmit={this.addAddress}>
                            <div className="mb-3">
                                Address 1
                                <input
                                    type="text"
                                    className="form-control"
                                    id="line1"
                                    value={this.state.line1}
                                    placeholder="line1"
                                    onChange={(e: any) =>
                                        this.setState({
                                            line1: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                Address 2(Optional)
                                <input
                                    type="text"
                                    className="form-control"
                                    id="line2"
                                    value={this.state.line2}
                                    placeholder="line2"
                                    onChange={(e: any) =>
                                        this.setState({
                                            line2: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                City
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={this.state.city}
                                    placeholder="city"
                                    onChange={(e: any) =>
                                        this.setState({
                                            city: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                State
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    value={this.state.state}
                                    placeholder="state"
                                    onChange={(e: any) =>
                                        this.setState({
                                            state: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                PinCode
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pincode"
                                    value={this.state.pincode}
                                    placeholder="pincode"
                                    onChange={(e: any) =>
                                        this.setState({
                                            pincode: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <button className="btn btn-warning">
                                Add Address
                            </button>
                        </form>
                    </Column>
                    <Column size={2}></Column>
                </Row>
            </>
        );
    }
}

const mapStoreToProps = (store: StoreType) => {
    return {
        selectedCurrency: store.currency,
    };
};
export default connect(mapStoreToProps, null)(Profile);

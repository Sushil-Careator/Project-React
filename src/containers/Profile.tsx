import axios from "axios";
import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
type Props = {} & RouteComponentProps;
type State = {
    orderAddress: any;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: number;
    changed: boolean;
    productsFromApi: any;
};

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
    };
    async componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            const { data } = await UserService.profile();
            console.log(data.address);
            console.log(data.order);

            data.order.map((data: any, index: number) => {
                this.setState({
                    productsFromApi: [
                        ...this.state.productsFromApi,
                        JSON.parse(data.products),
                    ],
                });
            });

            // this.state.productsFromApi.map((data) => console.log(data));
            console.log(this.state.productsFromApi);
            this.setState({ orderAddress: data.address });
        } catch (e) {
            console.log(e.response.data);
        }
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

    render() {
        return (
            <>
                {this.redirecting()}
                <Row>
                    <h2 className="text-primary mb-4">Profile Details</h2>
                    <Column size={4}>
                        <div className="container user">
                            <h3>UserName</h3>
                            <h4>User Email</h4>
                        </div>
                    </Column>
                    <Column size={8}>
                        {this.state.orderAddress.map((data: any) => (
                            <div
                                className="container order"
                                id={data.id}
                                key={data.id}
                            >
                                <h5>
                                    {data.firstName == "" ? (
                                        <p>
                                            NAME: {data.firstName}{" "}
                                            {data.lastName}
                                        </p>
                                    ) : null}
                                    {data.mobileNo == "" ? (
                                        <p>Mobile No: {data.mobileNo}</p>
                                    ) : null}
                                    ADDRESS: {data.line1}
                                    {data.line2} , {data.city}, {data.state} ,
                                    {data.pincode}
                                </h5>
                                <button onClick={this.delete} value={data.id}>
                                    DELETE
                                </button>
                            </div>
                        ))}
                    </Column>
                </Row>
                <Row>
                    <Column size={4}></Column>
                    <Column size={8}>
                        <form onSubmit={this.addAddress}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="line1"
                                    value={this.state.line1}
                                    placeholder="line1"
                                    onChange={(e: any) =>
                                        this.setState({ line1: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="line2"
                                    value={this.state.line2}
                                    placeholder="line2"
                                    onChange={(e: any) =>
                                        this.setState({ line2: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={this.state.city}
                                    placeholder="city"
                                    onChange={(e: any) =>
                                        this.setState({ city: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    value={this.state.state}
                                    placeholder="state"
                                    onChange={(e: any) =>
                                        this.setState({ state: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
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
                </Row>
                <div className="col-md-12">
                    {this.state.productsFromApi.map((data: any) => (
                        <Row>
                            <div className="bg-primary p-3">
                                {data.map((data) => (
                                    <div className="bg-success">
                                        {data.productName}
                                    </div>
                                ))}
                                <button>Cancle</button>
                            </div>
                        </Row>
                    ))}
                </div>
            </>
        );
    }
}
export default Profile;

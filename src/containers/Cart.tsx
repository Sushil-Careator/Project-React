import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { CartType } from "../types";

type Props = {
    cartData: any;
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
    render() {
        const data = this.props.cartData.cart;
        console.log(data);
        return (
            <div>
                <h1>Cart</h1>
                <p>
                    {data.map((data: any) => (
                        <p>{data.productId}</p>
                    ))}
                </p>
            </div>
        );
    }
}

const mapStoreToProps = (store: CartType) => {
    return {
        cartData: store,
    };
};

export default connect(mapStoreToProps, null)(Cart);

import React from "react";
import { connect, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ErrorBoundary from "../components/ErrorBoundary";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { StoreType } from "../types";

type Props = {
    selectedCurrency: string;
} & RouteComponentProps;

class ProductDetail extends React.Component<Props> {
    state = {
        // itemdata: {},
        productId: null,
        productImage: "",
        productName: "",
        productPrice: null,
        productSalePrice: null,
        productStock: null,
    };

    overLine = {
        textDecoration: "line-through",
        color: "red",
    };
    async componentDidMount() {
        try {
            const params: any = this.props.match.params;
            const { data } = await ProductService.getProductById(params.id);
            this.setState({ productId: data.productId });
            this.setState({ productImage: data.productImage });
            this.setState({ productName: data.productName });
            this.setState({ productPrice: data.productPrice });
            this.setState({ productSalePrice: data.productSalePrice });
            this.setState({ productStock: data.productStock });

            console.log("success", data);
        } catch (e) {
            console.log("error", e);
        }
    }
    render() {
        return (
            <ErrorBoundary>
                <Row>
                    <Column size={12}>
                        <h1>Product Detail</h1>
                    </Column>
                </Row>

                <div>
                    <div>
                        <img src={this.state.productImage} alt="" />
                    </div>
                    <div>
                        <h1>{this.state.productName.toLocaleUpperCase()}</h1>
                        {this.state.productPrice !==
                        this.state.productSalePrice ? (
                            <h3 style={this.overLine}>
                                Old Price {this.props.selectedCurrency}{" "}
                                {this.state.productPrice}
                            </h3>
                        ) : null}
                        <h3>
                            Price {this.props.selectedCurrency}{" "}
                            {this.state.productSalePrice}
                        </h3>
                        <h4>Stock Left {this.state.productStock}</h4>
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

const mapStoreToProps = (store: StoreType) => {
    return {
        selectedCurrency: store.currency, // undefined => INR => USD
    };
};
export default connect(mapStoreToProps, null)(ProductDetail);

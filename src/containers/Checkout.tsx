import React, { RefObject, SyntheticEvent } from "react";

type Props = {};
type State = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    zip: number;
    firstName1: string;
    lastName1: string;
    mobile1: string;
    address1: string;
    address21: string;
    country1: string;
    state1: string;
    zip1: number;
};
class Checkout extends React.Component<Props, State> {
    emailRef: RefObject<HTMLInputElement>;
    state: State = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        address2: "",
        country: "",
        state: "",
        zip: 0,
        firstName1: "",
        lastName1: "",
        mobile1: "",
        address1: "",
        address21: "",
        country1: "",
        state1: "",
        zip1: 0,
    };
    constructor(props: any) {
        super(props);
        this.emailRef = React.createRef<HTMLInputElement>();
    }

    validate = () => {};

    blur = (e: any) => {
        if (e.target.value === "") {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "green";
        }
    };

    checkboxclick = (e: any) => {
        if (e.target.checked === true) {
            this.setState({
                firstName1: this.state.firstName,
                lastName1: this.state.lastName,
                mobile1: this.state.mobile,
                address1: this.state.address,
                address21: this.state.address2,
                country1: this.state.country,
                state1: this.state.state,
                zip1: this.state.zip,
            });
        } else {
            this.setState({
                firstName1: "",
                lastName1: "",
                mobile1: "",
                address1: "",
                address21: "",
                country1: "",
                state1: "",
            });
        }
    };

    formSubmitting = (e: any) => {
        e.preventDefault();
        let emailValid = this.emailValidate();
        let mobileValid = this.mobileValidate();
        if (emailValid === true && mobileValid === true) {
            alert("form Submited");
        } else {
            alert("Invalid Form");
        }
    };

    emailValidate = () => {
        let validRegex: any =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.state.email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    };

    mobileValidate = () => {
        let phoneno = /^\d{10}$/;
        if (
            this.state.mobile.match(phoneno) &&
            this.state.mobile1.match(phoneno)
        ) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        return (
            <>
                <h1 id="heading1">Checkout Page</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <form
                                className="needs-validation"
                                id="form2"
                                onSubmit={this.formSubmitting}
                                // novalidate
                            >
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>
                                            First name
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="Joe"
                                                value={this.state.firstName}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        firstName:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>
                                            Last name{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Roy"
                                                value={this.state.lastName}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        lastName:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Email{" "}
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            placeholder="you@example.com"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    email: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Mobile{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mobile"
                                            name="mobile"
                                            value={this.state.mobile}
                                            placeholder="00000-00000"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    mobile: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Address{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={this.state.address}
                                            placeholder="1234 Main St"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    address: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Address 2
                                        <span className="text-muted">
                                            (Optional)
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address2"
                                            name="address2"
                                            value={this.state.address2}
                                            placeholder="Apartment or suite"
                                            onChange={(e: any) => {
                                                this.setState({
                                                    address2: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label>
                                            Country{" "}
                                            <select
                                                className="custom-select d-block w-100"
                                                id="country"
                                                name="country"
                                                value={this.state.country}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        country: e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            >
                                                <option value="">
                                                    Choose...
                                                </option>
                                                <option value="india">
                                                    India
                                                </option>
                                                <option value="UnitedStates">
                                                    United States
                                                </option>
                                                <option value="russia">
                                                    Russia
                                                </option>
                                                <option value="nepal">
                                                    Nepal
                                                </option>
                                                <option value="sriLanka">
                                                    Sri Lanka
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>
                                            State
                                            <select
                                                className="custom-select d-block w-100"
                                                id="state"
                                                name="state"
                                                value={this.state.state}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        state: e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            >
                                                <option value="">
                                                    Choose...
                                                </option>
                                                <option value="karnatka">
                                                    Karnatka
                                                </option>
                                                <option value="delhi">
                                                    Delhi
                                                </option>
                                                <option value="bihar">
                                                    Bihar
                                                </option>
                                                <option value="kerla">
                                                    Kerla
                                                </option>
                                                <option value="westBengal">
                                                    West Bengal
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>
                                            Zip{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="zip"
                                                name="zip"
                                                value={this.state.zip}
                                                placeholder="000-000"
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        zip: e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="same-address"
                                        onChange={this.checkboxclick}
                                    />
                                    <label className="custom-control-label">
                                        Shipping address is the same as my
                                        billing address
                                    </label>
                                </div>
                                <hr className="mb-4" />
                                <h4 className="mb-3">Shopping address</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>
                                            First name{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName1"
                                                name="firstName1"
                                                placeholder="Joe"
                                                value={this.state.firstName1}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        firstName1:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>
                                            Last name{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName1"
                                                name="lastName1"
                                                placeholder="Roy"
                                                value={this.state.lastName1}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        lastName1:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Mobile{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mobile1"
                                            name="mobile1"
                                            value={this.state.mobile1}
                                            placeholder="00000-00000"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    mobile1: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Address{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address1"
                                            name="address1"
                                            value={this.state.address1}
                                            placeholder="1234 Main St"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    address1: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>
                                        Address 2
                                        <span className="text-muted">
                                            (Optional)
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address21"
                                            name="address21"
                                            value={this.state.address21}
                                            placeholder="Apartment or suite"
                                            onChange={(e: any) => {
                                                this.setState({
                                                    address21: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                </div>

                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label>
                                            Country{" "}
                                            <select
                                                className="custom-select d-block w-100"
                                                id="country1"
                                                name="country1"
                                                value={this.state.country1}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        country1:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            >
                                                <option value="">
                                                    Choose...
                                                </option>
                                                <option value="india">
                                                    India
                                                </option>
                                                <option value="UnitedStates">
                                                    United States
                                                </option>
                                                <option value="russia">
                                                    Russia
                                                </option>
                                                <option value="nepal">
                                                    Nepal
                                                </option>
                                                <option value="sriLanka">
                                                    Sri Lanka
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>
                                            State{" "}
                                            <select
                                                className="custom-select d-block w-100"
                                                id="state1"
                                                name="state1"
                                                value={this.state.state1}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        state1: e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            >
                                                <option value="">
                                                    Choose...
                                                </option>
                                                <option value="karnatka">
                                                    Karnatka
                                                </option>
                                                <option value="delhi">
                                                    Delhi
                                                </option>
                                                <option value="bihar">
                                                    Bihar
                                                </option>
                                                <option value="kerla">
                                                    Kerla
                                                </option>
                                                <option value="westBengal">
                                                    West Bengal
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>
                                            Zip{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="zip1"
                                                name="zip1"
                                                value={this.state.zip1}
                                                placeholder="000-000"
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        zip1: e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <div className="col-md-4 order-md-2 mb-4 before_order">
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted">
                                            Your cart
                                        </span>
                                        <span className="badge badge-secondary badge-pill">
                                            3
                                        </span>
                                    </h4>
                                    <ul className="list-group mb-3">
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">
                                                    Product name
                                                </h6>
                                                <small className="text-muted">
                                                    Brief description
                                                </small>
                                            </div>
                                            <span className="text-muted">
                                                Rs 1000
                                            </span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">
                                                    Second product
                                                </h6>
                                                <small className="text-muted">
                                                    Brief description
                                                </small>
                                            </div>
                                            <span className="text-muted">
                                                Rs 500
                                            </span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">
                                                    Third item
                                                </h6>
                                                <small className="text-muted">
                                                    Brief description
                                                </small>
                                            </div>
                                            <span className="text-muted">
                                                Rs 700
                                            </span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between bg-light">
                                            <div className="text-success">
                                                <h6 className="my-0">
                                                    Promo code
                                                </h6>
                                                <small>EXAMPLECODE</small>
                                            </div>
                                            <span className="text-success">
                                                Rs -200
                                            </span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total (Rupee)</span>
                                            <strong>Rs 2000</strong>
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    id="btn"
                                    onSubmit={this.formSubmitting}
                                >
                                    Continue to checkout
                                </button>
                            </form>
                        </div>
                        <div className="col-md-4 order-md-2 mb-4 after_order">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                <span className="badge badge-secondary badge-pill">
                                    3
                                </span>
                            </h4>
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Product name</h6>
                                        <small className="text-muted">
                                            Brief description
                                        </small>
                                    </div>
                                    <span className="text-muted">Rs 1000</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Second product</h6>
                                        <small className="text-muted">
                                            Brief description
                                        </small>
                                    </div>
                                    <span className="text-muted">Rs 500</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Third item</h6>
                                        <small className="text-muted">
                                            Brief description
                                        </small>
                                    </div>
                                    <span className="text-muted">Rs 700</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <div className="text-success">
                                        <h6 className="my-0">Promo code</h6>
                                        <small>EXAMPLECODE</small>
                                    </div>
                                    <span className="text-success">
                                        Rs -200
                                    </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (Rupee)</span>
                                    <strong>Rs 2000</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Checkout;

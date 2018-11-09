import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Table, 
    Col, 
    Button, 
    ButtonToolbar, 
    Modal, 
    FormGroup, 
    ControlLabel, 
    HelpBlock, 
    FormControl 
} from "react-bootstrap/lib/"
import axios from 'axios'
import * as actionTypes from '../../store/actions'
import Refresh from 'react-icons/lib/md/autorenew'



class Inventory extends Component {
    state = {
        products: this.props.products,
        showModal: false,
        productToUpdate: null,
        preEditProductName: null,
        preEditDescription: null,
        preEditQuantity: null,
        
    }

    showAllProducts = () => {
        this.setState({
            products: this.props.products,
            
        })
    }
    

    deleteProduct = (productID, index) => {
        const newProducts = [...this.props.products]
        newProducts.splice(index, 1)
        this.props.updateProducts(newProducts)
        
    }

    updateProduct = (product_name, description, price, quantity) => {
        console.log("Current Product ID: " + this.state.productToUpdate)
        console.log(product_name, description, price, quantity)

        let updatedProduct = {
            category_id: 15,
            product_name: product_name,
            price: price,
            description: description,
            quantity: quantity,
            photo: "photo"
        }

        console.log("updatedProduct: " + updatedProduct)

        axios({
            method: 'patch',
            url: 'https://ancient-reef-75174.herokuapp.com/products/' + this.state.productToUpdate,
            data: updatedProduct,
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                console.log(response)
                axios({
                    method: 'get',
                    url: 'https://ancient-reef-75174.herokuapp.com/products/',
                    headers: { 'Authorization': this.props.token }
                })
                    .then((response) => {
                        console.log(response.data)
                        let newProductsArr = response.data
                        this.props.updateProducts(newProductsArr)
                        this.setState({ showModal: false })
                    })
            })
    }

    render() {

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} onChange={props.change} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            )
        }

        const sortKeys = (a, b) => { return a.id - b.id }

        const products = this.props.products.sort(sortKeys).map((product, index) => {
            return <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.category_id}</td>
                <td><Button bsSize="small" bsStyle="info" onClick={() => {
                    this.setState({ 
                        showModal: true, 
                        productToUpdate: product.id,
                        preEditProductName: product.product_name,
                        preEditDescription: product.description,
                        preEditPrice: product.price,
                        preEditQuantity: product.quantity
                    })}} key={product.id}>Edit</Button></td>
                <td><Button bsSize="small" bsStyle="danger" onClick={() => {
                    this.deleteProduct(product.id, index)
                    // this.props.onDeleteProduct(product.id)
                }}>Delete</Button></td>
            </tr>
        })

        
        
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        products: state.auth.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteProduct: (productID) => dispatch(actionTypes.deleteProduct(productID)),
        updateProducts: (products) => dispatch(actionTypes.editProduct(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)

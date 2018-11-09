import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonToolbar } from 'react-bootstrap/lib/'
import * as actionTypes from '../store/actions'
import LoginContainer from './LoginContainer/LoginContainer'
import CreateAccountContainer from './CreateAccountContainer/CreateAccountContainer'
import AddToStockButtons from './AddToStockContainer/AddToStockContainer'
import Inventory from './Inventory/Inventory'

class Container extends Component {

    state = {
        showAddToStock: false,
        showInventory: false,
    }

    showAddToStock = () => {
        this.setState({
            showAddToStock: true,
            showInventory: false,
            showCreateProduct: false,

        })
    }

    showInventory = () => {
        this.setState({
            showAddToStock: false,
            showInventory: true,
        })
    }



    render() {
        return ( 
            <div className='container'>
                {this.props.showLogin ? <LoginContainer /> : null}
                {this.props.showCreateAccount ? <CreateAccountContainer /> : null}
                {this.props.isAuthed ?
                <div>
                    <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                        <Button bsStyle="danger" bsSize="large" onClick={this.showAddToStock}>
                            Add to Stock
                        </Button>
                        <Button bsStyle="info" bsSize="large" onClick={this.showInventory}>
                            View Inventory
                        </Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.showCreateProduct}>
                            Create New Product
                        </Button>
                    </ButtonToolbar>
                    {this.props.showContainers ? 
                    <div>
                        {this.state.showAddToStock ? <AddToStockButtons /> : null}
                        {this.state.showInventory ? <Inventory /> : null}
                        {this.state.showCreateProduct ? <CreateProduct /> : null}
                    </div>
                    : null}
                </div>
                : null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        showLogin: state.main.showLogin,
        showCreateAccount: state.main.showCreateAccount,
        showContainers: state.auth.showContainers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
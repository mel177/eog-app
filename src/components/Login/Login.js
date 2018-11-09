import React from 'react'
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from "react-bootstrap/lib/"

const login = (props) => {

    function FieldGroup({ id, label, help, ...props }) {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} onChange={props.change} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        )
    }
    return <div className="container" style={{ textAlign: "left" }}>
        <Col md={2} />
        <Col md={8}>
            <form>
                <FieldGroup id="formControlsUsername" type="text" label="Username" inputRef={(ref) => { this.username = ref }} />
                <FieldGroup id="formControlsPassword" type="password" label="Password" inputRef={(ref) => { this.password = ref }} />
                <Button type="button" bsStyle="success" onClick={() => {
                    props.login(this.username.value, this.password.value)
                }}>
                    Login
                </Button>
            </form>
            <br />
            <br />
        </Col>
        <Col md={2} />
    </div>
};

export default login
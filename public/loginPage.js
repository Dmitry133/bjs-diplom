"use strict";

//login

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        //console.log(response);
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error)
        };
    });
};

//register

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error)
        };
    });
};
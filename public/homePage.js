"use strict";

//logout

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        };
    });
};

//User profile widget

ApiConnector.current(response => {
    //console.log(response);
    if (response.success === true) {
        //console.log(response.data.login)
        ProfileWidget.showProfile(response.data);
    };
});

//Exchange Rates (не работает корректно)

const ratesBoard = new RatesBoard();

let count = 0;
const exchangeRates = () => {
    ApiConnector.getStocks(response => {
        //console.log(response);
       if (response.success === true) {
           ratesBoard.clearTable();
           ratesBoard.fillTable(response.data);
           
           count++;
           console.log(count);
       // вот тут выкидывает ошибку спустя некоторое время , но все работает ???
       //    ошибка (A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received)
       } ;
    });

    console.log("я обновился");
};

setInterval(exchangeRates(), 1000); // ???? понять почему не вызывает постоянно????






var AutoDealer = AutoDealer || {};

AutoDealer.auto_agreement_ribbon = (function () {

    let errorDescription = "";

    const errorAlert = () => {

        let alertStrings = { 
            confirmButtonLabel: "Ok", 
            text: errorDescription,
            title: "Внимание" 
        };

        let alertOptions = { 
            height: 120, 
            width: 260 
        };

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }

    return {
        recalculateCredit: function(primaryControl) {
            let formContext = primaryControl;

            let summa = formContext.getAttribute("auto_summa").getValue();

            if (summa == null) {
                errorDescription = "Не указана сумма. Расчет кредита невозможен.";
                errorAlert();
                return;
            }

            let creditidList = formContext.getAttribute("auto_creditid").getValue();
            
            if (creditidList == null || creditidList.length === 0) {
                errorDescription = "Не указана кредитная программа. Расчет кредита невозможен.";
                errorAlert();
                return;
            }
            
            let creditPeriod = formContext.getAttribute("auto_creditperiod").getValue();

            if (creditPeriod == null) {
                errorDescription = "Не указан срок кредита. Расчет кредита невозможен.";
                errorAlert();
                return;
            }
            
            let initialFee = formContext.getAttribute("auto_initialfee").getValue();

            if (initialFee == null) {

                initialFee = 0;
                formContext.getAttribute("auto_initialfee").setValue(initialFee);
            }

            let creditAmount = summa - initialFee;
            formContext.getAttribute("auto_creditamount").setValue(creditAmount);
            
            Xrm.WebApi
                .retrieveRecord("auto_credit", creditidList[0].id, "?$select=auto_percent")
                .then(
                    function (credit) {

                        let fullCreditAmount = creditAmount + credit.auto_percent * creditPeriod * creditAmount / 100;
                        formContext.getAttribute("auto_fullcreditamount").setValue(fullCreditAmount);
                    },
                    function (error) {
                        console.error(error.message);
                    }
                );
        }
    };
})();
var AutoDealer = AutoDealer || {};

AutoDealer.auto_agreement = (function () {

    let errorDescription = "";

    const cancelSaving = context => {
        context.getEventArgs().preventDefault();
        errorAlert();
    }

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

    const hideCreditidTab = formContext => {
        let creditTab = formContext.ui.tabs.get("credittab");
        creditTab.setVisible(false);
        
        formContext.getAttribute("auto_creditperiod").setValue(null);
        formContext.getAttribute("auto_creditamount").setValue(null);
        formContext.getAttribute("auto_fullcreditamount").setValue(null);
        formContext.getAttribute("auto_initialfee").setValue(null);
    }

    const setCreditidVisible = formContext => {
        let autoid = formContext.getAttribute("auto_autoid").getValue();
        let contact = formContext.getAttribute("auto_contact").getValue();

        let creditidAttribute = formContext.getAttribute("auto_creditid");

        if (autoid != null && autoid.length > 0 &&
            contact != null && contact.length > 0) {

            creditidAttribute.controls.forEach(control => {
                control.setVisible(true);
            });

        } 
        else {

            creditidAttribute.controls.forEach(control => {
                control.setVisible(false);
            });

            creditidAttribute.setValue(null);
            hideCreditidTab(formContext);
        }
    }
    
    const checkCreditTimingMismatch = formContext => {

        let creditidList = formContext.getAttribute("auto_creditid").getValue();
        let date = formContext.getAttribute("auto_date").getValue();

        if (creditidList != null && 
            creditidList.length > 0 &&
            date != null){

            Xrm.WebApi
                .retrieveRecord("auto_credit", creditidList[0].id, "?$select=auto_datestart,auto_dateend")
                .then(
                    function(credit) {

                        if (date < new Date(credit.auto_datestart) ||
                            date > new Date(credit.auto_dateend)) {
                            
                            errorDescription = "Выбранная программа кредитования не действует для указанной даты договора. Сохранение не возможно.";
                            errorAlert();
                            formContext.data.entity.addOnSave(cancelSaving);
                        }
                        else {

                            formContext.data.entity.removeOnSave(cancelSaving);
                        }
                    }, 
                    function (error) {
                        console.error(error.message);
                    }
                );
        }
    }

    const handleNameChange = context => {
        let formContext = context.getFormContext();
        let nameAttribute = formContext.getAttribute("auto_name");
        let name = nameAttribute.getValue();

        if (name != null) {
            nameAttribute.setValue(nameAttribute.getValue().replace(/[^1-9-]/gi, ''));
        }        
    }

    const handleAutoidChange = context => {
        let formContext = context.getFormContext();
        setCreditidVisible(formContext);

        let autoid = formContext.getAttribute("auto_autoid").getValue();

        let summaAttribute = formContext.getAttribute("auto_summa");
        summaAttribute.controls.forEach(control => {
            control.setVisible(autoid != null && autoid.length > 0);
        });

        if (autoid != null && autoid.length > 0) {

            Xrm.WebApi
                .retrieveRecord(
                    "auto_auto", 
                    autoid[0].id, 
                    "?$select=auto_used,auto_amount&$expand=auto_modelid($select=auto_recommendedamount)")
                .then(
                    function(auto) {

                        if (auto.auto_used) {

                            summaAttribute.setValue(auto.auto_amount);
                        }
                        else {

                            summaAttribute.setValue(auto.auto_modelid.auto_recommendedamount);    
                        }
                    }, 
                    function(error) {
                        console.error(error.message);
                    }
                );
        }
        else {

            summaAttribute.setValue(null);
        }
    }

    const handleContactChange = context => {
        let formContext = context.getFormContext();
        setCreditidVisible(formContext); 
    }

    const handleCreditidChange = context => {
        let formContext = context.getFormContext();
     
        checkCreditTimingMismatch(formContext);

        let creditidList = formContext.getAttribute("auto_creditid").getValue();   

        if (creditidList != null && creditidList.length > 0) {

            let creditTab = formContext.ui.tabs.get("credittab");
            creditTab.setVisible(true);

            Xrm.WebApi
                .retrieveRecord("auto_credit", creditidList[0].id, "?$select=auto_creditperiod")
                .then(
                    function(credit) {
                        
                        if (credit.auto_creditperiod != null){
                            formContext
                                .getAttribute("auto_creditperiod")
                                .setValue(credit.auto_creditperiod);
                        }
                    }, 
                    function(error) {
                        console.error(error.message);
                    }
                );
        }
        else {
            hideCreditidTab(formContext);
        }
    }

    const handleDateChange = (context) => {
        let formContext = context.getFormContext();
        checkCreditTimingMismatch(formContext);
    }

    return {
        onLoad: function(context){
            let formContext = context.getFormContext();                
            
            let autoid = formContext.getAttribute("auto_autoid").getValue();
            let summaAttribute = formContext.getAttribute("auto_summa");
            summaAttribute.controls.forEach(control => {
                control.setVisible(autoid != null && autoid.length > 0);
            });
            
            let factAttribute = formContext.getAttribute("auto_fact");
            factAttribute.controls.forEach(control => {
                control.setVisible(false);
            });
                      
            let owneridAttribute = formContext.getAttribute("ownerid");
            owneridAttribute.controls.forEach(control => {
                control.setVisible(false);
            });
    
            let creditidAttribute = formContext.getAttribute("auto_creditid");
            if (creditidAttribute.getValue() == null) {

                creditidAttribute.controls.forEach(control => {
                    control.setVisible(false);
                });  
                hideCreditidTab(formContext);
            }
            
            formContext.getAttribute("auto_name").addOnChange(handleNameChange);
            formContext.getAttribute("auto_autoid").addOnChange(handleAutoidChange);
            formContext.getAttribute("auto_contact").addOnChange(handleContactChange);
            formContext.getAttribute("auto_creditid").addOnChange(handleCreditidChange);
            formContext.getAttribute("auto_date").addOnChange(handleDateChange);
        }
    };
})();
var AutoDealer = AutoDealer || {};

AutoDealer.auto_agreement = (function () {

    const hideFields = formContext => {        
        let summaAttribute = formContext.getAttribute("auto_summa");
        summaAttribute.controls.forEach(control => {
            control.setVisible(false);
        });
        
        let factAttribute = formContext.getAttribute("auto_fact");
        factAttribute.controls.forEach(control => {
            control.setVisible(false);
        });

        let creditidAttribute = formContext.getAttribute("auto_creditid");
        creditidAttribute.controls.forEach(control => {
            control.setVisible(false);
        });  
                    
        let owneridAttribute = formContext.getAttribute("ownerid");
        owneridAttribute.controls.forEach(control => {
            control.setVisible(false);
        });
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

        if (autoid != null && contact != null) {

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

    const handleNameChange = context => {
        let formContext = context.getFormContext();
        let nameAttribute = formContext.getAttribute("auto_name");
        nameAttribute.setValue(nameAttribute.getValue().replace(/[^1-9-]/gi, ''));
    }

    const handleAutoidChange = context => {
        let formContext = context.getFormContext();
        setCreditidVisible(formContext);
    }

    const handleContactChange = context => {
        let formContext = context.getFormContext();
        setCreditidVisible(formContext); 
    }

    const handleCreditidChange = context => {
        let formContext = context.getFormContext();

        let creditid = formContext.getAttribute("auto_creditid").getValue();

        let creditTab = formContext.ui.tabs.get("credittab");
        creditTab.setVisible(creditid != null);
    }

    return {
        onLoad: function(context){
            let formContext = context.getFormContext();
                
            hideCreditidTab(formContext);
            hideFields(formContext);
            
            formContext.getAttribute("auto_name").addOnChange(handleNameChange);
            formContext.getAttribute("auto_autoid").addOnChange(handleAutoidChange);
            formContext.getAttribute("auto_contact").addOnChange(handleContactChange);
            formContext.getAttribute("auto_creditid").addOnChange(handleCreditidChange);
        }
    };
})();
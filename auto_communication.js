var AutoDealer = AutoDealer || {};

AutoDealer.auto_communication = (function () {

    const CommunicationType = {
        Email: 635410001,
        Phone: 635410000
    };    

    const handleTypeChange = (context) => {
        let formContext = context.getFormContext();

        let type = formContext.getAttribute("auto_type").getValue();

        let emailAttribute = formContext.getAttribute("auto_email");
        let phoneAttribute = formContext.getAttribute("auto_phone");

        if (type === CommunicationType.Email) {

            emailAttribute.controls.forEach(control => {
                control.setVisible(true);
            });

            phoneAttribute.controls.forEach(control => {
                control.setVisible(false);
            });
            phoneAttribute.setValue(null);
        }
        else if (type === CommunicationType.Phone) {

            emailAttribute.controls.forEach(control => {
                control.setVisible(false);
            });
            emailAttribute.setValue(null);

            phoneAttribute.controls.forEach(control => {
                control.setVisible(true);
            });
        }
        else {

            emailAttribute.controls.forEach(control => {
                control.setVisible(false);
            });
            emailAttribute.setValue(null);

            phoneAttribute.controls.forEach(control => {
                control.setVisible(false);
            });
            phoneAttribute.setValue(null);
        }
    }

    return {
        onLoad: function(context){
            let formContext = context.getFormContext();
            
            let typeAttribute = formContext.getAttribute("auto_type");
            let type = typeAttribute.getValue();

            let emailAttribute = formContext.getAttribute("auto_email");
            let phoneAttribute = formContext.getAttribute("auto_phone");

            if (type === CommunicationType.Email) {

                emailAttribute.controls.forEach(control => {
                    control.setVisible(true);
                });

                phoneAttribute.controls.forEach(control => {
                    control.setVisible(false);
                });
            }
            else if (type === CommunicationType.Phone) {

                emailAttribute.controls.forEach(control => {
                    control.setVisible(false);
                });

                phoneAttribute.controls.forEach(control => {
                    control.setVisible(true);
                });
            }
            else {

                emailAttribute.controls.forEach(control => {
                    control.setVisible(false);
                });

                phoneAttribute.controls.forEach(control => {
                    control.setVisible(false);
                });
            }

            typeAttribute.addOnChange(handleTypeChange);            
        }
    };
})();
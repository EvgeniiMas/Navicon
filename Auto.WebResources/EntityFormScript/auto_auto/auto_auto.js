var AutoDealer = AutoDealer || {};

AutoDealer.auto_auto = (function () {

    const handleIsUsedChanged = (context) => {
        let formContext = context.getFormContext();

        let kmAttribute = formContext.getAttribute("auto_km");
        let ownersCountAttribute = formContext.getAttribute("auto_ownerscount");
        let isDamagedAttribute = formContext.getAttribute("auto_isdamaged");

        let isUsed = formContext.getAttribute("auto_used").getValue();

        kmAttribute.controls.forEach(control => {
            control.setVisible(isUsed);
        });
        
        ownersCountAttribute.controls.forEach(control => {
            control.setVisible(isUsed);
        });
                        
        isDamagedAttribute.controls.forEach(control => {
            control.setVisible(isUsed);
        });

        if (!isUsed) {
            kmAttribute.setValue(null);
            ownersCountAttribute.setValue(null);
            isDamagedAttribute.setValue(false);
        }
    }

    return {
        onLoad: function(context){
            let formContext = context.getFormContext();
            
            let isUsedAttribute = formContext.getAttribute("auto_used");
            let isUsed = isUsedAttribute.getValue();

            if (!isUsed) {

                formContext.getAttribute("auto_km").controls.forEach(control => {
                    control.setVisible(false);
                });
             
                formContext.getAttribute("auto_ownerscount").controls.forEach(control => {
                    control.setVisible(false);
                });
                             
                formContext.getAttribute("auto_isdamaged").controls.forEach(control => {
                    control.setVisible(false);
                });
            }

            isUsedAttribute.addOnChange(handleIsUsedChanged);
        }
    };
})();
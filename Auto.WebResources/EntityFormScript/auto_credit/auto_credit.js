var AutoDealer = AutoDealer || {};

AutoDealer.auto_credit = (function () {

    const cancelSaving = (context) => {
        context.getEventArgs().preventDefault();
        dateDefinitionErrorAlert();
    }

    const dateDefinitionErrorAlert = () => {

        let alertStrings = { 
            confirmButtonLabel: "Ok", 
            text: "Дата начала позже даты окончания кредитной программы. Сохранение невозможно.", 
            title: "Внимание" 
        };

        let alertOptions = { 
            height: 120, 
            width: 260 
        };

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }

    const handleDatesChange = context => {
        let formContext = context.getFormContext();
        
        let dateStart = formContext.getAttribute("auto_datestart").getValue();
        let dateEnd = formContext.getAttribute("auto_dateend").getValue();
        
        if (dateEnd == null ||
            dateStart == null ||
            dateEnd > dateStart) {
            
            formContext.data.entity.removeOnSave(cancelSaving);
        }
        else {
            formContext.data.entity.addOnSave(cancelSaving);
            dateDefinitionErrorAlert();
        }
    }

    return {
        onLoad: function(context){
            let formContext = context.getFormContext();
                
            formContext.getAttribute("auto_datestart").addOnChange(handleDatesChange);
            formContext.getAttribute("auto_dateend").addOnChange(handleDatesChange);
        }
    };
})();
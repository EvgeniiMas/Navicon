var AutoDealer = AutoDealer || {};

AutoDealer.auto_brand_grid = (function () {

    const columnDefs = [
        { 
            headerName: 'Кредитная программа', 
            field: "creditName", 
            editable: false,
            cellClass: 'link-cell'
        },
        { 
            headerName: "Модель", 
            field: "modelName", 
            editable: false,
            cellClass: 'link-cell'
        },
        { 
            headerName: "Срок кредита", 
            field: "crediPeriod", 
            editable: false 
        }
    ];
    
    const localeText = {
        page: 'Страница',
        more: 'ещё',
        to: 'к',
        of: 'из',
        next: 'Следующая',
        last: 'Последняя',
        first: 'Первая',
        previous: 'Предыдущая',
        loadingOoo: 'Загрузка...',
    
        selectAll: 'Выделить всё',
        searchOoo: 'Поиск...',
        blanks: 'Ничего не найдено',
    
        filterOoo: 'Фильтровать...',
        applyFilter: 'Применить фильтр...',
        equals: 'Равно',
        notEqual: 'Не равно',
    
        lessThan: 'Меньше чем',
        greaterThan: 'Больше чем',
        lessThanOrEqual: 'Меньше или равно',
        greaterThanOrEqual: 'Больше или равно',
        inRange: 'В промежутке',
    
        contains: 'Содержит',
        notContains: 'Не содержит',
        startsWith: 'Начинается с',
        endsWith: 'Заканчивается',
    
        andCondition: '"И"',
        orCondition: '"ИЛИ"',
        group: 'Группа',
    
        columns: 'Столбцы',
        filters: 'Фильтры',
        rowGroupColumns: 'Столбцы группировки по строкам',
        rowGroupColumnsEmptyMessage: 'Перетащите сюда для группировки по строкам',
        valueColumns: 'Столбцы со значениями',
        pivotMode: 'Режим сводной таблицы',
        groups: 'Группы',
        values: 'Значения',
        pivots: 'Заголовки столбцов',
        valueColumnsEmptyMessage: 'Перетащите сюда для агрегации',
        pivotColumnsEmptyMessage: 'Перетащите сюда, чтобы задать заголовки столбам',
        toolPanelButton: 'Панель инструментов',
    
        noRowsToShow: 'Нет данных',
    
        pinColumn: 'Закрепить колонку',
        valueAggregation: 'Агрегация по значению',
        autosizeThiscolumn: 'Автоматически задавать размер этой колонки',
        autosizeAllColumns: 'Автоматически задавать размер всем колонкам',
        groupBy: 'Группировать по',
        ungroupBy: 'Разгруппировать по',
        resetColumns: 'Сбросить столбцы',
        expandAll: 'Развернуть всё',
        collapseAll: 'Свернуть всё',
        toolPanel: 'Панель инструментов',
        export: 'Экспорт',
        csvExport: 'Экспорт в CSV',
        excelExport: 'Экспорт в Excel (.xlsx)',
        excelXmlExport: 'Экспорт в XML (.xml)',
    
        pinLeft: 'Закрепить слева <<',
        pinRight: 'Закрепить справа >>',
        noPin: 'Не закреплять <>',
    
        sum: 'Сумма',
        min: 'Минимум',
        max: 'Максимум',
        none: 'Пусто',
        count: 'Количество',
        average: 'Среднее значение',
        filteredRows: 'Отфильтрованные',
        selectedRows: 'Выделенные',
        totalRows: 'Всего строк',
        totalAndFilteredRows: 'Строк',
    
        copy: 'Копировать',
        copyWithHeaders: 'Копировать с заголовком',
        ctrlC: 'Ctrl+C',
        paste: 'Вставить',
        ctrlV: 'Ctrl+V'
    };
      
    const handleCellDoubleClick = (params) => {
        var entityFormOptions = {
            openInNewWindow: true,
            height: 700,
            width: 1000
        };

        if (params.column.colId === "creditName") {

            entityFormOptions["entityName"] = "auto_credit";
            entityFormOptions["entityId"] = params.data.creditId;
        }
        else if (params.column.colId === "modelName") {
             
            entityFormOptions["entityName"] = "auto_model";
            entityFormOptions["entityId"] = params.data.modelId;
        };   

        if (entityFormOptions.entityId != null &&
            entityFormOptions.entityName != null) {

            Xrm.Navigation.openForm(entityFormOptions);
        }
    }

    const gridOptions = {
        columnDefs: columnDefs,
        localeText: localeText,
        defaultColDef: {
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        },
        animateRows: true,
        onCellDoubleClicked: handleCellDoubleClick
    };    

    return {
        init: function() {
            let brandId = parent.Xrm.Page.data.entity.getId();

            if (brandId == null) {
                console.log("Не передан идентификатор марки");
                return;
            }

            const gridDiv = document.querySelector('#model_credit_grid');
            new agGrid.Grid(gridDiv, gridOptions);

            let fetchXml = 
                `?fetchXml=

                <fetch top="50">
                    <entity name="auto_auto">
                        <link-entity name="auto_model" from="auto_modelid" to="auto_modelid" alias="model">
                            <attribute name="auto_modelid" />
                            <attribute name="auto_name" />
                        </link-entity>
                        <link-entity name="auto_auto_credit_auto_auto" from="auto_autoid" to="auto_autoid" alias="autocredit" intersect="true">
                            <link-entity name="auto_credit" from="auto_creditid" to="auto_creditid" alias="credit" intersect="true">
                                <attribute name="auto_creditid" />
                                <attribute name="auto_creditperiod" />
                                <attribute name="auto_name" />
                            </link-entity>
                        </link-entity>
                        <filter>
                            <condition attribute="auto_brandid" operator="eq" value="${brandId}" />
                        </filter>
                    </entity>
                </fetch>`;

            Xrm.WebApi
                .retrieveMultipleRecords("auto_auto", fetchXml)
                .then(
                    function (result) {

                        let entities = result.entities
                            .map((element) => {
                                return {
                                    creditName: element['credit.auto_name'],
                                    creditId: element['credit.auto_creditid'],
                                    crediPeriod: element['credit.auto_creditperiod'],
                                    modelName: element['model.auto_name'],
                                    modelId: element['model.auto_modelid']
                                };
                            });
                        
                        gridOptions.api.setRowData(entities);
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
        }
    };
})();
  
document.onreadystatechange = () => {
    if (document.readyState === "complete") {

        AutoDealer.auto_brand_grid.init();        
    }
}

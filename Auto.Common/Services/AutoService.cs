using Auto.Common.Entities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auto.Common.Services
{
    /// <summary>
    /// Сервис для работы с сущностью "Авто"
    /// </summary>
    public sealed class AutoService
    {
        private readonly IOrganizationService _organizationService;
        private readonly ITracingService _tracingService;

        public AutoService(
            IOrganizationService organizationService,
            ITracingService tracingService
            )
        {
            _organizationService = organizationService ?? throw new ArgumentNullException(nameof(organizationService));
            _tracingService = tracingService ?? throw new ArgumentNullException(nameof(tracingService));
        }

        /// <summary>
        /// Обновить значения количества договоров для всех автомобилей
        /// </summary>
        public void UpdateAgreementCount()
        {
            var autos = GetAutos(new ColumnSet());

            foreach (var auto in autos)
            {
                var agreements = GetAgreementsByAuto(auto.Id, new ColumnSet());

                var updatableAuto = new auto_auto()
                {
                    Id = auto.Id,
                    auto_agreementCount = agreements.Count()
                };

                _organizationService.Update(updatableAuto);
            }
        }

        /// <summary>
        /// Получить список всех автомобилей
        /// </summary>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private IEnumerable<auto_auto> GetAutos(ColumnSet columnSet)
        {
            var autosQuery = new QueryExpression(auto_auto.EntityLogicalName);

            autosQuery.ColumnSet = columnSet;
            autosQuery.NoLock = true;
            autosQuery.TopCount = 1000;

            return _organizationService.RetrieveMultiple(autosQuery)
                .Entities
                .Select(e => e.ToEntity<auto_auto>());
        }

        /// <summary>
        /// Получить список договоров по автомобилю
        /// </summary>
        /// <param name="autoId">Идентификатор автомобиля</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private IEnumerable<auto_agreement> GetAgreementsByAuto(Guid autoId,  ColumnSet columnSet)
        {
            var agreementsQuery = new QueryExpression(auto_agreement.EntityLogicalName);

            agreementsQuery.ColumnSet = columnSet;
            agreementsQuery.NoLock = true;
            agreementsQuery.TopCount = 1000;

            agreementsQuery.Criteria.AddCondition("auto_autoid", ConditionOperator.Equal, autoId);

            return _organizationService.RetrieveMultiple(agreementsQuery)
                .Entities
                .Select(e => e.ToEntity<auto_agreement>());
        }
    }
}

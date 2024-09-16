using Auto.Common.Entities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auto.Common.Services
{
    /// <summary>
    /// Сервис для работы с объектом "Средство связи"
    /// </summary>
    public sealed class CommunicationService
    {
        private readonly IOrganizationService _organizationService;
        private readonly ITracingService _tracingService;

        public CommunicationService(
            IOrganizationService organizationService,
            ITracingService tracingService
            )
        {
            _organizationService = organizationService ?? throw new ArgumentNullException(nameof(organizationService));
            _tracingService = tracingService ?? throw new ArgumentNullException(nameof(tracingService));
        }

        /// <summary>
        /// Проверить присутствие у контакта основного средства связи того же типа, что и переданное
        /// </summary>
        /// <param name="communication">Средство связи</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public void CheckContactContainingMainCommunication(auto_communication communication)
        {
            if (communication == null)
                throw new ArgumentNullException(nameof(communication));

            auto_communication storedCommunication = null;
            
            var isMain = communication.auto_main;

            if (!isMain.HasValue)
            {
                if (storedCommunication == null)
                    storedCommunication = GetStoredCommunitation(communication.Id, new ColumnSet("auto_contactid", "auto_type", "auto_main"));
                
                isMain = storedCommunication?.auto_main;
            }

            if (!isMain.HasValue)
                throw new Exception("Не указано является ли средство связи основным или нет");

            if (!isMain.Value)
                return;

            var contactRef = communication.auto_contactid;

            if (contactRef == null)
            {
                if (storedCommunication == null)
                    storedCommunication = GetStoredCommunitation(communication.Id, new ColumnSet("auto_contactid", "auto_type", "auto_main"));

                contactRef = storedCommunication?.auto_contactid;
            }

            if (contactRef == null)
                throw new Exception("Не указан контакт у сущности \"Средство связи\"");

            var type = communication.auto_type;
            
            if (!type.HasValue)
            {
                if (storedCommunication == null)
                    storedCommunication = GetStoredCommunitation(communication.Id, new ColumnSet("auto_contactid", "auto_type", "auto_main"));

                type = storedCommunication?.auto_type;
            }

            if (!type.HasValue)
                throw new Exception("Не указан тип у сущности \"Средство связи\"");

            // есть ли среди средств связи (исключая переданное) контакта основные того же типа
            var isExistsMainCommunication = GetCommunicationsByContact(contactRef.Id, new ColumnSet("auto_type", "auto_main")) 
                .Where(c =>    
                    c.Id != communication.Id && 
                    c.auto_type == type &&
                    c.auto_main.HasValue && c.auto_main.Value
                )
                .Any();

            if (isExistsMainCommunication)
                throw new Exception("У контакта уже есть основное средство связи указанного типа");
        }

        /// <summary>
        /// Получить все средства связи контакта
        /// </summary>
        /// <param name="contactId">Идентификатор контакта</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private IEnumerable<auto_communication> GetCommunicationsByContact(Guid contactId, ColumnSet columnSet)
        {
            var communicationsQuery = new QueryExpression(auto_communication.EntityLogicalName);

            communicationsQuery.ColumnSet = columnSet;
            communicationsQuery.NoLock = true;
            communicationsQuery.TopCount = 1000;
            communicationsQuery.Criteria.AddCondition("auto_contactid", ConditionOperator.Equal, contactId);

            return _organizationService.RetrieveMultiple(communicationsQuery)
                .Entities
                .Select(e => e.ToEntity<auto_communication>());
        }

        /// <summary>
        /// Получить сохраненное средство связи
        /// </summary>
        /// <param name="communicationId">Идентификатор средства связи</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private auto_communication GetStoredCommunitation(Guid communicationId, ColumnSet columnSet)
            => _organizationService
                .Retrieve(auto_communication.EntityLogicalName, communicationId, columnSet)?
                .ToEntity<auto_communication>();
    }
}
using Auto.Common.Entities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;

namespace Auto.Common.Services
{
    /// <summary>
    /// Сервис для работы с объектом "Договор"
    /// </summary>
    public sealed class AgreementService
    {
        private readonly IOrganizationService _organizationService;
        private readonly ITracingService _tracingService;

        public AgreementService(
            IOrganizationService organizationService,
            ITracingService tracingService
            )
        {
            _organizationService = organizationService ?? throw new ArgumentNullException(nameof(organizationService));
            _tracingService = tracingService ?? throw new ArgumentNullException(nameof(tracingService));
        }

        /// <summary>
        /// Установить оплачен ли договор или нет
        /// </summary>
        /// <param name="agreement">Договор</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public void SetIsPaid(auto_agreement agreement)
        {
            if (agreement == null)
                throw new ArgumentNullException(nameof(agreement));

            if (agreement.auto_factsumma == null)
                throw new Exception("Не указана оплаченная сумма в сущности \"Договор\"");

            var storedAgreement = GetStoredAgreement(agreement.Id, new ColumnSet("auto_summa"));

            agreement.auto_fact = storedAgreement.auto_summa.Value <= agreement.auto_factsumma.Value;
        }

        /// <summary>
        /// Установить дату первого договора контакту из договора
        /// </summary>
        /// <param name="agreement">Договор</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public void SetContactFirstAgreementDate(auto_agreement agreement)
        {
            if (agreement == null)
                throw new ArgumentNullException(nameof(agreement));

            if (agreement.auto_date == null)
                throw new Exception("Не указана дата в сущности \"Договор\"");

            var contactRef = agreement.auto_contact;

            if (contactRef == null)
                contactRef = GetContactReferenceByAgreement(agreement.Id);

            if (contactRef == null)
                throw new Exception("Не указан контакт в сущности \"Договор\"");

            var contact = GetStoredContact(contactRef.Id, new ColumnSet("auto_date"));
            
            // если у контакта не указана дата первого договора или
            // указанная дата позже даты из переданного договора
            if (contact.auto_date == null ||
                contact.auto_date > agreement.auto_date)
            {
                var contactEntity = new Contact(){
                    Id = contact.Id,
                    auto_date = agreement.auto_date
                };
                _organizationService.Update(contactEntity);
            }
        }

        /// <summary>
        /// Получить сохраненный договор
        /// </summary>
        /// <param name="agreementId">Идентификатор договора</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private auto_agreement GetStoredAgreement(Guid agreementId, ColumnSet columnSet)
            => _organizationService
                .Retrieve(auto_agreement.EntityLogicalName, agreementId, columnSet)?
                .ToEntity<auto_agreement>();

        /// <summary>
        /// Получить ссылку на контакт из договора
        /// </summary>
        /// <param name="agreementId">Идентификатор договора</param>
        /// <returns></returns>
        private EntityReference GetContactReferenceByAgreement(Guid agreementId)
            => _organizationService
                .Retrieve(auto_agreement.EntityLogicalName, agreementId, new ColumnSet("auto_contact"))?
                .ToEntity<auto_agreement>()?
                .auto_contact;

        /// <summary>
        /// Получить сохраненный контакт
        /// </summary>
        /// <param name="contactId">Идентификатор контакта</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private Contact GetStoredContact(Guid contactId, ColumnSet columnSet)
            => _organizationService
                .Retrieve(Contact.EntityLogicalName, contactId, columnSet)?
                .ToEntity<Contact>();
    }
}

using Auto.Common.Entities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auto.Common.Services
{
    /// <summary>
    /// Сервис для работы с объектом "Счет"
    /// </summary>
    public sealed class InvoiceService
    {
        private readonly IOrganizationService _organizationService;
        private readonly ITracingService _tracingService;

        public InvoiceService(
            IOrganizationService organizationService,
            ITracingService tracingService
            )
        {
            _organizationService = organizationService ?? throw new ArgumentNullException(nameof(organizationService));
            _tracingService = tracingService ?? throw new ArgumentNullException(nameof(tracingService));
        }

        /// <summary>
        /// Установить тип счета
        /// </summary>
        /// <param name="invoice">Счет</param>
        /// <exception cref="ArgumentNullException"></exception>
        public void SetType(auto_invoice invoice)
        {
            if (invoice == null) 
                throw new ArgumentNullException(nameof(invoice));

            if (invoice.auto_type == null)
                invoice.auto_type = auto_invoice_auto_type.Ruchnoe_sozdanie;
        }
        
        /// <summary>
        /// Пересчитать сумму по счетам
        /// </summary>
        /// <param name="invoice">Счет</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public void RecalculateInvoicesAmount(auto_invoice invoice)
        {
            if (invoice == null)
                throw new ArgumentNullException(nameof(invoice));

            var agreementRef = invoice.auto_dogovorid;

            if (agreementRef == null)
                agreementRef = GetAgreementReferenceByInvoice(invoice.Id);
            
            if (agreementRef == null)
                throw new Exception("Не указан договор у сущности \"Счет\"");

            var agreementInvoices = GetInvoicesByAgreement(agreementRef.Id, new ColumnSet("auto_amount", "auto_fact"));

            // cумма по всем оплаченным счетам договора без учета переданного счета
            var invoicesAmount = agreementInvoices
                .Where(i => i.auto_fact.HasValue && i.auto_fact.Value)
                .Where(i => i.Id != invoice.Id)
                .Sum(i => i.auto_amount?.Value ?? 0);

            // счет оплачен?
            if (invoice.auto_fact.HasValue && 
                invoice.auto_fact.Value)
            {
                // передана ли сумма оплаты счета
                if (invoice.auto_amount != null)
                {
                    invoicesAmount += invoice.auto_amount.Value;
                }
                else
                {
                    invoicesAmount += agreementInvoices
                        .Where(i => i.Id == invoice.Id)
                        .FirstOrDefault()?
                        .auto_amount?
                        .Value ?? 0;
                }
            }

            var agreement = GetAgreement(agreementRef.Id, new ColumnSet("auto_fullcreditamount", "auto_summa"));

            if (agreement == null)
                throw new Exception("Не найден переданный договор");
            
            var agreementSumma = agreement.auto_summa;            

            if (agreement.auto_fullcreditamount != null)
                agreementSumma = agreement.auto_fullcreditamount;

            if (agreementSumma == null)
                throw new Exception("Не указана сумма у договора");

            if (invoicesAmount > agreementSumma.Value)
                throw new Exception("Сумма оплат не может превышать сумму по договора");

            invoice.auto_paydate = DateTime.UtcNow;

            var agreementEntity = new auto_agreement()
            {
                Id = agreementRef.Id,
                auto_factsumma = new Money(invoicesAmount)
            };
            _organizationService.Update(agreementEntity);
        }

        /// <summary>
        /// Пересчитать сумму по счетам
        /// </summary>
        /// <param name="invoiceRef">Ссылка на счет</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public void RecalculateInvoicesAmount(EntityReference invoiceRef)
        {
            var agreementRef = GetAgreementReferenceByInvoice(invoiceRef.Id);

            if (agreementRef == null)
                throw new Exception("Не указан договор у сущности \"Счет\"");

            // сумма по всем оплаченным счетам, исключая переданный
            var invoicesAmount = GetInvoicesByAgreement(agreementRef.Id, new ColumnSet("auto_amount", "auto_fact"))
                .Where(i => i.auto_fact.HasValue && i.auto_fact.Value)
                .Where(i => i.Id != invoiceRef.Id)
                .Sum(i => i.auto_amount?.Value ?? 0);

            var agreementEntity = new Entity(agreementRef.LogicalName, agreementRef.Id).ToEntity<auto_agreement>();
            agreementEntity.auto_factsumma = new Money(invoicesAmount);
            _organizationService.Update(agreementEntity);
        }

        /// <summary>
        /// Получить все счета по договору
        /// </summary>
        /// <param name="agreementId">Идентификатор договора</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private IEnumerable<auto_invoice> GetInvoicesByAgreement(Guid agreementId, ColumnSet columnSet)
        {
            var agreementInvoicesQuery = new QueryExpression(auto_invoice.EntityLogicalName);

            agreementInvoicesQuery.ColumnSet = columnSet;
            agreementInvoicesQuery.NoLock = true;
            agreementInvoicesQuery.TopCount = 1000;
            agreementInvoicesQuery.Criteria.AddCondition("auto_dogovorid", ConditionOperator.Equal, agreementId);

            return _organizationService
                .RetrieveMultiple(agreementInvoicesQuery)
                .Entities
                .Select(e => e.ToEntity<auto_invoice>());
        }

        /// <summary>
        /// Получить договор
        /// </summary>
        /// <param name="agreementId">Идентификатор договора</param>
        /// <param name="columnSet">Набор полей в получаемом объекте</param>
        /// <returns></returns>
        private auto_agreement GetAgreement(Guid agreementId, ColumnSet columnSet)
            => _organizationService
                .Retrieve(auto_agreement.EntityLogicalName, agreementId, columnSet)
                .ToEntity<auto_agreement>();

        /// <summary>
        /// Получить ссылку на договор по счету
        /// </summary>
        /// <param name="invoiceId">Идентификатор счета</param>
        /// <returns></returns>
        private EntityReference GetAgreementReferenceByInvoice(Guid invoiceId)
            => _organizationService
                .Retrieve(auto_invoice.EntityLogicalName, invoiceId, new ColumnSet("auto_dogovorid"))?
                .ToEntity<auto_invoice>()?
                .auto_dogovorid;
    }
}
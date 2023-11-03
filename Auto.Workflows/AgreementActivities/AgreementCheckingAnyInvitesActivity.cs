using Auto.Common.Entities;
using Auto.Common.Services;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;

namespace Auto.Workflows.AgreementActivities
{
    /// <summary>
    /// Операция проверки наличия счетов у договора
    /// </summary>
    public sealed class AgreementCheckingAnyInvitesActivity : CodeActivity
    {
        /// <summary>
        /// Ссылка на договор
        /// </summary>
        [Input("Договор")]
        [RequiredArgument]
        [ReferenceTarget(auto_agreement.EntityLogicalName)]
        public InArgument<EntityReference> AgreementReference { get; set; }

        /// <summary>
        /// Есть ли связанные с договором счета?
        /// </summary>
        [Output("Есть ли связанные с договором счета")]
        public OutArgument<bool> IsExistsAnyInvites { get; set; }

        /// <summary>
        /// Выполнить операцию
        /// </summary>
        /// <param name="context"></param>
        /// <exception cref="NotImplementedException"></exception>
        protected override void Execute(CodeActivityContext context)
        {
            var workflowContext = context.GetExtension<IWorkflowContext>();
            var serviceFactory = context.GetExtension<IOrganizationServiceFactory>();
            var tracingService = context.GetExtension<ITracingService>();

            try
            {
                var organizationService = serviceFactory.CreateOrganizationService(null);
                var agreementRef = AgreementReference.Get(context);

                var invoiceService = new InvoiceService(organizationService, tracingService);

                IsExistsAnyInvites.Set(context, invoiceService.IsExists(agreementRef));
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }
    }
}

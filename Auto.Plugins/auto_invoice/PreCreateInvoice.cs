using Auto.Common.Services;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using System;

namespace AutoDealer.Plugin.auto_invoice
{
    /// <summary>
    /// Плагин, выполняющийся перед созданием объекта "Счет"
    /// </summary>
    public sealed class PreCreateInvoice : IPlugin
    {
        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <exception cref="InvalidPluginExecutionException"></exception>
        public void Execute(IServiceProvider serviceProvider)
        {
            var tracingService = serviceProvider.Get<ITracingService>();
            var pluginContext = serviceProvider.Get<IPluginExecutionContext>();
            var organizationFactory = serviceProvider.Get<IOrganizationServiceFactory>();

            try
            {
                var organizationService = organizationFactory.CreateOrganizationService(null);
                var invoiceService = new InvoiceService(organizationService, tracingService);

                var invoice = ((Entity)pluginContext?.InputParameters["Target"]).ToEntity<Auto.Common.Entities.auto_invoice>();

                invoiceService.SetType(invoice);
                invoiceService.RecalculateInvoicesAmount(invoice);
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.ToString());
                throw new InvalidPluginExecutionException(ex.Message);
            }            
        }
    }
}

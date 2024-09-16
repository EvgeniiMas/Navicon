using Auto.Common.Services;
using Auto.Plugins.Base;
using Microsoft.Xrm.Sdk;

namespace Auto.Plugins.auto_invoice
{
    /// <summary>
    /// Плагин, выполняющийся перед обновлением объекта "Счет"
    /// </summary>
    public sealed class PreUpdateInvoiceFact : BasePlugin
    {
        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="services">Сервисы</param>
        public override void Execute(PluginServiceCollector services)
        {
            var invoiceService = new InvoiceService(services.UserOrganizationService, services.TracingService);

            var invoice = ((Entity)services.PluginExecutionContext?.InputParameters["Target"]).ToEntity<Common.Entities.auto_invoice>();

            invoiceService.RecalculateInvoicesAmount(invoice);
        }
    }
}
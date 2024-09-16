using Auto.Common.Services;
using Auto.Plugins.Base;
using Microsoft.Xrm.Sdk;

namespace Auto.Plugins.auto_invoice
{
    /// <summary>
    /// Плагин, выполняющийся перед удалением объекта "Счет"
    /// </summary>
    public sealed class PreDeleteInvoice : BasePlugin
    {
        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="services">Сервисы</param>
        public override void Execute(PluginServiceCollector services)
        {
            var invoiceService = new InvoiceService(services.UserOrganizationService, services.TracingService);

            var invoiceRef = (EntityReference)services.PluginExecutionContext?.InputParameters["Target"];

            invoiceService.RecalculateInvoicesAmount(invoiceRef);
        }
    }
}

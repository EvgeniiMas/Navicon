using Auto.Common.Services;
using Auto.Plugins.Base;
using Microsoft.Xrm.Sdk;

namespace Auto.Plugins.auto_agreement
{
    /// <summary>
    /// Плагин, выполняющийся перед созданием объекта "Договор"
    /// </summary>
    public sealed class PreCreateAgreement : BasePlugin
    {
        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="services">Сервисы</param>
        public override void Execute(PluginServiceCollector services)
        {
            var agreementService = new AgreementService(services.UserOrganizationService, services.TracingService);

            var agreement = ((Entity)services.PluginExecutionContext?.InputParameters["Target"]).ToEntity<Common.Entities.auto_agreement>();

            agreementService.SetContactFirstAgreementDate(agreement);
        }
    }
}
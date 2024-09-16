using Auto.Common.Services;
using Auto.Plugins.Base;
using Microsoft.Xrm.Sdk;

namespace Auto.Plugins.auto_communication
{
    /// <summary>
    /// Плагин, выполняющийся перед созданием объекта "Средство связи"
    /// </summary>
    public sealed class PreCreateCommunication : BasePlugin
    {
        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="services">Сервисы</param>
        public override void Execute(PluginServiceCollector services)
        {
            var communicationService = new CommunicationService(services.UserOrganizationService, services.TracingService);

            var communication = ((Entity)services.PluginExecutionContext?.InputParameters["Target"]).ToEntity<Common.Entities.auto_communication>();

            communicationService.CheckContactContainingMainCommunication(communication);
        }
    }
}

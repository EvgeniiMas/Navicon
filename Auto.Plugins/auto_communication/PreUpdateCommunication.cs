using Auto.Common.Services;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using System;

namespace AutoDealer.Plugin.auto_communication
{
    /// <summary>
    /// Плагин, выполняющийся перед обновлением объекта "Средство коммуникации"
    /// </summary>
    public sealed class PreUpdateCommunication : IPlugin
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
                var communicationService = new CommunicationService(organizationService, tracingService);

                var communication = ((Entity)pluginContext?.InputParameters["Target"]).ToEntity<Auto.Common.Entities.auto_communication>();

                communicationService.CheckContactContainingMainCommunication(communication);
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.ToString());
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }
    }
}

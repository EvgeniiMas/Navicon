using Auto.Common.Services;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using System;

namespace AutoDealer.Plugin.auto_agreement
{
    /// <summary>
    /// Плагин, выполняющийся перед обновлением объекта "Догвор"
    /// </summary>
    public sealed class PreUpdateAgreementFactsumma : IPlugin
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
                var agreementService = new AgreementService(organizationService, tracingService);

                var agreement = ((Entity)pluginContext?.InputParameters["Target"]).ToEntity<Auto.Common.Entities.auto_agreement>();

                agreementService.SetIsPaid(agreement);
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.ToString());
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }
    }
}

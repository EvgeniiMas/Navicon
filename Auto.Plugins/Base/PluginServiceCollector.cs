using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using System;

namespace Auto.Plugins.Base
{
    /// <summary>
    /// Класс для работы с сервисами плагинов
    /// </summary>
    public class PluginServiceCollector
    {
        private readonly IServiceProvider _serviceProvider;

        public PluginServiceCollector(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
        }

        /// <summary>
        /// Сервис, обеспечивающий работу с журналом трассировки
        /// </summary>
        public ITracingService TracingService => _serviceProvider.Get<ITracingService>();

        /// <summary>
        /// Сервис контекста выполнения плагина
        /// </summary>
        public IPluginExecutionContext PluginExecutionContext => _serviceProvider.Get<IPluginExecutionContext>();

        /// <summary>
        /// Сервис, обеспечивающий работу с храниищем от имени пользователя, который инициировал срабатывание плагина
        /// </summary>
        public IOrganizationService UserOrganizationService => _serviceProvider.Get<IOrganizationServiceFactory>()?.CreateOrganizationService(Guid.Empty);

        /// <summary>
        /// Сервис, обеспечивающий работу с храниищем от имени привелигированного пользователя
        /// </summary>
        public IOrganizationService PrivilegedOrganizationService => _serviceProvider.Get<IOrganizationServiceFactory>()?.CreateOrganizationService(null);
    }
}

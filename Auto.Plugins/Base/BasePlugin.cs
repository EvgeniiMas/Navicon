using Microsoft.Xrm.Sdk;
using System;

namespace Auto.Plugins.Base
{
    /// <summary>
    /// Базовый класс плагина
    /// </summary>
    public abstract class BasePlugin : IPlugin
    {
        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <exception cref="InvalidPluginExecutionException"></exception>
        public void Execute(IServiceProvider serviceProvider)
        {
            var services = new PluginServiceCollector(serviceProvider);

            try
            {
                Execute(services);
            }
            catch (Exception ex)
            {
                services.TracingService.Trace(ex.ToString());
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }

        /// <summary>
        /// Выполнить плагин
        /// </summary>
        /// <param name="services">Сервисы</param>
        public abstract void Execute(PluginServiceCollector services);
    }
}

using Auto.Common.Services;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Tooling.Connector;
using System;

namespace Auto.ConsoleApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var url = Properties.Resources.url;
            var username = Properties.Resources.username;
            var password = Properties.Resources.password;
            var connectionString = $"AuthType=Office365;Url={url};username={username};password={password};";

            var tracingService = new TracingService();

            try
            {
                using (var client = new CrmServiceClient(connectionString))
                {
                    var autoService = new AutoService(client, tracingService);
                    autoService.UpdateAgreementCount();
                }
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.ToString());
            }
        }
    }

    public class TracingService : ITracingService
    {
        public void Trace(string format, params object[] args)
            => Console.WriteLine(format, args);
    }
}

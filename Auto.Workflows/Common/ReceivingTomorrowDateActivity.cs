using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;

namespace Auto.Workflows.Common
{
    /// <summary>
    /// Опреация получения даты завтрашнего дня
    /// </summary>
    public sealed class ReceivingTomorrowDateActivity : CodeActivity
    {
        /// <summary>
        /// Дата завтрашнего дня
        /// </summary>
        [Output("Дата завтрашнего дня")]
        public OutArgument<DateTime> TomorrowDate { get; set; }

        /// <summary>
        /// Выполнить операцию
        /// </summary>
        /// <param name="context"></param>
        /// <exception cref="NotImplementedException"></exception>
        protected override void Execute(CodeActivityContext context)
        {
            try
            {
                TomorrowDate.Set(context, DateTime.Now.AddDays(1));
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }
    }
}

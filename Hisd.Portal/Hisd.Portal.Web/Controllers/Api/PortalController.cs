namespace Hisd.Portal.Web.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Breeze.WebApi;
    using Hisd.Portal.Web.Models;

    [BreezeController]
    public class PortalController : ApiController
    {
        [HttpGet]
        public IQueryable<AppDefinition> Apps()
        {
            return new List<AppDefinition>
            {
                new AppDefinition
                {
                    Description = "The first app.",
                    Id = "appone",
                    Name = "App One"
                },
                new AppDefinition
                {
                    Description = "The second app.",
                    Id = "apptwo",
                    Name = "App Two"
                }
            }.AsQueryable();
        }
    }
}
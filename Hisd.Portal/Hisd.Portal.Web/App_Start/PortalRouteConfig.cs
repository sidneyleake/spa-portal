using System.Web.Mvc;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof(Hisd.Portal.Web.App_Start.PortalRouteConfig), "RegisterPortalPreStart", Order = 2)]

namespace Hisd.Portal.Web.App_Start {
  ///<summary>
  /// Inserts the Portal SPA sample view controller to the front of all MVC routes
  /// so that the Portal SPA sample becomes the default page.
  ///</summary>
  ///<remarks>
  /// This class is discovered and run during startup
  /// http://blogs.msdn.com/b/davidebb/archive/2010/10/11/light-up-your-nupacks-with-startup-code-and-webactivator.aspx
  ///</remarks>
  public static class PortalRouteConfig {

      public static void RegisterPortalPreStart()
      {
          System.Web.Routing.RouteTable.Routes.MapRoute(
              name: "PortalDefault",
              url: "{controller}/{action}/{id}",
              defaults: new
              {
                  controller = "Portal",
                  action = "Index",
                  id = UrlParameter.Optional
              }
          );
      }
  }
}
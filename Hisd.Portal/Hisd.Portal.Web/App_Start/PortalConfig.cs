using System;
using System.Web.Optimization;

[assembly: WebActivator.PostApplicationStartMethod(
    typeof(Hisd.Portal.Web.App_Start.PortalConfig), "PreStart")]

namespace Hisd.Portal.Web.App_Start
{
    public static class PortalConfig
    {
        public static void PreStart()
        {
            // Add your start logic here
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
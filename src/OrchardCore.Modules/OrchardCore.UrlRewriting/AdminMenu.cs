using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Localization;
using OrchardCore.Navigation;
using OrchardCore.UrlRewriting.Drivers;

namespace OrchardCore.UrlRewriting;

public sealed class AdminMenu : AdminNavigationProvider
{
    private static readonly RouteValueDictionary _routeValues = new()
    {
        { "area", "OrchardCore.Settings" },
        { "groupId", UrlRewritingSettingsDisplayDriver.GroupId },
    };

    public readonly IStringLocalizer S;

    public AdminMenu(IStringLocalizer<AdminMenu> stringLocalizer)
    {
        S = stringLocalizer;
    }

    protected override ValueTask BuildAsync(NavigationBuilder builder)
    {
        builder
            .Add(S["Configuration"], configuration => configuration
                .Add(S["Settings"], settings => settings
                   .Add(S["URL Rewriting"], S["URL Rewriting"].PrefixPosition(), rewriting => rewriting
                       .Permission(UrlRewritingPermissions.ManageUrlRewriting)
                       .Action("Index", "Admin", _routeValues)
                       .LocalNav()
                    )
                )
            );

        return ValueTask.CompletedTask;
    }
}
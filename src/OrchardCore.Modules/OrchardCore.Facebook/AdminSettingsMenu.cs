using Microsoft.Extensions.Localization;
using OrchardCore.Navigation;
using OrchardCore.Settings;

namespace OrchardCore.Facebook;

public sealed class AdminSettingsMenu : SettingsNavigationProvider
{
    internal readonly IStringLocalizer S;

    public AdminSettingsMenu(IStringLocalizer<AdminSettingsMenu> stringLocalizer)
    {
        S = stringLocalizer;
    }

    protected override ValueTask BuildAsync(NavigationBuilder builder)
    {
        builder
            .Add(S["General"], general => general
                .Add(S["Meta App"], S["Meta App"].PrefixPosition(), metaApp => metaApp
                    .AddClass("facebookApp")
                    .Id("facebookApp")
                    .Action(GetRouteValues(FacebookConstants.Features.Core))
                    .Permission(Permissions.ManageFacebookApp)
                    .LocalNav()
                )
            );

        return ValueTask.CompletedTask;
    }
}
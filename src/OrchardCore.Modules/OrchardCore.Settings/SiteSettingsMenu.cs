using Microsoft.Extensions.Localization;
using OrchardCore.Navigation;
using OrchardCore.Settings.Drivers;

namespace OrchardCore.Settings;

public sealed class SiteSettingsMenu : SettingsNavigationProvider
{
    internal readonly IStringLocalizer S;

    public SiteSettingsMenu(IStringLocalizer<AdminMenu> stringLocalizer)
    {
        S = stringLocalizer;
    }

    protected override ValueTask BuildAsync(NavigationBuilder builder)
    {
        return ValueTask.CompletedTask;
    }
}
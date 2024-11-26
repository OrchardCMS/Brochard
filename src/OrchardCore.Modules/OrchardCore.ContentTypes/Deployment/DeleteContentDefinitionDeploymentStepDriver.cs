using OrchardCore.ContentTypes.ViewModels;
using OrchardCore.Deployment;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;

namespace OrchardCore.ContentTypes.Deployment;

public sealed class DeleteContentDefinitionDeploymentStepDriver
    : DeploymentStepFieldsDriverBase<DeleteContentDefinitionDeploymentStep, DeleteContentDefinitionStepViewModel>
{
    private static readonly char[] _separator = [' ', ','];

    public DeleteContentDefinitionDeploymentStepDriver(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override IDisplayResult Edit(DeleteContentDefinitionDeploymentStep step, Action<DeleteContentDefinitionStepViewModel> intializeAction)
    {
        return base.Edit(step, model =>
        {
            model.ContentParts = string.Join(", ", step.ContentParts);
            model.ContentTypes = string.Join(", ", step.ContentTypes);
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(DeleteContentDefinitionDeploymentStep step, UpdateEditorContext context)
    {
        var model = new DeleteContentDefinitionStepViewModel();

        await context.Updater.TryUpdateModelAsync(model, Prefix);

        step.ContentTypes = model.ContentTypes.Split(_separator, StringSplitOptions.RemoveEmptyEntries);
        step.ContentParts = model.ContentParts.Split(_separator, StringSplitOptions.RemoveEmptyEntries);

        return Edit(step, context);
    }
}

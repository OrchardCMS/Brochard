using System.Text.Json.Nodes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using OrchardCore.Deployment.ViewModels;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Mvc.ModelBinding;

namespace OrchardCore.Deployment.Steps;

public sealed class JsonRecipeDeploymentStepDriver
    : DeploymentStepFieldsDriverBase<JsonRecipeDeploymentStep, JsonRecipeDeploymentStepViewModel>
{
    /// <summary>
    /// A limited schema for recipe steps. Does not include any step data.
    /// </summary>
    public const string Schema = @"
{
  ""$schema"": ""http://json-schema.org/draft-04/schema#"",
  ""type"": ""object"",
  ""title"": ""JSON Recipe deployment plan"",
  ""properties"": {
    ""name"": {
      ""type"": ""string""
    }
  },
  ""required"": [
    ""name""
  ]
}
";

    internal readonly IStringLocalizer S;

    public JsonRecipeDeploymentStepDriver(IServiceProvider serviceProvider) : base(serviceProvider)
    {
        S = serviceProvider.GetService<IStringLocalizer<JsonRecipeDeploymentStepDriver>>();
    }

    public override IDisplayResult Edit(JsonRecipeDeploymentStep step, Action<JsonRecipeDeploymentStepViewModel> intializeAction)
    {
        return base.Edit(step, model =>
        {
            model.Json = step.Json;
            model.Schema = Schema;
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(JsonRecipeDeploymentStep step, UpdateEditorContext context)
    {
        var model = new JsonRecipeDeploymentStepViewModel();

        await context.Updater.TryUpdateModelAsync(model, Prefix);

        try
        {
            var jObject = JObject.Parse(model.Json);
            if (!jObject.ContainsKey("name"))
            {

                context.Updater.ModelState.AddModelError(Prefix, nameof(JsonRecipeDeploymentStepViewModel.Json), S["The recipe must have a name property"]);
            }

        }
        catch (Exception)
        {
            context.Updater.ModelState.AddModelError(Prefix, nameof(JsonRecipeDeploymentStepViewModel.Json), S["Invalid JSON supplied"]);

        }

        step.Json = model.Json;

        return Edit(step, context);
    }
}

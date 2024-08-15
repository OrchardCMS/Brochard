using System;
using System.Threading.Tasks;

namespace OrchardCore.Workflows.WorkflowPruning.Services;

public interface IWorkflowPruningManager
{
    Task<int> PruneWorkflowInstancesAsync(TimeSpan retentionPeriod);
}

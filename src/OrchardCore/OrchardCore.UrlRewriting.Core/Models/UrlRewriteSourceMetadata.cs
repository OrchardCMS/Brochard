namespace OrchardCore.UrlRewriting.Models;

public class UrlRewriteSourceMetadata
{
    public string Pattern { get; set; }

    public bool IsCaseInsensitive { get; set; }

    public string SubstitutionPattern { get; set; }

    public bool AppendQueryString { get; set; }

    public bool SkipFurtherRules { get; set; }
}
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Dapper;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Data;
using OrchardCore.Environment.Shell.Scope;
using YesSql;
using YesSql.Sql;

namespace OrchardCore.Queries.Core;

public static class QuerySourceHelper
{
    public static void MigrateQueries(string source)
    {
        ShellScope.AddDeferredTask(async scope =>
        {
            var session = scope.ServiceProvider.GetRequiredService<ISession>();
            var dbConnectionAccessor = scope.ServiceProvider.GetService<IDbConnectionAccessor>();

            var documentTableName = session.Store.Configuration.TableNameConvention.GetDocumentTable();
            var table = $"{session.Store.Configuration.TablePrefix}{documentTableName}";
            var dialect = session.Store.Configuration.SqlDialect;
            var quotedTableName = dialect.QuoteForTableName(table, session.Store.Configuration.Schema);
            var quotedContentColumnName = dialect.QuoteForColumnName("Content");
            var quotedTypeColumnName = dialect.QuoteForColumnName("Type");

            var sqlBuilder = new SqlBuilder(session.Store.Configuration.TablePrefix, session.Store.Configuration.SqlDialect);
            sqlBuilder.AddSelector(quotedContentColumnName);
            sqlBuilder.From(quotedTableName);
            sqlBuilder.WhereAnd($" {quotedTypeColumnName} = 'OrchardCore.Queries.Services.QueriesDocument, OrchardCore.Queries' ");
            sqlBuilder.Take("1");

            await using var connection = dbConnectionAccessor.CreateConnection();
            await connection.OpenAsync();
            var jsonContent = await connection.QueryFirstOrDefaultAsync<string>(sqlBuilder.ToSqlString());

            if (string.IsNullOrEmpty(jsonContent))
            {
                return;
            }

            var jsonObject = JsonNode.Parse(jsonContent);

            if (jsonObject["Queries"] is not JsonObject queriesObject)
            {
                return;
            }

            var queries = new List<Query>();

            var queryManager = scope.ServiceProvider.GetRequiredService<IQueryManager>();

            foreach (var queryObject in queriesObject)
            {
                if (queryObject.Value["Source"].GetValue<string>() != source)
                {
                    continue;
                }

                var query = await queryManager.NewAsync(source, queryObject.Value);

                if (query == null)
                {
                    continue;
                }

                queries.Add(query);
            }

            await queryManager.SaveAsync(queries.ToArray());
        });
    }
}
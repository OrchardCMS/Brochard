using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OrchardCore.Users;

/// <summary>
/// Provides a methods to link a local user with an externally authenticated user during registration.
/// </summary>
public interface IUserToExternalLoginProvider
{
    /// <summary>
    /// Checks of the implement can handle the given external login information.
    /// </summary>
    /// <param name="info">The external login information.</param>
    /// <returns>
    /// True if the service can handle the given external login information. False otherwise.
    /// </returns>
    bool CanHandle(ExternalLoginInfo info);

    /// <summary>
    /// <summary>
    /// Retrieves a local user account that corresponds to the provided external login information, if one exists.
    /// </summary>
    /// <param name="info">The external login information.</param>
    /// <returns>
    /// An instance of <see cref="IUser" /> if there's a local account matching the external login data; otherwise, null.
    /// </returns>
    Task<IUser> GetUserAsync(ExternalLoginInfo info);

    /// <summary>
    /// Gets the identifier's key used by the implementation.
    /// </summary>
    /// <param name="info">
    /// <param name="info">The external login information.</param>
    /// <returns>A string identifier denoting the property name utilized for user identification.</returns>
    string GetIdentifierKey(ExternalLoginInfo info);
}
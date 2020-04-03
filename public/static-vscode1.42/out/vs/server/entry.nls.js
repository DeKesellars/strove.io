/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/*---------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
define("vs/server/entry.nls", {
	"vs/base/common/date": [
		"now",
		"{0} sec ago",
		"{0} secs ago",
		"{0} sec",
		"{0} secs",
		"{0} min ago",
		"{0} mins ago",
		"{0} min",
		"{0} mins",
		"{0} hr ago",
		"{0} hrs ago",
		"{0} hr",
		"{0} hrs",
		"{0} day ago",
		"{0} days ago",
		"{0} day",
		"{0} days",
		"{0} wk ago",
		"{0} wks ago",
		"{0} wk",
		"{0} wks",
		"{0} mo ago",
		"{0} mos ago",
		"{0} mo",
		"{0} mos",
		"{0} yr ago",
		"{0} yrs ago",
		"{0} yr",
		"{0} yrs"
	],
	"vs/base/common/errorMessage": [
		"{0}: {1}",
		"A system error occurred ({0})",
		"An unknown error occurred. Please consult the log for more details.",
		"An unknown error occurred. Please consult the log for more details.",
		"{0} ({1} errors in total)",
		"An unknown error occurred. Please consult the log for more details."
	],
	"vs/base/common/jsonErrorMessages": [
		"Invalid symbol",
		"Invalid number format",
		"Property name expected",
		"Value expected",
		"Colon expected",
		"Comma expected",
		"Closing brace expected",
		"Closing bracket expected",
		"End of file expected"
	],
	"vs/base/common/severity": [
		"Error",
		"Warning",
		"Info"
	],
	"vs/base/node/processes": [
		"Can't execute a shell command on a UNC drive."
	],
	"vs/base/node/zip": [
		"Error extracting {0}. Invalid file.",
		"Incomplete. Found {0} of {1} entries",
		"{0} not found inside zip."
	],
	"vs/code/node/cliProcessMain": [
		"Extension '{0}' not found.",
		"Extension '{0}' is not installed.",
		"Make sure you use the full extension ID, including the publisher, e.g.: {0}",
		"Installing extensions...",
		"Failed Installing Extensions: {0}",
		"Extension '{0}' was successfully installed.",
		"Cancelled installing extension '{0}'.",
		"Extension '{0}' is already installed.",
		"Extension '{0}' v{1} is already installed, but a newer version {2} is available in the marketplace. Use '--force' option to update to newer version.",
		"Updating the extension '{0}' to the version {1}",
		"A newer version of extension '{0}' v{1} is already installed. Use '--force' option to downgrade to older version.",
		"Installing extension '{0}' v{1}...",
		"Extension '{0}' v{1} was successfully installed.",
		"Cancelled installing extension '{0}'.",
		"Uninstalling {0}...",
		"Extension '{0}' was successfully uninstalled!"
	],
	"vs/platform/configuration/common/configurationRegistry": [
		"Default Configuration Overrides",
		"Configure editor settings to be overridden for {0} language.",
		"Configure editor settings to be overridden for a language.",
		"This setting does not support per-language configuration.",
		"Cannot register '{0}'. This matches property pattern '\\\\[.*\\\\]$' for describing language specific editor settings. Use 'configurationDefaults' contribution.",
		"Cannot register '{0}'. This property is already registered."
	],
	"vs/platform/extensionManagement/common/extensionManagement": [
		"Extensions",
		"Preferences"
	],
	"vs/platform/extensionManagement/node/extensionManagementService": [
		"Extension invalid: package.json is not a JSON file.",
		"Unable to install extension '{0}' as it is not compatible with VS Code '{1}'.",
		"Please restart VS Code before reinstalling {0}.",
		"Please restart VS Code before reinstalling {0}.",
		"Marketplace is not enabled",
		"Can't install extension since it was reported to be problematic.",
		"Unable to install '{0}' extension because it is not compatible with the current version of VS Code (version {1}).",
		"Marketplace is not enabled",
		"Error while removing the extension: {0}. Please Quit and Start VS Code before trying again.",
		"Only Marketplace Extensions can be reinstalled",
		"Unable to install the extension. Please Quit and Start VS Code before reinstalling.",
		"Unable to install the extension. Please Exit and Start VS Code before reinstalling.",
		"Unable to delete the existing folder '{0}' while installing the extension '{1}'. Please delete the folder manually and try again",
		"Cannot read the extension from {0}",
		"Unknown error while renaming {0} to {1}",
		"Extension '{0}' is not installed.",
		"Cannot uninstall extension '{0}'. Extension '{1}' depends on this.",
		"Cannot uninstall extension '{0}'. Extensions '{1}' and '{2}' depend on this.",
		"Cannot uninstall extension '{0}'. Extensions '{1}', '{2}' and others depend on this.",
		"Could not find extension"
	],
	"vs/platform/extensionManagement/node/extensionManagementUtil": [
		"VSIX invalid: package.json is not a JSON file."
	],
	"vs/platform/extensions/common/extensionValidator": [
		"Could not parse `engines.vscode` value {0}. Please use, for example: ^1.22.0, ^1.22.x, etc.",
		"Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions before 1.0.0, please define at a minimum the major and minor desired version. E.g. ^0.10.0, 0.10.x, 0.11.0, etc.",
		"Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions after 1.0.0, please define at a minimum the major desired version. E.g. ^1.10.0, 1.10.x, 1.x.x, 2.x.x, etc.",
		"Extension is not compatible with Code {0}. Extension requires: {1}."
	],
	"vs/platform/files/common/fileService": [
		"Unable to resolve filesystem provider with relative file path '{0}'",
		"No file system provider found for resource '{0}'",
		"Unable to resolve non-existing file '{0}'",
		"Unable to create file '{0}' that already exists when overwrite flag is not set",
		"Unable to write file '{0}' ({1})",
		"Unable to write file '{0}' that is actually a directory",
		"File Modified Since",
		"Unable to read file '{0}' ({1})",
		"Unable to read file '{0}' ({1})",
		"Unable to read file '{0}' that is actually a directory",
		"File not modified since",
		"Unable to read file '{0}' that is too large to open",
		"Unable to copy when source '{0}' is same as target '{1}' with different path case on a case insensitive file system",
		"Unable to move/copy when source '{0}' is parent of target '{1}'.",
		"Unable to move/copy '{0}' because target '{1}' already exists at destination.",
		"Unable to move/copy '{0}' into '{1}' since a file would replace the folder it is contained in.",
		"Unable to create folder '{0}' that already exists but is not a directory",
		"Unable to delete file '{0}' via trash because provider does not support it.",
		"Unable to delete non-existing file '{0}'",
		"Unable to delete non-empty folder '{0}'.",
		"Unable to modify readonly file '{0}'"
	],
	"vs/platform/files/common/files": [
		"Unknown Error"
	],
	"vs/platform/files/common/io": [
		"To open a file of this size, you need to restart and allow it to use more memory",
		"File is too large to open"
	],
	"vs/platform/files/node/diskFileSystemProvider": [
		"File already exists",
		"File does not exist",
		"Unable to move '{0}' into '{1}' ({2}).",
		"Unable to copy '{0}' into '{1}' ({2}).",
		"'File cannot be copied to same path with different path case",
		"File at target already exists"
	],
	"vs/platform/request/common/request": [
		"HTTP",
		"The proxy setting to use. If not set, will be inherited from the `http_proxy` and `https_proxy` environment variables.",
		"Controls whether the proxy server certificate should be verified against the list of supplied CAs.",
		"The value to send as the `Proxy-Authorization` header for every network request.",
		"Disable proxy support for extensions.",
		"Enable proxy support for extensions.",
		"Enable proxy support for extensions, override request options.",
		"Use the proxy support for extensions.",
		"Controls whether CA certificates should be loaded from the OS. (On Windows and macOS a reload of the window is required after turning this off.)"
	],
	"vs/platform/telemetry/common/telemetryService": [
		"Telemetry",
		"Enable usage data and errors to be sent to a Microsoft online service."
	],
	"vs/server/node/marketplace": [
		"Error extracting {0}. Invalid file."
	],
	"vs/workbench/services/extensions/node/extensionPoints": [
		"Failed to parse {0}: [{1}, {2}] {3}.",
		"Cannot read file {0}: {1}.",
		"Failed to parse {0}: {1}.",
		"Invalid format {0}: JSON object expected.",
		"Couldn't find message for key {0}.",
		"Extension version is not semver compatible.",
		"Got empty extension description",
		"property publisher must be of type `string`.",
		"property `{0}` is mandatory and must be of type `string`",
		"property `{0}` is mandatory and must be of type `string`",
		"property `{0}` is mandatory and must be of type `object`",
		"property `{0}` is mandatory and must be of type `string`",
		"property `{0}` can be omitted or must be of type `string[]`",
		"property `{0}` can be omitted or must be of type `string[]`",
		"properties `{0}` and `{1}` must both be specified or must both be omitted",
		"property `{0}` can be omitted or must be of type `string`",
		"Expected `main` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.",
		"properties `{0}` and `{1}` must both be specified or must both be omitted"
	]
});
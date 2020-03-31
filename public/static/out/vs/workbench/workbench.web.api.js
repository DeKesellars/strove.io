/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/workbench/browser/web.main", "vs/base/common/uri", "vs/platform/log/common/log", "vs/base/common/event", "vs/base/common/lifecycle", "vs/platform/commands/common/commands", "vs/workbench/workbench.web.main"], function (require, exports, web_main_1, uri_1, log_1, event_1, lifecycle_1, commands_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URI = uri_1.URI;
    exports.LogLevel = log_1.LogLevel;
    exports.Event = event_1.Event;
    exports.Emitter = event_1.Emitter;
    exports.Disposable = lifecycle_1.Disposable;
    /**
     * Creates the workbench with the provided options in the provided container.
     *
     * @param domElement the container to create the workbench in
     * @param options for setting up the workbench
     */
    async function create(domElement, options) {
        // Startup workbench
        await web_main_1.main(domElement, options);
        // Register commands if any
        if (Array.isArray(options.commands)) {
            for (const command of options.commands) {
                commands_1.CommandsRegistry.registerCommand(command.id, (accessor, ...args) => {
                    // we currently only pass on the arguments but not the accessor
                    // to the command to reduce our exposure of internal API.
                    command.handler(...args);
                });
            }
        }
    }
    exports.create = create;
});
//# sourceMappingURL=workbench.web.api.js.map
﻿define(['durandal/system', 'durandal/plugins/router', 'services/logger', 'config'],
    function (system, router, logger, config) {
        var shell = {
            activate: activate,
            router: router
        };
        
        return shell;

        //#region Internal Methods
        function activate() {
            return boot();
        }

        function boot() {
            config.initialize();
            router.mapNav('home');
            router.mapNav('details');
            log('Hisd Portal!', null, true);
            return router.activate(config.startModule);
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });
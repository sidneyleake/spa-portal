define(['services/logger', 'services/unitofwork', 'config'], function (logger, unitofwork, config) {
    var apps = ko.observableArray([]);
    var vm = {
        activate: activate,
        apps: apps,
        title: 'Home View'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        debugger;
        var uow = unitofwork.create();
        uow.getRepository(config.repositories.AppDefinition)
            .getAll()
            .then(function (a) { apps(a.results); })
            .fail(function (a, b, c) { debugger; });
        logger.log('Home View Activated', null, 'home', true);
        return true;
    }
    //#endregion
});
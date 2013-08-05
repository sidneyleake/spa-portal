define(function (require) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.backgroundpositionClass = 'toast-bottom-right';

    var repositories = {
        AppDefinition: 'AppDefinition'
    };

    var services = {
        Portal: 'breeze/Portal'
    }

    var startModule = 'home';

    var config = {
        initialize: initialize,
        repositories: repositories,
        services: services,
        startModule: startModule
    };

    function initialize() {
        initializeRepositories();
    }

    function initializeRepositories() {
        var repositoryProvider = require('services/repositoryprovider'),
            appDefinitionRepository = require('services/repository.appdefinition');

        repositoryProvider.registerRepository(config.repositories.AppDefinition, appDefinitionRepository.create);
    }

    return config;
});
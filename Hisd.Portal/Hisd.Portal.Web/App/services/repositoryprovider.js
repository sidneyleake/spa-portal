define([],
    function () {
        var repositoryFactory = {};

        var repositoryProvider = function(){
            return {
                createRepository: createRepository,
                registerRepository: registerRepository,
                repositoryFactory: repositoryFactory
            }
        };

        return repositoryProvider();

        function registerRepository(name, createFunction) {
            repositoryFactory[name] = createFunction;
        }

        function createRepository(name, manager) {
            return repositoryFactory[name](manager);
        }

        //function RepositoryProvider() {
        //    return this;
        //}

        //RepositoryProvider.createRepository = function (name, manager) {
        //    return repositoryFactory[name](manager);
        //}

        //RepositoryProvider.getRepository = function (name, manager) {
        //    if (!repositories[name]) {
        //        repositories[name] = repositoryFactory[name](manager);
        //    }

        //    return repositories[name];
        //}

        //RepositoryProvider.registerRepository = function (name, createFunction) {
        //    repositoryFactory[name] = createFunction;
        //}

        //return RepositoryProvider;

        //var RepositoryProvider = (function(){
        //    var repositoryProvider = function(){
        //        var repositoryFactory = {};

        //        this.createRepository = function(name, manager) {
        //            return repositoryFactory[name](manager);
        //        }

        //        this.getRepository = function(name, manager) {
        //            if (!repositories[name]) {
        //                repositories[name] = repositoryFactory[name](manager);
        //            }

        //            return repositories[name];
        //        }

        //        this.registerRepository = function(name, createFunction) {
        //            repositoryFactory[name] = createFunction;
        //        }
        //    }

        //    return repositoryProvider;
        //})();
    });
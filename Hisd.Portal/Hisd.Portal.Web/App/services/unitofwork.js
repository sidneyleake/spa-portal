define(['services/entitymanagerprovider', 'services/repository', 'durandal/app', 'services/repositoryprovider'],
    function (entityManagerProvider, repository, app, repositoryProvider) {
        var refs = {};

        var UnitOfWork = (function () {

            var unitofwork = function (serviceName) {
                var provider = entityManagerProvider.create();
                var manager = provider.getManager();
                var repositoryCache = {};

                this.hasChanges = function () {
                    return manager.hasChanges();
                };

                this.commit = function () {
                    var saveOptions = new breeze.SaveOptions({ resourceName: 'savechanges' });

                    return provider.manager().saveChanges(null, saveOptions);
                };

                this.rollback = function () {
                    manager.rejectChanges();
                };

                this.getRepository = function (name) {
                    if (!repositoryCache[name]) {
                        repositoryCache[name] = repositoryProvider.createRepository(name, manager);
                    }

                    return repositoryCache[name];
                }
            };

            return unitofwork;
        })();

        return {
            create: create
        };

        function create(serviceName) {
            return new UnitOfWork(serviceName);
        }
    });
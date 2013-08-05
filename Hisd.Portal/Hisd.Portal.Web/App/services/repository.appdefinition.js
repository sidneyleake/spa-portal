define(['services/repository.generic'],
    function (genericRepository) {
        var AppDefinitionRepository = (function () {
            var appDefinitionRepository = function (manager) {
                var repo = genericRepository.create(manager, 'AppDefinition', 'Apps')
                this.getAll = function () {
                    return repo.getAll()
                        .using(manager)
                        .execute();
                }
            };

            return appDefinitionRepository;
        })();

        var factory = {
            create: create
        }

        return factory;

        function create(manager) {
            return new AppDefinitionRepository(manager);
        };

    });
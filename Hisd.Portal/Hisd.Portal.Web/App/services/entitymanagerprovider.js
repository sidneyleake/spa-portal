define(['durandal/app', 'services/modelbuilder'],
    function (app, modelBuilder) {

        breeze.NamingConvention.camelCase.setAsDefault();

        var EntityManagerProvider = (function () {
            var entityManagerProvider = function (serviceName) {
                var manager;
                var serviceDefinition = {
                    serviceName: serviceName || 'breeze/Portal',
                    hasServerMetadata: false
                };
                var dataService = new breeze.DataService(serviceDefinition);
                var masterManager = new breeze.EntityManager({ dataService: dataService });

                this.getManager = function () {
                    if (!manager) {
                        manager = masterManager.createEmptyCopy();

                        // Populate with lookup data
                        manager.importEntities(masterManager.exportEntities());

                        // Subscribe to events
                        manager.hasChangesChanged.subscribe(function (args) {
                            app.trigger('hasChanges');
                        });
                    }

                    modelBuilder.createServiceMetadata(manager.metadataStore);

                    return manager;
                };
            };

            return entityManagerProvider;
        })();

        var self = {
            prepare: prepare,
            create: create
        };

        return self;

        function create(serviceName) {
            return new EntityManagerProvider(serviceName);
        }

        function prepare() {
            return masterManager.fetchMetadata();
        }
    });
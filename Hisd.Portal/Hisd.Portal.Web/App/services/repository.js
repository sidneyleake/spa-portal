define(function () {

    var Repository = (function () {

        var repository = function (entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {

            // Ensure resourceName is registered
            var entityType;
            if (entityTypeName) {
                entityType = getMetastore().getEntityType(entityTypeName);
                entityType.setProperties({ defaultResourceName: resourceName });

                getMetastore().setEntityTypeForResourceName(resourceName, entityTypeName);
            }

            this.create = function () {
                if (!entityTypeName)
                    throw new Error("Repository must be created with an entity type specified");

                var id = ko.observable(breeze.core.getUuid());

                return manager().createEntity(entityTypeName);
            }

            this.withId = function (key) {
                if (!entityTypeName)
                    throw new Error("Repository must be created with an entity type specified");

                return manager().fetchEntityByKey(entityTypeName, key, true)
                    .then(function (data) {
                        if (!data.entity)
                            throw new Error("Entity not found!");
                        return data.entity;
                    });
            };

            //this.withId = function (key, expandProperties) {
            //    if (!entityTypeName)
            //        throw new Error("Repository must be created with an entity type specified");

            //    var entityKey = new breeze.EntityKey(entityType, key);
            //    var query;

            //    if (expandProperties)
            //        query = breeze.EntityQuery.fromEntityKey(entityKey).expand(expandProperties);
            //    else
            //        query = breeze.EntityQuery.fromEntityKey(entityKey);

            //    return executeQuery(query);

            //    //return manager().executeQuery(query)
            //    //    .then(function (data) {
            //    //        if (!data.entity)
            //    //            throw new Error("Entity not found!");
            //    //        return data.entity;
            //    //    });
            //};

            this.find = function (predicate) {
                var query = breeze.EntityQuery
                    .from(resourceName)
                    .where(predicate);

                return executeQuery(query);
            };

            this.findInCache = function (predicate) {
                var query = breeze.EntityQuery
                    .from(resourceName)
                    .where(predicate);

                return executeCacheQuery(query);
            };

            this.all = function (expandProperties) {
                var query;

                if (expandProperties)
                    query = breeze.EntityQuery.from(resourceName).expand(expandProperties);
                else
                    query = breeze.EntityQuery.from(resourceName);

                return executeQuery(query);
            };

            function executeQuery(query) {
                return entityManagerProvider.manager()
                    .executeQuery(query.using(fetchStrategy || breeze.FetchStrategy.FromServer))
                    .then(function (data) { return data.results; });
            }

            function executeCacheQuery(query) {
                return entityManagerProvider.manager().executeQueryLocally(query);
            }

            function getMetastore() {
                return manager().metadataStore;
            }

            function manager() {
                return entityManagerProvider.manager();
            }
        };

        return repository;
    })();

    return {
        create: create
    };

    function create(entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {
        return new Repository(entityManagerProvider, entityTypeName, resourceName, fetchStrategy);
    }
});
define(function () {
    var EntityManager = breeze.EntityManager,
        EntityState = breeze.EntityState,
        EntityQuery = breeze.EntityQuery,
        Predicate = breeze.Predicate;

    var GenericRepository = (function () {
        var genericRepository = function (manager, entityTypeName, resourceName) {
            var metadatastore = manager.metadataStore;

            this.create = function (entity) {
                entity.entityAspect.entityState = EntityState.Added;
            }

            this.deleteById = function (id) {
                var entity = this.getById(id);
                this.deleteEntity(entity);
            }

            this.deleteEntity = function (entity) {
                entity.entityAspect.setDeleted();
            }

            this.getAll = function () {
                var query = new EntityQuery(resourceName)
                    .using(manager);

                return query;
            }

            this.getById = function (id, idFieldName) {
                idFieldName = idFieldName || 'id';
                var predicate = new Predicate(idFieldName, '==', id);
                var query = this.getSome(predicate);

                return query;
            }

            this.getSome = function (predicate) {
                var query = new EntityQuery(resourceName)
                    .using(manager)
                    .where(predicate);

                return query;
            }

            this.update = function (entity) {
                entity.entityAspect.setModified();
            }
        }

        return genericRepository;
    })();
});
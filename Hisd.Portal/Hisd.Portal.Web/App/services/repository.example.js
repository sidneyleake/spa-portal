define(['services/repository.generic'],
    function (genericRepository) {
        var ExampleRepository = (function () {
            this.getAll = function () {
                return genericRepository.getAll().execute();
            }
        })();
    });
    
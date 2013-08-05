define(['services/repository.example'],
    function (exampleRepository) {
    var repositories = {
        exampleRepository: new ExampleRepository()
    };

    var provider = {
        getRepository: getRepository
    };

    return provider;

    function getRepository(name) {
        return repositories[name];
    }
});
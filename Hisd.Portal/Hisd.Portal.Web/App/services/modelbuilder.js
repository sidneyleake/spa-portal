﻿define([],
    function () {
        var modelBuilder = {
            createServiceMetadata: createServiceMetadata
        };

        return modelBuilder;

        function createServiceMetadata(metadataStore) {
            if (!metadataStore) {
                throw new Error('A metadata store is required to initialize the application.');
            }

            registerAppDefinitionMetadata(metadataStore);
        }

        function registerAppDefinitionMetadata(metadataStore) {
            metadataStore.addEntityType({
                shortName: 'AppDefinition',
                namespace: 'Hisd.Portal.Web.Models',
                autoGeneratedKeyType: breeze.AutoGeneratedKeyType.None,
                dataProperties: {
                    id: { dataType: breeze.DataType.String, isNullable: false, isPartOfKey: true },
                    name: { dataType: breeze.DataType.String, isNullable: false },
                    description: { dataType: breeze.DataType.String }
                }
            });
        }
    });
    
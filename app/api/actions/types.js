import schemas from './schemas';
import { createApiAction } from './utils';

function fetchTypes() {
  return createApiAction({
    endpoint: 'type',
    params: { pageSize: 100, resource_group: 'kanslia' },
    method: 'GET',
    type: 'TYPES',
    options: { schema: schemas.paginatedTypesSchema },
  });
}

export {
  fetchTypes,  // eslint-disable-line import/prefer-default-export
};

import RestClient from './modules/rest-client';
import RestBaseModel from './modules/base-model';
import settings from './modules/settings';
import helper from './common/helper';

module.exports = {
  RestClient,
  RestBaseModel,
  settings: {
    addEndpoint: (endpoint) => {
      if (helper.isObject(endpoint) && endpoint.name && endpoint.value) {
        settings.endpoints[endpoint.name] = endpoint.value;
        if (endpoint.default) {
          if (settings.defaultEndpoint) {
            throw new Error('There can be only one default endpoint');
          }
          settings.defaultEndpoint = endpoint.name;
        }
      } else if (helper.isArray(endpoint)) {
        endpoint.map((item) => {
          if (item.name && item.value) {
            settings.endpoints[item.name] = item.value;
            if (item.default) {
              if (settings.defaultEndpoint) {
                throw new Error('There can be only one default endpoint');
              }
              settings.defaultEndpoint = item.name;
            }
          }
        });
      } else {
        throw new Error('Endpoint provided is not valid or its format is wrong. Correct format is { name = "", value = "" }.');
      }
    },
    addApiPath: (apiPath) => {
      if (helper.isObject(apiPath) && apiPath.name && apiPath.value) {
        settings.apiPaths[apiPath.name] = apiPath.value;
      } else if (helper.isArray(apiPath)) {
        apiPath.map((item) => {
          if (item.name && item.value) {
            settings.apiPaths[item.name] = item.value;
            if (item.default) {
              if (settings.defaultApiPath) {
                throw new Error('There can be only one default api path');
              }
              settings.defaultApiPath = item.name;
            }
          }
        });
      } else {
        throw new Error('ApiPaths provided is not valid or its format is wrong. Correct format is { name = "", value = "" }.');
      }
    },
    setDefaultEndpoint: (endpointName) => {
      if (endpointName && typeof endpointName === 'string') {
        if (settings.endpoints[endpointName]) {
          settings.defaultEndpoint = endpointName;
        } else {
          throw new Error('Endpoint name provided must be added to endpoints before.');
        }
      } else {
        throw new Error('Default endpoint name must be provided and its type must be string.');
      }
    },
    setDefaultApiPath: (apiPathName) => {
      if (apiPathName && typeof apiPathName === 'string') {
        if (settings.apiPaths[apiPathName]) {
          settings.defaultApiPath = apiPathName;
        } else {
          throw new Error('API path name provided must be added to ApiPaths before.');
        }
      } else {
        throw new Error('Default api path name must be provided and its type must be string.');
      }
    },
    setHeader: settings.setHeader
  },
};

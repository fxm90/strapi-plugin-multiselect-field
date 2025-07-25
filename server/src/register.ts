import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  //
  // Register custom field in on the server.
  //
  // - See also: https://docs.strapi.io/cms/features/custom-fields#registering-a-custom-field-on-the-server
  //
  strapi.customFields.register({
    name: 'multiselect-field',
    plugin: 'multiselect-field',

    // The data type stored in the database.
    type: 'string',
  });
};

export default register;

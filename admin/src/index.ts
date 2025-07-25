import { prefixKey } from './utils/prefixKey';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    //
    // Register custom field in the admin panel.
    //
    // - See also: https://docs.strapi.io/cms/features/custom-fields#registering-a-custom-field-in-the-admin-panel
    //
    app.customFields.register({
      name: 'multiselect-field',
      pluginId: `${PLUGIN_ID}`,
      type: 'string',
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: 'Multiselect',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage:
          'A custom field for Strapi that allows users to select multiple options from a predefined list.',
      },
      icon: PluginIcon,
      components: {
        Input: async () => import('./components/Multiselect'),
      },
      options: {
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: 'options.availableOptions',
                type: 'textarea-enum',
                intlLabel: {
                  id: prefixKey('options.availableOptions.label'),
                  defaultMessage: 'Available Options',
                },
                description: {
                  id: prefixKey('options.availableOptions.description'),
                  defaultMessage: 'One option per line.',
                },
                placeholder: {
                  id: prefixKey('options.availableOptions.placeholder'),
                  defaultMessage: 'Option 1\nOption 2\nOption 3',
                },
              },
              {
                name: 'options.delimiter',
                type: 'text',
                intlLabel: {
                  id: prefixKey('options.delimiter.label'),
                  defaultMessage: 'Delimiter',
                },
                description: {
                  id: prefixKey('options.delimiter.description'),
                  defaultMessage: 'The delimiter to use when storing the selected options.',
                },
                placeholder: {
                  id: prefixKey('options.delimiter.placeholder'),
                  defaultMessage: ',',
                },
                defaultValue: ',',
              },
            ],
          },
        ],

        //
        // Strapi default advanced options.
        //
        // - See also: https://github.com/strapi/strapi/blob/develop/packages/core/content-type-builder/admin/src/components/FormModal/attributes/attributeOptions.ts
        //
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'content-type-builder.form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'content-type-builder.form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'private',
                type: 'checkbox',
                intlLabel: {
                  id: 'content-type-builder.form.attribute.item.privateField',
                  defaultMessage: 'Private field',
                },
                description: {
                  id: 'content-type-builder.form.attribute.item.privateField.description',
                  defaultMessage: 'This field will not show up in the API response',
                },
              },
            ],
          },
        ],
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};

import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isBrand',
      type: 'checkbox',
      defaultValue: false,
      label: 'Is it a brand category ?',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Categories

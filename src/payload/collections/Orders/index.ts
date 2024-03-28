import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'
import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'stripePaymentIntentID',
      label: 'Stripe Payment Intent ID',
      type: 'text',
      admin: {
        position: 'sidebar',
        components: {
          Field: LinkToPaymentIntent,
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Infos',
          fields: [
            {
              name: 'orderedBy',
              type: 'relationship',
              relationTo: 'users',
              hooks: {
                beforeChange: [populateOrderedBy],
              },
            },
            {
              name: 'total',
              type: 'number',
              required: true,
              min: 0,
            },
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  required: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  min: 0,
                },
                {
                  name: 'quantity',
                  type: 'number',
                  min: 0,
                },
              ],
            },
          ],
        },
        {
          label: 'Address',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'line1',
                  label: 'Adresse',
                  type: 'text',
                  admin: {
                    width: '60%',
                  },
                },
                {
                  name: 'postal_code',
                  type: 'text',
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  admin: {
                    width: '60%',
                  },
                },
                {
                  name: 'country',
                  type: 'text',
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'line2',
                  label: 'Complément adresse',
                  type: 'text',
                  admin: {
                    width: '60%',
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

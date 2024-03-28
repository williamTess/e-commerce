import { PRODUCT } from './products'

export const ORDERS = `
  query Orders {
    Orders(limit: 300) {
      docs {
        id
      }
    }
  }
`

export const ORDER = `
  query Order($id: String ) {
    Orders(where: { id: { equals: $id}}) {
      docs {
        id
        orderedBy
        city
        country
        line1
        line2
        postal_code
        state    
        items {
          product ${PRODUCT}
          title
          priceJSON
        }
      }
    }
  }
`

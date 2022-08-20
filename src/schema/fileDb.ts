const fileDBSchema: any = {
  users: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        account: {
          type: 'string'
        },
        id: {
          type: 'string'
        },
        pass: {
          type: 'string'
        }
      }
    }
  }
}

export { fileDBSchema }

import { NODE_TYPES, OBJECT_TYPES } from "../utils/slate-utils"

export default {
  object: 'value',
  isVoid: false,
  document: {
    object: 'document',
    nodes: [
      {
        object: OBJECT_TYPES.block,
        type: NODE_TYPES.BLOCK1,
        nodes: [
          {
            object: 'text',
            leaves: [{ object: 'leaf', text: '', marks: [] }]
          }
        ]
      }
    ]
  }
}

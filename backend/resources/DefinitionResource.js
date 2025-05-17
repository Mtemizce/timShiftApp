const DefinitionResource = (definition) => ({
  id: definition.id,
  type: definition.type,
  key: definition.key,
  description: definition.description,
  active: definition.active,
  order: definition.order
})

export default DefinitionResource

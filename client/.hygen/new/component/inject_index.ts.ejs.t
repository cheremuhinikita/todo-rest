---
inject: true
to: <%= indexPath %>/index.ts
append: true
---
export * from './<%= component_name %>';
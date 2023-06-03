export function categorizeProduct(product: Product, rules: Rule[]): Product {
  for (const rule of rules) {
    for (const keyword of rule.keywords) {
      const rawTextField = product.name + product.description
      if (rawTextField.toLocaleLowerCase().includes(keyword)) {
        product.category.push(rule.category)
      }
    }
  }
  return product
}
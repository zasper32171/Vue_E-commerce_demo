from sendRequests import login, getAllProducts, deleteProduct

login()

products = getAllProducts()
for id in products.keys():
    deleteProduct(id)

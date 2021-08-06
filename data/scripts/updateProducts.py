from sendRequests import login, getAllProducts, updateProduct
import random

login()

products = getAllProducts()
productIdList = list(map(lambda p: p["id"], products.values()))

for product in products.values():
    productIdListCopy = productIdList.copy()
    productIdListCopy.remove(product["id"])
    product["recommends"] = random.sample(productIdListCopy, k=3)
    data = {"data": product}
    updateProduct(product["id"], data)

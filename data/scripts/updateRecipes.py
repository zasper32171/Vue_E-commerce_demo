from sendRequests import (
    login,
    getAllArticles,
    getArticle,
    updateArticle,
    getAllProducts,
)
import random

login()

articles = getAllArticles()
articleIdList = list(map(lambda a: a["id"], articles))
products = getAllProducts()
productIdList = list(map(lambda p: p["id"], products.values()))

for article in articles:
    article = getArticle(article["id"])
    articleIdListCopy = articleIdList.copy()
    articleIdListCopy.remove(article["id"])
    article["related"] = random.choice(productIdList)
    article["recommends"] = random.sample(articleIdListCopy, k=3)
    data = {"data": article}
    updateArticle(article["id"], data)

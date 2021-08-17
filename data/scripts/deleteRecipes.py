from sendRequests import login, getAllArticles, deleteArticle

login()

articles = getAllArticles()
for article in articles:
    deleteArticle(article["id"])

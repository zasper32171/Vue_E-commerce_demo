import os
import requests
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent.parent / ".env")

BASE_URL = os.getenv("BASE_URL")
API_PATH = os.getenv("API_PATH")
USERNAME = os.getenv("ADMIN_USERNAME")
PASSWORD = os.getenv("ADMIN_PASSWORD")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
}


def login():
    res = requests.post(
        f"{BASE_URL}/admin/signin",
        json={"username": USERNAME, "password": PASSWORD},
        headers=HEADERS,
    )

    handleError("Login image", res)

    content = res.json()

    HEADERS["Authorization"] = content["token"]


def uploadImage(file):
    res = requests.post(
        f"{BASE_URL}/api/{API_PATH}/admin/upload",
        headers=HEADERS,
        files=file,
    )

    handleError("Upload image", res)

    content = res.json()

    return content["imageUrl"]


def getAllProducts():
    res = requests.get(
        f"{BASE_URL}/api/{API_PATH}/admin/products/all",
        headers=HEADERS,
    )

    handleError("Get products", res)

    content = res.json()

    return content["products"]


def addProduct(product):
    res = requests.post(
        f"{BASE_URL}/api/{API_PATH}/admin/product",
        headers=HEADERS,
        json=product,
    )

    handleError("Add product", res)


def updateProduct(id, data):
    res = requests.put(
        f"{BASE_URL}/api/{API_PATH}/admin/product/{id}",
        headers=HEADERS,
        json=data,
    )

    handleError("Update product", res)


def deleteProduct(id):
    res = requests.delete(
        f"{BASE_URL}/api/{API_PATH}/admin/product/{id}",
        headers=HEADERS,
    )

    handleError("Delete product", res)


def getArticlesByPage(page):
    res = requests.get(
        f"{BASE_URL}/api/{API_PATH}/admin/articles?page={page}",
        headers=HEADERS,
    )

    handleError("Get articles", res)

    content = res.json()

    return content["articles"], content["pagination"]["has_next"]


def getAllArticles():
    articles = []
    page = 1
    has_next = True

    while has_next:
        tempArticles, has_next = getArticlesByPage(page)
        articles += tempArticles
        page += 1

    return articles


def getArticle(id):
    res = requests.get(
        f"{BASE_URL}/api/{API_PATH}/admin/article/{id}",
        headers=HEADERS,
    )

    handleError("Get article", res)

    content = res.json()

    return content["article"]


def addArticle(article):
    res = requests.post(
        f"{BASE_URL}/api/{API_PATH}/admin/article",
        headers=HEADERS,
        json=article,
    )

    handleError("Add article", res)


def updateArticle(id, article):
    res = requests.put(
        f"{BASE_URL}/api/{API_PATH}/admin/article/{id}",
        headers=HEADERS,
        json=article,
    )

    handleError("Update article", res)


def deleteArticle(id):
    res = requests.delete(
        f"{BASE_URL}/api/{API_PATH}/admin/article/{id}",
        headers=HEADERS,
    )

    handleError("Delete article", res)


def handleError(action, res):
    if res.status_code != requests.codes.ok:
        raise Exception(f"{action} fail: status code {res.status_code}")

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception(f'{action} fail: {content["message"]}')
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception(f'{action} fail: {", ".join(content["messages"])}')
        else:
            raise Exception(f"{action} fail: {content}")

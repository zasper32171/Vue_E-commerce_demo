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
        BASE_URL + "/admin/signin",
        json={"username": USERNAME, "password": PASSWORD},
        headers=HEADERS,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Login fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Login fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Login fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Login fail:", content)

    HEADERS["Authorization"] = content["token"]


def uploadImage(file):
    res = requests.post(
        BASE_URL + "/api/" + API_PATH + "/admin/upload",
        headers=HEADERS,
        files=file,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Upload image fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Upload image fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Upload image fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Upload image fail:", content)

    return content["imageUrl"]


def getAllProducts():
    res = requests.get(
        BASE_URL + "/api/" + API_PATH + "/admin/products/all",
        headers=HEADERS,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Get products fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Get product fail:" + content["messages"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Get products fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Get products fail:", content)

    return content["products"]


def addProduct(product):
    res = requests.post(
        BASE_URL + "/api/" + API_PATH + "/admin/product",
        headers=HEADERS,
        json=product,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Add product fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Add product fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Add product fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Add product fail:", content)


def updateProduct(id, data):
    res = requests.put(
        BASE_URL + "/api/" + API_PATH + "/admin/product/" + id,
        headers=HEADERS,
        json=data,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Update product fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Update product fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Update product fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Update product fail:", content)


def deleteProduct(id):
    res = requests.delete(
        BASE_URL + "/api/" + API_PATH + "/admin/product/" + id,
        headers=HEADERS,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Delete product fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Delete product fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Delete product fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Delete product fail:", content)


def getArticlesByPage(page):
    res = requests.get(
        BASE_URL + "/api/" + API_PATH + "/admin/articles?page=" + str(page),
        headers=HEADERS,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Get articles fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Get articles fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Get articles fail:" + ", ".join(content["message"]))
        else:
            raise Exception("Get articles fail:", content)

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
        BASE_URL + "/api/" + API_PATH + "/admin/article/" + id,
        headers=HEADERS,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Get articles fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Get articles fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Get articles fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Get articles fail:")

    return content["article"]


def addArticle(article):
    res = requests.post(
        BASE_URL + "/api/" + API_PATH + "/admin/article",
        headers=HEADERS,
        json=article,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Add article fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Add article fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Add article fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Add article fail:", content)


def updateArticle(id, article):
    res = requests.put(
        BASE_URL + "/api/" + API_PATH + "/admin/article/" + id,
        headers=HEADERS,
        json=article,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Update article fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Update article fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Update article fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Update article fail:", content)


def deleteArticle(id):
    res = requests.delete(
        BASE_URL + "/api/" + API_PATH + "/admin/article/" + id,
        headers=HEADERS,
    )

    if res.status_code != requests.codes.ok:
        raise Exception("Delete article fail: status code " + str(res.status_code))

    content = res.json()

    if content["success"] != True:
        if content["message"] & isinstance(content["message"], str):
            raise Exception("Delete article fail:" + content["message"])
        elif content["messages"] & isinstance(content["messages"], list):
            raise Exception("Delete article fail:" + ", ".join(content["messages"]))
        else:
            raise Exception("Delete article fail:", content)

from sendRequests import login, uploadImage, addArticle
from pathlib import Path
import csv
import json
import time
import random

file = Path(__file__).parent.parent / "data/recipes.csv"
imageDir = Path(__file__).parent.parent / "images/recipes"

login()

with open(file, encoding="UTF-8") as articleList:
    rows = csv.DictReader(articleList)
    articles = []

    for row in rows:
        index = row["index"]

        if index:
            imageUrl = uploadImage(
                {
                    "file-to-upload": open(
                        imageDir / ("cocktail-" + index + ".jpg"), "rb"
                    )
                }
            )
            article = {
                "data": {
                    "title": row["title"],
                    "subtitle": row["subtitle"],
                    "author": "Golden Ronny",
                    "content": {
                        "ingredients": [
                            {"name": row["ingredients"], "amount": row["amount"]}
                        ],
                        "steps": [row["steps"]],
                    },
                    "imageUrl": imageUrl,
                    "isPublic": True,
                }
            }
            articles.append(article)
        else:
            if row["ingredients"]:
                article["data"]["content"]["ingredients"].append(
                    {"name": row["ingredients"], "amount": row["amount"]}
                )
            if row["steps"]:
                article["data"]["content"]["steps"].append(row["steps"])

    random.shuffle(articles)

    for index, article in enumerate(articles):
        article["data"]["create_at"] = round(
            time.time() - index * 86400 + random.randint(-43200, 43200)
        )
        article["data"]["content"] = json.dumps(article["data"]["content"])

    for article in reversed(articles):
        addArticle(article)

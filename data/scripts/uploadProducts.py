from sendRequests import login, uploadImage, addProduct
from pathlib import Path
import csv
import json

file = Path(__file__).parent.parent / "data/products.csv"
imageDir = Path(__file__).parent.parent / "images/products"

login()

with open(file, encoding="UTF-8") as productList:
    rows = csv.DictReader(productList)
    products = []

    for row in rows:
        index = row["index"]
        imageUrl = uploadImage(
            {"file-to-upload": open(imageDir / ("product-" + index + ".jpg"), "rb")}
        )
        product = {
            "data": {
                "title": row["title"],
                "subtitle": row["subtitle"],
                "category": row["category"],
                "price": int(row["price"]),
                "origin_price": int(row["origin_price"]),
                "unit": row["unit"],
                "info": {
                    "vintage": int(row["vintage"]) if row["vintage"] else None,
                    "abv": float(row["abv"]),
                    "volume": row["volume"],
                },
                "content": json.dumps(
                    {
                        "main": row["main"],
                        "nose": row["nose"],
                        "palate": row["palate"],
                        "finish": row["finish"],
                    }
                ),
                "imageUrl": imageUrl,
                "is_enabled": 1,
            }
        }
        products.append(product)

    for product in products:
        addProduct(product)

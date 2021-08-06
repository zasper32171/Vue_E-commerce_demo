# golden-ronny

Frontend DEMO of E-commerce liquor store built with vue / vue-cli / vue-router.

Highly customed Bootstrap theme. Fully RWD.

Other packages:

- axios & vue-axios
- vue3-loading-overlay
- vee-validator

[Demo link](https://zasper32171.github.io/golden_ronny/)

## Project setup
#### Fill in .env
```
VUE_APP_API_BASE_URL = https://your_base_url.com
VUE_APP_API_PATH     = your_api_path
```

#### Get packages
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

## Populate data

#### Fill in fields in data/.env
```
BASE_URL       = https://your_base_url.com
API_PATH       = your_api_path
ADMIN_USERNAME = username@mail.com
ADMIN_PASSWORD = password123
```

#### Get required libraries
```
pip3 install -r data/requirements.txt
```

#### Inject data into database
```
./populate.sh
```

#### Clear all data
```
./depopulate.sh
```

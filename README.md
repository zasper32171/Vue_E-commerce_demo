# Golden Ronny

Frontend Demo of E-commerce liquor store website built with `vue` / `vue-cli` / `vue-router`.

Highly customed `Bootstrap` theme. Fully RWD.

[Demo link](https://zasper32171.github.io/golden_ronny/)

<img src="https://github.com/zasper32171/Vue_E-commerce_demo/blob/master/screenshots/screenshot-0.jpg" alt="Home Page" width="640"/>
<img src="https://github.com/zasper32171/Vue_E-commerce_demo/blob/master/screenshots/screenshot-1.jpg" alt="ProductsPage" width="640"/>
<img src="https://github.com/zasper32171/Vue_E-commerce_demo/blob/master/screenshots/screenshot-2.jpg" alt="Products Page on Mobile" width="280"/>


Packages:

- `axios` & `vue-axios`
- `vue3-loading-overlay`
- `vee-validator`

## Project setup
#### Fill in `.env`
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

#### Fill in `data/.env`
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

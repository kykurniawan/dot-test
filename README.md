# Node JS Product API

Aplikasi ini dibuat menggunakan framework Express, menerapkan pattern yang mirip dengan MVC dengan sedikit penyesuaian. Saya memisahkan kode untuk routing API endpoint, controller, dan middleware agar memudahkan ketika melelakukan upgrade. Untuk pengolahan database, saya menggunakan ORM yang bernama Prisma.

## Endpoint

### Get categories
```
GET /categories
```
response:
```json
{
	"status": 200,
	"message": "Ok",
	"data": {
		"categories": [
			{
				"id": "af319683-0a11-4456-9457-21e3df7bc797",
				"name": "Awesome Category",
				"createdAt": "2022-08-07T10:03:24.546Z",
				"products": []
			}
		]
	}
}
```

### Get category by id
```
GET /categories/af319683-0a11-4456-9457-21e3df7bc797
```
response:
```json
{
	"status": 200,
	"message": "Ok",
	"data": {
		"category": {
			"id": "af319683-0a11-4456-9457-21e3df7bc797",
			"name": "Awesome Category",
			"createdAt": "2022-08-07T10:03:24.546Z",
			"products": []
		}
	}
}
```

### Create category
```
POST /categories
```
body:
```json
{
  "name": "New Category",
}
```
response:
```json
{
	"status": 201,
	"message": "Category Created",
	"data": {
		"category": {
			"id": "af319683-0a11-4456-9457-21e3df7bc797",
			"name": "Awesome Category",
			"createdAt": "2022-08-07T10:03:24.546Z"
		}
	}
}
```

### Update category by id
```
PUT /categories/af319683-0a11-4456-9457-21e3df7bc797
```
body:
```json
{
	"name": "New Category Edit"
}
```
response:
```json
{
	"status": 200,
	"message": "Category Updated",
	"data": {
		"category": {
			"id": "af319683-0a11-4456-9457-21e3df7bc797",
			"name": "New Category Edit",
			"createdAt": "2022-08-07T10:03:24.546Z"
		}
	}
}
```

### Delete category by id
```
DELETE /categories/af319683-0a11-4456-9457-21e3df7bc797
```
response:
```json
{
	"status": 200,
	"message": "Category Deleted",
	"data": null
}
```

### Get products
```
GET /products
```
response:
```json
{
	"status": 200,
	"message": "Ok",
	"data": {
		"products": [
			{
				"id": "a745450b-a2d7-41de-ae44-9c8efea04f6d",
				"name": "New Product",
				"price": 30000,
				"active": false,
				"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
				"createdAt": "2022-08-07T10:10:47.873Z",
				"category": {
					"id": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
					"name": "Awesome Category",
					"createdAt": "2022-08-07T10:10:34.426Z"
				}
			}
		]
	}
}
```

### Get product by id
```
GET /products/a745450b-a2d7-41de-ae44-9c8efea04f6d
```
response:
```json
{
	"status": 200,
	"message": "Ok",
	"data": {
		"product": {
			"id": "a745450b-a2d7-41de-ae44-9c8efea04f6d",
			"name": "New Product",
			"price": 30000,
			"active": false,
			"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
			"createdAt": "2022-08-07T10:10:47.873Z",
			"category": {
				"id": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
				"name": "Awesome Category",
				"createdAt": "2022-08-07T10:10:34.426Z"
			}
		}
	}
}
```

### Create Product
```
POST /products
```
body:
```json
{
	"name": "New Product",
	"price": 30000,
	"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b"
}
```
response:
```json
{
	"status": 201,
	"message": "Product Created",
	"data": {
		"product": {
			"id": "a745450b-a2d7-41de-ae44-9c8efea04f6d",
			"name": "New Product",
			"price": 30000,
			"active": false,
			"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
			"createdAt": "2022-08-07T10:10:47.873Z"
		}
	}
}
```

### Update product by id
```
PUT /products/a745450b-a2d7-41de-ae44-9c8efea04f6d
```
body:
```json
{
	"name": "New Product Update",
	"price": 300000,
	"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b"
}
```
response:
```json
{
	"status": 200,
	"message": "Product Updated",
	"data": {
		"product": {
			"id": "a745450b-a2d7-41de-ae44-9c8efea04f6d",
			"name": "New Product Update",
			"price": 300000,
			"active": false,
			"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
			"createdAt": "2022-08-07T10:10:47.873Z"
		}
	}
}
```

### Activate product by id
```
PATCH /products/a745450b-a2d7-41de-ae44-9c8efea04f6d/activate
```
response:
```json
{
	"status": 200,
	"message": "Product Activated",
	"data": {
		"product": {
			"id": "a745450b-a2d7-41de-ae44-9c8efea04f6d",
			"name": "New Product Update",
			"price": 300000,
			"active": true,
			"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
			"createdAt": "2022-08-07T10:10:47.873Z"
		}
	}
}
```

### Deactivate product by id
```
PATCH /products/a745450b-a2d7-41de-ae44-9c8efea04f6d/deactivate
```
response:
```json
{
	"status": 200,
	"message": "Product Deactivated",
	"data": {
		"product": {
			"id": "a745450b-a2d7-41de-ae44-9c8efea04f6d",
			"name": "New Product Update",
			"price": 300000,
			"active": false,
			"categoryId": "db4a6782-35b9-4db9-9fb1-2d352ed8df2b",
			"createdAt": "2022-08-07T10:10:47.873Z"
		}
	}
}
```

### Delete product by id
```
DELETE /products/a745450b-a2d7-41de-ae44-9c8efea04f6d
```
response:
```json
{
	"status": 200,
	"message": "Product Deleted",
	"data": null
}
```

## Cara Menjalankan Aplikasi

Clone project

Menggunakan https:
```
https://github.com/kykurniawan/dot-test.git
```

Menggunakan ssh:
```
git@github.com:kykurniawan/dot-test.git
```

Install install package:
```
npm install
```

Konfigurasi environment variables

1. PORT -> Application port
2. DATABASE_URL -> MySQL database url
3. REDIS_URL -> Redis url for cache

Jalankan migrasi
```
npm run migrate-dev
```

Jalankan aplikasi:
```
npm run dev
```

Menjalankan end to end testing
```
npm test
```

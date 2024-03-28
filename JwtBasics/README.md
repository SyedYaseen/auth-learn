### Requests:

To register:

```
  curl -X POST http://localhost:3000/users/register \
   -H "Content-Type: application/json" \
   -d '{"username": "usr", "password": "123", "admin": "false"}'
```

To login:
Right creds

```
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "usr", "password": "123", "admin": "false"}'
```

Wrong creds

```
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "usr", "password": "111", "admin": "false"}'
```

curl -X GET http://localhost:3000/users/protected -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWZlMTVkYjY5YThlMzQ1NTE0OTk0ZTkiLCJpYXQiOjE3MTE0ODkwMzI0NDMsImV4cCI6MTcxMTQ4OTExODg0M30.sSU3G8pZ7VEPlh-rQswLk6srqz4X1DjKa03mWWmhgRLD13LLayKoDkIZP8evwi3bdbZI9tZJHGgM9hyMmVUdIrlW-aqzhM9iI_7j5wY4LCFDFBGuKI1vo8lsW0r2efNf7nw8hIWHogrfxKhebv6y-3VuCqw1ybCB0pKnfJo4hsL6wjf-f9vx_kFu7oAds4jIEmpucVed8ZxMyiUqg22Ok-VyIxQAD24jIdLJUFUVieeeRUUUlk2NikpsGVO9MO1J2L8eJdw4AvFL_VsUSh7tEv3jyPBikAgbfvkcK-cA4KCKnfARZGVrWegsQT3m4IH6O0RdYDBi90PMRWz41kC0bLA0k0q3O0mAb0F74G14jIohp32UbSuL_lPGr7SGxmLQu-DQ3F2O_d9JgfI1fQYs76aFkHOHQUemOrLk37emEXdrNTiGgeumocQbnCkWzdaKk1Xhh56zcUdR_WB0FfxcwkKSTGtqMRp1cwAqE5DPVuGqvBx-N7_fQan_sCBE55nvENr6KNycVacDzOi1-4QAsTXQqs2fbNGeqKOnnZ7MzXsT7PSA2FSGwAgEFDPSwot2HwNmBFtzYddKzTnfxwGhT9DwtytyEaM9QbGYiyFjCJKpVOY2_HKi3igSt3M3eCnYYRmc8U1fP8EZNOPSvDyZhWmbkAebAWz8Fhw0zeSueP4"

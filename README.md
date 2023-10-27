# QAppWeb

Run localy compiled version

``` bash
docker run --rm -p 8000:80 -v ./dist/:/usr/share/nginx/html -v ./nginx.conf:/etc/nginx/conf.d/default.conf nginx:alpine 
```

## TODO:
- [X] structure
- [X] bootstrap

- [ ] auth_svc: ??? localstorage or storageSvc

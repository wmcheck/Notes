# Мультидоменный самоподписной сертификат OpenSSL

Создать файл конфигурации *.cnf, что бы ручками потом не вводить
```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = RU
ST = Moscow
L = Moscow
O = MY COMPANY

[v3_req]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
basicConstraints = CA:TRUE
subjectAltName = @alt_names

[alt_names]
DNS.1 = test.mycompany.ru
DNS.2 = test
IP.1 = 192.168.1.1
```

## Создание приватного ключа:
```
openssl genrsa -out test.key 2048
```
## Создание сертификата, используя ранее созданные конфигурационный файл и файл приватного ключа:
```
openssl req -new -x509 -sha256 -days 3650 -key test.key -out test.crt -config test.cnf
```

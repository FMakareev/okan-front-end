### Ошибка: `message: 'request to {domen} failed, reason: Hostname/IP doesn\'t match certificate\'s altnames: "Host: {domen}. is not in the cert\'s altnames: DNS:{domen}"'`

Ошибка возникает из-за того что node.js проверяет сертификаты при выполнении запросов.  

Решений проблемы несколько:

1. сделать сертификат для сайта
2. В apollo-client сервера в createHttpLink добавить:

```
fetchOptions: {
  agent: new https.Agent({ rejectUnauthorized: false }),
},
```

https - это модуль node.js, про rejectUnauthorized [тут](https://nodejs.org/docs/latest/api/tls.html#tls_new_tls_tlssocket_socket_options)

3. Запустить сервак с env переменной --NODE_TLS_REJECT_UNAUTHORIZED=0

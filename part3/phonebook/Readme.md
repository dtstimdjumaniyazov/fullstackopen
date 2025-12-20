online application https://fullstackopen-cm3r.onrender.com/

### Available `GET` endpoints

1. https://fullstackopen-cm3r.onrender.com/`api/persons`

Example of `JSON` response:
```
 [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
```

2. https://fullstackopen-cm3r.onrender.com/info

Response type: text/html
```Date``` is generated dynamically on each request

```
Phonebook has info for  4 people<p>Sat Dec 20 2025 20:31:50 GMT+0000 (Coordinated Universal Time)</p>
 ```

3. https://fullstackopen-cm3r.onrender.com/api/persons/2

Example of JSON response:
```
{
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
}
```

---

### Available `DELETE` endpoint

https://fullstackopen-cm3r.onrender.com/api/persons/2

Deletes a person by ```id```. <br>
Returns ```204 No Content``` if deletion is <strong>successful</strong>.

---
### Available `POST` endpoint

https://fullstackopen-cm3r.onrender.com/api/persons

BODY:
```
{
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
}
```

JSON response with HTTP status ```201 created```:
```
{
    "id": "5",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
}
```
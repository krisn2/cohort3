# steps 

```
npm init -y 
npm install typescript 
npx tsc --init
npx prisma --init 

```

tsconfig.json

```
"rootDir":"./src"
"outDir":"./dist"

```

add models in
prisma/schema.prisma


To migrate the schema

```` 
npx prisma migrate dev 

```

and after that autogenerate client 

```
npx prisma generate

```
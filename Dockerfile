FROM hasura/graphql-engine:v2.12.1

CMD graphql-engine serve --server-port $PORT

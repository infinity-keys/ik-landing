FROM hasura/graphql-engine:v2.11.1

CMD graphql-engine serve --server-port $PORT

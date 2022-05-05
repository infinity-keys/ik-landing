FROM hasura/graphql-engine:v2.6.1

CMD graphql-engine serve --server-port $PORT

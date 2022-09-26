FROM hasura/graphql-engine:v2.12.0

CMD graphql-engine serve --server-port $PORT

FROM hasura/graphql-engine:v2.6.0

CMD graphql-engine serve --server-port $PORT

FROM hasura/graphql-engine:v2.7.0

CMD graphql-engine serve --server-port $PORT

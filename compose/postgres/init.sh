#!/bin/sh

set -eu

psql -v ON_ERROR_STOP=1 -U $POSTGRES_USER <<-EOF
CREATE USER postgres;
ALTER USER postgres WITH SUPERUSER;
ALTER USER postgres PASSWORD 'password';
CREATE DATABASE postgres;
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
CREATE DATABASE postgres;
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
EOF

psql -v ON_ERROR_STOP=1 -U $POSTGRES_USER -d postgres <<-EOF
ALTER SCHEMA public OWNER TO postgres;
GRANT ALL ON SCHEMA public TO postgres;
EOF

psql -v ON_ERROR_STOP=1 -U $POSTGRES_USER -d postgres <<-EOF
ALTER SCHEMA public OWNER TO postgres;
GRANT ALL ON SCHEMA public TO postgres;
EOF

create table document_metadata (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  file_name text not null,
  file_type text not null,
  file_location text not null,
  file_size bigint not null,
  file_hash text not null,
  processing_status text not null,
  reprocessed boolean not null,
  processing_time interval not null
);

create table document_content (
  id uuid not null default extensions.uuid_generate_v4 (),
  document_id uuid references document_metadata (id),
  parsing_result_markdown text not null,
  structured_output_json jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table schemas (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  description text,
  zod_schema text not null,
  is_default boolean not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table document_schemas (
  document_id bigint references documents (id),
  schema_id bigint references schemas (id),
  primary key (document_id, schema_id)
);

create table schedules (
  id uuid not null default extensions.uuid_generate_v4 (),
  trigger_type text not null,
  status text,
  last_run timestamp with time zone,
  next_run timestamp with time zone not null,
  files_processed int,
  total_run_time interval,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table aws_credentials (
  id uuid not null default extensions.uuid_generate_v4 (),
  access_key_id text not null,
  secret_access_key text not null,
  bucket_name text not null,
  region text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table azure_credentials (
  id bigint primary key generated always as identity,
  connection_string text not null,
  container_name text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

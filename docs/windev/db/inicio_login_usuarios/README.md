README - Inicio/Login/Usuarios metadata (generated from DDL.sql)

Why:
- The uploaded columns.json appears truncated at ~64KB (sqlcmd line width/output limits).
- To unblock the project, this pack regenerates tables/columns/indexes/keys from the DDL.sql export (UTF-16).

Counts:
- tables: 10
- columns: 844
- indexes: 15
- keys (PK columns): 11
- foreign_keys found in DDL: 0

Missing CREATE TABLE blocks in DDL extraction:
- none

Recommendation for future JSON exports:
- Use SSMS Results To Text and save the single json value, OR
- sqlcmd with wide output: sqlcmd ... -w 65535 -y 0 -Y 0

# Intégration SQL Server

Scripts T-SQL d'alimentation de la table de faits `dbo.Licences_Federation` (serveur `diouet`, base `BDD`) à partir des CSV INJEP.

| Ordre | Script | Rôle |
|---:|---|---|
| 1 | `01_creation_structure.sql` | Base, schéma `stg`, table brute, table typée (columnstore), journal |
| 2 | `02_chargement_csv.sql` | Procédures de chargement d'un fichier et du millésime complet |
| 3 | `03_vues_dimensions.sql` | Vues `vw_Dim_*` lues par le référentiel Excel |
| 4 | `04_controles_qualite.sql` | Contrôles après chargement (volumes de référence inclus) |

```sql
EXEC dbo.usp_Charger_Millesime_Licences @Dossier = N'C:\...\LicencesFederations\data\2025\';
```

> Le dossier doit être lisible par le **compte de service SQL Server**.
> **Scripts reconstruits** le 06/11/2026 : le code d'origine a été perdu. Ils reproduisent la table lue par Power BI (mêmes colonnes, mêmes règles, 8 211 478 lignes). Détails dans [docs/04](../docs/04_Integration_SQL_PowerQuery.md).

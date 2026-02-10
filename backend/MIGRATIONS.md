# Database Migrations

Este projeto usa o **Flyway** para gerenciar as migrations do banco de dados.

## Estrutura de Migrations

As migrations ficam em: `src/main/resources/db/migration/`

## Nomenclatura

As migrations devem seguir o padrão:
```
V{versão}__{descrição}.sql
```

Exemplos:
- `V1__create_user_table.sql`
- `V2__add_user_role_column.sql`
- `V3__create_product_table.sql`

**Importante:**
- Use `V` maiúsculo
- Use número sequencial (1, 2, 3...)
- Use dois underscores (`__`) entre versão e descrição
- Use snake_case para a descrição

## Como criar uma nova migration

1. Crie um novo arquivo SQL em `src/main/resources/db/migration/`
2. Nomeie seguindo o padrão: `V{próximo_número}__{descrição}.sql`
3. Escreva o SQL necessário

Exemplo:
```sql
-- V2__add_user_role_column.sql
ALTER TABLE "user" ADD COLUMN role VARCHAR(50) DEFAULT 'USER';
```

## Como executar as migrations

As migrations são executadas automaticamente quando a aplicação inicia, graças à configuração:

```properties
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
```

## Comandos úteis

### Ver status das migrations
```bash
./gradlew flywayInfo
```

### Validar migrations
```bash
./gradlew flywayValidate
```

### Limpar banco (⚠️ CUIDADO - apaga tudo!)
```bash
./gradlew flywayClean
```

### Executar migrations manualmente
```bash
./gradlew flywayMigrate
```

## Boas práticas

1. **Nunca altere uma migration que já foi executada em produção**
2. **Sempre teste suas migrations antes de commitar**
3. **Use transações quando possível**
4. **Faça rollback manual se necessário** (crie uma migration reversa)
5. **Documente migrations complexas**

## Migrations existentes

- **V1__create_user_table.sql**: Cria a tabela de usuários com campos básicos e timestamps


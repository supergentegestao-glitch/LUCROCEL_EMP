# Contribuindo para SuperGente +LUCRO

Obrigado por considerar contribuir para o projeto SuperGente +LUCRO! Este documento fornece diretrizes e instruções para contribuir.

## 🤝 Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor abra uma issue com:

1. **Título descritivo** do problema
2. **Descrição detalhada** do que aconteceu
3. **Passos para reproduzir** o problema
4. **Comportamento esperado** vs. **comportamento atual**
5. **Screenshots** (se aplicável)
6. **Informações do dispositivo**: modelo, versão do Android/iOS

### Sugerindo Melhorias

Para sugerir uma melhoria:

1. Use um **título claro e descritivo**
2. Forneça uma **descrição detalhada** da sugestão
3. Explique **por que** essa melhoria seria útil
4. Liste **exemplos** de como seria usada

### Pull Requests

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature: `git checkout -b feature/sua-feature`
4. **Faça commits** com mensagens claras
5. **Push** para sua branch: `git push origin feature/sua-feature`
6. **Abra um Pull Request** descrevendo suas mudanças

## 📋 Diretrizes de Código

### Estilo de Código

- Use **TypeScript** para type safety
- Siga o **ESLint** configurado no projeto
- Use **camelCase** para variáveis e funções
- Use **PascalCase** para componentes React
- Adicione **comentários** para código complexo

### Commits

Mensagens de commit devem ser:

- **Claras e descritivas**
- Começar com um verbo (Add, Fix, Update, Remove, etc.)
- Estar em **inglês**
- Exemplo: `Add PDF viewer support for Android`

### Testes

Antes de fazer um Pull Request:

1. Teste localmente em Android e iOS
2. Verifique se não há erros de console
3. Teste em múltiplos dispositivos/tamanhos de tela

## 🔧 Configuração de Desenvolvimento

### Preparar Ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/supergente-lucro.git
cd supergente-lucro

# Instale dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm start
```

### Executar Testes

```bash
# Verificar linting
pnpm run lint

# Executar no Android
pnpm run android

# Executar no iOS
pnpm run ios
```

## 📝 Estrutura de Branches

- `main` - Versão estável em produção
- `develop` - Versão em desenvolvimento
- `feature/*` - Novas features
- `fix/*` - Correções de bugs
- `docs/*` - Atualizações de documentação

## 🎯 Processo de Review

1. Um mantenedor revisará seu PR
2. Pode haver pedidos de mudanças
3. Após aprovação, será feito merge
4. Sua contribuição será creditada

## 📚 Documentação

Se você adicionar uma nova feature, por favor:

1. Atualize o `README.md` se necessário
2. Adicione comentários no código
3. Atualize o `CHANGELOG.md`

## 🚀 Release Process

As versões seguem **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **MAJOR**: Mudanças incompatíveis
- **MINOR**: Novas features compatíveis
- **PATCH**: Correções de bugs

## 📞 Comunicação

- Use **Issues** para discussões sobre features
- Use **Pull Requests** para mudanças de código
- Seja **respeitoso** e **construtivo** em todas as interações

## ✅ Checklist para Pull Request

Antes de submeter seu PR, verifique:

- [ ] Código segue o estilo do projeto
- [ ] Testei localmente em Android
- [ ] Testei localmente em iOS
- [ ] Adicionei comentários onde necessário
- [ ] Atualizei a documentação
- [ ] Não há console errors ou warnings
- [ ] Mensagens de commit são claras

## 🙏 Agradecimentos

Obrigado por contribuir para melhorar o SuperGente +LUCRO!

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2025

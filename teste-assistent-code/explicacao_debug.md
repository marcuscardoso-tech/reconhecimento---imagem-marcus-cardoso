# Análise de Erros - debug.py

## 🔍 Resumo dos Erros Identificados

O código original continha **4 erros principais** que impediam sua execução. Abaixo está a análise detalhada de cada um.

---

## ❌ Erro 1: Falta de Aspas na String

### 📍 Localização
**Linha 5:**
```python
item1 = float(input(Preço do item 1? ))
```

### 🐛 Problema
A string `"Preço do item 1? "` não possui **aspas de delimitação**. Python não consegue identificar onde a string começa e termina.

### 💥 Erro Gerado
```
SyntaxError: invalid syntax
```

### ✅ Correção
```python
item1 = float(input("Preço do item 1: "))
```

### 📝 Explicação
- **Antes:** `input(Preço do item 1? )` ← Python tenta interpretar como variável
- **Depois:** `input("Preço do item 1: ")` ← String corretamente delimitada com aspas duplas

---

## ❌ Erro 2: F-String Faltando em Print

### 📍 Localização
**Linha 27:**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```

### 🐛 Problema
A string tenta usar **interpolação de variável** (`{total_item2:.2f}`), mas **não é uma f-string** (falta o prefixo `f`). Sem o `f`, Python exibe o texto literalmente.

### 💥 Erro Gerado
**Saída incorreta:**
```
Item 2:        R$ {total_item2:.2f}
```

Em vez de:
```
Item 2:        R$ 150.00
```

### ✅ Correção
```python
print(f" Item 2:        R$ {total_item2:.2f}")
```

### 📝 Explicação
- **Antes:** `print(" Item 2:        R$ {total_item2:.2f}")` ← Imprime texto literal
- **Depois:** `print(f" Item 2:        R$ {total_item2:.2f}")` ← F-string: interpola a variável
- **F-string:** É necessário adicionar `f` antes das aspas para ativar a interpolação

---

## ❌ Erro 3: String Convertida em Float para Comparação

### 📍 Localização
**Linha 22:**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

### 🐛 Problema
A função `input()` **sempre retorna uma string**, não um número. Na linha 31, o código tenta comparar:

```python
if desconto_cupom > 0:
```

Python **não consegue comparar string com número** corretamente. Uma string sempre é "maior" do que um número em comparações diretas, causando lógica incorreta.

### 💥 Erro Gerado
**Comparação incorreta:**
```python
"5" > 0  # Resulta em True (comparação não numérica)
"0" > 0  # Resulta em True (não é False como esperado!)
```

### ✅ Correção
```python
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

### 📝 Explicação
- **input()** retorna: `"5"` (string)
- Precisa converter: `float("5")` → `5.0` (número)
- Agora a comparação funciona corretamente: `5.0 > 0` → `True`

**Exemplo visual:**
```
❌ Errado:
input() → "10"
if "10" > 0:  ← Comparação de string vs número (impreciso!)

✅ Correto:
input() → "10"
float("10") → 10.0
if 10.0 > 0:  ← Comparação de números (preciso!)
```

---

## ❌ Erro 4: Indentação Incorreta

### 📍 Localização
**Linha 31-32:**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

### 🐛 Problema
A linha 32 (print) **não está indentada** dentro do bloco `if`. Em Python, a indentação é **obrigatória** para definir blocos de código.

### 💥 Erro Gerado
```
IndentationError: expected an indented block
```

### ✅ Correção
```python
if desconto_cupom > 0:
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

### 📝 Explicação
- **Indentação:** Python usa espaços/tabs para definir escopo
- **Sem indentação:** print() execute **sempre**, não apenas quando desconto > 0
- **Com indentação:** print() execute **apenas dentro do if**

**Visualização:**
```
❌ Errado:
if desconto_cupom > 0:    ← Não tem corpo indentado
print(...)                ← Erro: falta indentação

✅ Correto:
if desconto_cupom > 0:    ← Definição do if
    print(...)            ← 4 espaços de indentação (corpo do if)
```

---

## 📊 Tabela de Resumo dos Erros

| Erro | Linha | Tipo | Cause | Impacto |
|------|-------|------|-------|---------|
| 1 | 5 | Sintaxe | Falta de aspas | ❌ Código não executa |
| 2 | 27 | Lógica | F-string faltando | ⚠️ Saída incorreta |
| 3 | 22 | Tipo de Dados | String vs Float | ⚠️ Lógica incorreta |
| 4 | 32 | Indentação | Falta de indentação | ❌ Código não executa |

---

## ✅ Código Corrigido

```python
#                         CÓDIGO CORRIGIDO                           
# ENTRADA DE DADOS
cliente = input("Qual é seu nome? ")

qtd1 = int(input("Quantidade do item 1: "))
item1 = float(input("Preço do item 1: "))

qtd2 = int(input("Quantidade do item 2: "))
item2 = float(input("Preço do item 2: "))

qtd3 = int(input("Quantidade do item 3: "))
item3 = float(input("Preço do item 3: "))

# CÁLCULOS DOS ITENS
total_item1 = qtd1 * item1
total_item2 = qtd2 * item2
total_item3 = qtd3 * item3

subtotal = total_item1 + total_item2 + total_item3
imposto = subtotal * 0.10

# DESCONTO
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)

# TOTAL FINAL
total = subtotal + imposto - desconto

# EXIBIÇÃO
linha = "=" * 31
separador = "-" * 31

print(linha)
print(f" Cliente: {cliente}")
print(linha)
print(f" Item 1:        R$ {total_item1:.2f}")
print(f" Item 2:        R$ {total_item2:.2f}")
print(f" Item 3:        R$ {total_item3:.2f}")
print(separador)
print(f" Subtotal:      R$ {subtotal:.2f}")
print(f" Imposto (10%): R$ {imposto:.2f}")

if desconto_cupom > 0:
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")

print(linha)
print(f" TOTAL:         R$ {round(total, 2):.2f}")
print(linha)
```

---

## 🎯 Exemplo de Execução

**Entrada do usuário:**
```
Qual é seu nome? João Silva
Quantidade do item 1: 2
Preço do item 1: 50.00
Quantidade do item 2: 3
Preço do item 2: 30.00
Quantidade do item 3: 1
Preço do item 3: 100.00
Você tem um cupom de desconto? (Digite o percentual ou 0): 5
```

**Saída esperada:**
```
===============================
 Cliente: João Silva
===============================
 Item 1:        R$ 100.00
 Item 2:        R$ 90.00
 Item 3:        R$ 100.00
-------------------------------
 Subtotal:      R$ 290.00
 Imposto (10%): R$ 29.00
 Desconto (5%): -R$ 14.50
===============================
 TOTAL:         R$ 304.50
===============================
```

---

## 🎓 Conceitos Aprendidos

### ✅ Strings em Python
- Delimitação com aspas duplas `"texto"` ou simples `'texto'`
- F-strings: `f"variável = {variavel}"`

### ✅ Conversão de Tipos
- `int()` - converte para inteiro
- `float()` - converte para número decimal
- `input()` sempre retorna string!

### ✅ Indentação em Python
- **Obrigatória** para blocos `if`, `for`, `while`, funções
- Geralmente **4 espaços**
- Define o escopo do código

### ✅ Comparação de Dados
- Compare números com números (`5.0 > 0`)
- Não compare strings com números (`"5" > 0` é ambíguo)

---

## 💡 Dicas para Evitar Esses Erros

1. **Use uma IDE/Editor com syntax highlighting:** VS Code destaca erros automaticamente
2. **Teste incrementalmente:** Execute o código em pequenos pedaços
3. **Valide tipos de dados:** Sempre converta `input()` para o tipo correto
4. **Use f-strings:** Adicione `f` antes de strings com variáveis
5. **Cuidado com indentação:** Use um editor que mostra espaços em branco

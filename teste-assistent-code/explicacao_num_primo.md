# Explicação da Função eh_primo()

## O que é um número primo?

Um **número primo** é um número natural maior que 1 que possui exatamente dois divisores: 1 e ele mesmo. Por exemplo:
- **2, 3, 5, 7, 11, 13, 17, 19, 23, 29** são números primos
- **4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20** não são primos (possuem mais divisores)

## Como a função funciona

### Estrutura geral

```python
def eh_primo(numero):
```

A função recebe um parâmetro `numero` (inteiro) e retorna:
- `True` → se o número é primo
- `False` → se o número não é primo

---

## Análise linha por linha

### 1️⃣ Verificação: números menores que 2

```python
if numero < 2:
    return False
```

**Por quê?** Números menores que 2 (como 0, 1 e negativos) **não são primos** por definição. Um número primo deve ser maior que 1.

**Exemplo:**
- `eh_primo(0)` → `False`
- `eh_primo(1)` → `False`
- `eh_primo(-5)` → `False`

---

### 2️⃣ Verificação: o número 2

```python
if numero == 2:
    return True
```

**Por quê?** O número **2 é o único número primo par**. Todos os outros números pares são divisíveis por 2, então não podem ser primos.

**Exemplo:**
- `eh_primo(2)` → `True`

---

### 3️⃣ Verificação: números pares maiores que 2

```python
if numero % 2 == 0:
    return False
```

**O que é `%`?** O operador `%` (módulo) calcula o **resto de uma divisão**.

**Por quê?** Se um número é par (resto da divisão por 2 é 0) e não é 2, então não é primo. Isso elimina muitos números de uma só vez!

**Exemplo:**
- `4 % 2 = 0` → `eh_primo(4)` → `False`
- `10 % 2 = 0` → `eh_primo(10)` → `False`

---

### 4️⃣ Verificação: divisibilidade por números ímpares

```python
i = 3
while i * i <= numero:
    if numero % i == 0:
        return False
    i += 2
```

**O que faz?** Verifica se o número é divisível por números ímpares (3, 5, 7, 9, 11, ...) até um certo limite.

**Detalhes importantes:**

- **`while i * i <= numero`**: Por que multiplica `i` por `i`?
  - Porque se um número `n` possui um divisor maior que sua raiz quadrada, ele também deve ter um divisor **menor** que sua raiz quadrada
  - **Exemplo:** Para verificar se 29 é primo, só precisa testar até √29 ≈ 5.4
  - Isso torna o algoritmo muito mais rápido!

- **`i += 2`**: Por que aumenta de 2 em 2?
  - Porque testamos todos os números pares? Não! Já descartamos pares na etapa anterior
  - Aumentando de 2 em 2 a partir de 3 (3, 5, 7, 9, 11...), testamos apenas números **ímpares**
  - Isso reduz bastante o número de verificações!

- **`if numero % i == 0`**: Se encontrar um divisor, o número **não é primo**

**Exemplo prático para 29:**
- i = 3: 29 % 3 = 2 (não divide)
- i = 5: 29 % 5 = 4 (não divide)
- i = 7: 7 * 7 = 49, e 49 > 29, então **para o loop**
- **Resultado:** 29 é primo ✓

---

### 5️⃣ Retorno final

```python
return True
```

Se nenhuma divisão foi encontrada, o número **é primo**!

---

## Fluxograma da função

```
┌─ Entrada: numero
│
├─ numero < 2? ──→ SIM → Retorna False (não é primo)
│
├─ numero == 2? ──→ SIM → Retorna True (2 é primo)
│
├─ numero % 2 == 0? ──→ SIM → Retorna False (é par)
│
├─ Testa divisibilidade por 3, 5, 7, 9, ... até √numero
│  ├─ Encontrou divisor? ──→ SIM → Retorna False
│  └─ Não encontrou divisor? → Retorna True (é primo)
│
└─ Fim
```

---

## Exemplos de execução

| Número | Verificações | Resultado | Motivo |
|--------|--------------|-----------|--------|
| 1 | - | `False` | Menor que 2 |
| 2 | - | `True` | É o único primo par |
| 4 | Resto por 2 = 0 | `False` | É par |
| 17 | 17 % 3 = 2, 17 % 5 = 2, √17 ≈ 4.1 | `True` | Sem divisores |
| 20 | Resto por 2 = 0 | `False` | É par |
| 29 | 29 % 3 = 2, 29 % 5 = 4, √29 ≈ 5.4 | `True` | Sem divisores |

---

## Complexidade e Eficiência

- **Tempo**: O(√n) - muito eficiente!
- **Espaço**: O(1) - usa apenas variáveis simples
- **Por que é rápido?** Porque reduz drasticamente o número de verificações usando:
  1. Verificação de pares (elimina metade dos números)
  2. Limite de raiz quadrada (reduz verificações pela metade novamente)
  3. Incremento de 2 (testa apenas números ímpares)

---

## Como usar a função

```python
print(eh_primo(17))   # True
print(eh_primo(20))   # False
print(eh_primo(2))    # True
print(eh_primo(100))  # False
```

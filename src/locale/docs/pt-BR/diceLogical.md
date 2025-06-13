**Comparação Lógica de Dado** é um **nó do tipo modificador** utilizado para realizar comparações lógicas entre dois conjuntos de dados numéricos. As operações disponíveis incluem igualdade, maior ou igual, e menor ou igual. Esse nó retorna `1` quando a condição é verdadeira e `0` quando é falsa, permitindo construir regras e condições em sistemas de simulação.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Compara dois valores de entrada com base em uma operação lógica
- **Saída:** `1` para verdadeiro, `0` para falso

---

## **Propriedades**

### **ID do Nó**

- **Tipo:** Texto
- **Padrão:** ID aleatório
- **Função:** Identificador único do nó

### **Status**

- **Tipo:** `Finalizado` | `Ocioso` | `Erro` | `Carregando` | `Faltando dados`
- **Padrão:** `Ocioso`
- **Função:** Indica o estado atual do nó

### **Nome**

- **Tipo:** Texto
- **Padrão:** Comparação Lógica de Dado
- **Função:** Nome exibido no quadro de modelagem

### **Operação**

- **Tipo:** `A = B` | `A >= B` | `A <= B`
- **Padrão:** `A = B`
- **Função:** Define a operação lógica aplicada entre os dois valores de entrada

---

## **Exemplo de Uso**

**Cenário:** Simular se o ataque de um jogador (rolagem de 1d20) é bem-sucedido ao comparar com a defesa de um inimigo (rolagem de 1d12). O ataque é considerado bem-sucedido se o valor do ataque for **maior ou igual** ao da defesa.

### **1. Propriedades dos nós Geradores de Dados:**

- Gerador de Dado do ataque: Valor Mínimo `1`, Valor Máximo `20`
- Gerador de Dado da defesa: Valor Mínimo `1`, Valor Máximo `12`

### **2. Propriedades do nó Comparação Lógica de Dado:**

- Operação: `A >= B`

### **3. Conexão com outros nós:**

- Conecte **Gerador de Dado do ataque** ao nó **Comparação Lógica de Dado**
- Conecte **Gerador de Dado da defesa** ao nó **Comparação Lógica de Dado**
- Conecte o **Comparação Lógica de Dado** ao nó **Histograma**

<img src="/images/logical.png" width="500px" alt="Exemplo de uso do nó Comparação Lógica de Dado"/>

---

## **Notas**

- Ideal para verificar condições entre resultados de rolagens, como acertos, falhas, sucessos ou testes.
- Útil para representar testes de resistência, confrontos entre atributos ou verificações de dificuldade.

**Dado Absoluto** é um **nó do tipo modificador** utilizado para transformar os valores numéricos de entrada em seus valores absolutos, ou seja, removendo o sinal negativo quando presente.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Aplica o valor absoluto nos dados de entrada
- **Saída:** Valores absolutos para cada execução

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
- **Padrão:** Dado Absoluto
- **Função:** Nome exibido no quadro de modelagem

---

## **Exemplo de Uso**

**Cenário:** Simular a diferença absoluta de dano entre dois ataques (1d12 e 1d6), para avaliar a variação de impacto, independentemente de qual foi maior.

### **1. Propriedades dos nós Geradores de Dados:**

- Gerador de Dado A: Valor Mínimo `1`, Valor Máximo `12`
- Gerador de Dado B: Valor Mínimo `1`, Valor Máximo `6`

### **2. Propriedades do nó Matemático:**

- Operação: Subtração

### **3. Conexão com outros nós:**

- Conecte o **Gerador de Dado A** ao nó **Matemático**
- Conecte o **Gerador de Dado B** ao nó **Matemático**
- Conecte o nó **Matemático** ao nó **Dado Absoluto**
- Conecte o nó **Dado Absoluto** ao nó **Histograma**

<img src="/images/absolute.png" width="500px" alt="Exemplo de uso do nó Dado Absoluto"/>

---

## **Notas**

- Ideal para garantir que os valores numéricos resultantes sejam sempre positivos, eliminando o impacto de valores negativos em cálculos posteriores.

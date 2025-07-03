**AND Lógico** é um **nó do tipo modificador** utilizado para realizar a operação lógica **E** entre dois valores binários (verdadeiro ou falso). Ele retorna verdadeiro apenas quando **ambas** as entradas forem verdadeiras; caso contrário, retorna falso.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Aplica a operação lógica AND (E)
- **Saída:** Valor binário (verdadeiro ou falso)

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
- **Padrão:** AND Lógico
- **Função:** Nome exibido no quadro de modelagem

---

## **Exemplo de Uso**

**Cenário:** Verificar se um jogador teve **sucesso total** ao cumprir duas condições simultâneas ao rolar **1d10**:

- O valor rolado é par
- O valor rolado é maior ou igual a `8`

### **1. Propriedades do Gerador de Dado:**

- Valor Mínimo: `1`
- Valor Máximo: `10`

### **2. Propriedades do nó de Sucesso:**

- Sucesso se maior ou igual a: `8`

### **3. Conexões:**

- Conecte o **Gerador de Dado** ao **Dado Sucesso**
- Conecte o **Gerador de Dado** ao **Dado é Par**
- Conecte o **Dado Sucesso** ao **AND Lógico**
- Conecte o **Dado é Par** ao **AND Lógico**
- Conecte o **AND Lógico** ao **Histograma**

<img src="/node-crafter/doc-images/and-logical.png" alt="Exemplo de uso do nó AND Lógico" width="500px"/>

---

## **Notas**

- Ideal para criar condições compostas onde **ambas as condições devem ser verdadeiras**.
- Funciona exclusivamente com entradas binárias (verdadeiro/falso).
- Pode ser combinado com nós como **Dado Sucesso**, **Comparação Lógica de Dado**, **Dado é Par**, entre outros.

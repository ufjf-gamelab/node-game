**Inteiro** é um **nó do tipo gerador** utilizado para fornecer um valor fixo e constante em operações numéricas. Ele é útil para representar bônus, penalidades ou qualquer valor definido manualmente que deve participar de cálculos com outros nós numéricos.

- **Tipo:** Gerador (nó inicial)
- **Função:** Gera um valor numérico inteiro fixo
- **Saída:** Sempre o mesmo número inteiro, conforme definido na propriedade

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
- **Padrão:** Inteiro
- **Função:** Nome exibido no quadro de modelagem

### **Valor**

- **Tipo:** Número inteiro
- **Padrão:** `1`
- **Função:** Define o valor fixo gerado por este nó

---

## **Exemplo de Uso**

**Cenário:** Simular uma jogada de ataque em que o jogador rola **1d6** e soma um bônus fixo de **+4**.

### **1. Propriedades dos nós de entrada:**

- Gerador de Dado: Valor Mínimo `1`, Valor Máximo `6`
- Nó Inteiro: Valor = `4`

### **2. Propriedades do nó Matemático:**

- Operação: `Adição`

### **3. Conexão com outros nós:**

- Conecte o **Gerador de Dado** ao nó **Matemático**
- Conecte o **Nó Inteiro** ao nó **Matemático**
- Conecte o **Matemático** ao nó **Histograma**

<img src="/node-crafter/doc-images/integer.png" width="500px" alt="Exemplo de uso do nó Inteiro"/>

---

## **Notas**

- Útil para representar valores constantes dentro de qualquer tipo de cálculo.
- Permite representar facilmente bônus fixos, custos, penalidades, limites e outros valores definidos manualmente.

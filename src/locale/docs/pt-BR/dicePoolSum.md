**Pool Soma Dado** é um **nó do tipo modificador** responsável por somar os valores agrupados por um nó do tipo **Pool Dado**. Ele é utilizado para calcular o total de uma combinação de valores agrupados, como somas de múltiplos dados em sistemas de jogo.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Soma os valores agrupados de cada execução do Pool Dado
- **Saída:** Lista com os totais somados por execução

---

## **Propriedades**

### **ID do Nó**

- **Tipo:** Texto
- **Padrão:** ID aleatório
- **Função:** Identificador único do nó

### **Status**

- **Tipo:** Status
- **Padrão:** `IDLE`
- **Função:** Indica o estado atual do nó:
  - `IDLE`: Pronto para uso
  - `LOADING`: Calculando resultados
  - `FINISHED`: Finalizado com sucesso
  - `ERROR`: Ocorreu um problema
  - `MISSING DATA`: Faltando dados de entrada ou propriedades

### **Nome**

- **Tipo:** Texto
- **Padrão:** Pool Soma Dado
- **Função:** Nome exibido no quadro de modelagem

---

## **Exemplo de Uso**

**Cenário:** Simular um sistema de dano onde o jogador rola dois dados de seis faces (2d6) e soma o resultado para determinar o dano total.

### **1. Propriedades dos Dados Geradores:**

- Dado A: Valor Mínimo `1`, Valor Máximo `6`
- Dado B: Valor Mínimo `1`, Valor Máximo `6`

### **2. Conexão com outros nós:**

- Conecte **Dado A** ao **Pool Dado**
- Conecte **Dado B** ao **Pool Dado**
- Conecte **Pool Dado** ao **Pool Soma Dado**
- Conecte **Pool Soma Dado** ao nó **Histograma**

<img src="/images/dice-pool.png" width="500px" alt="Exemplo de uso do Pool Dado com Pool Soma Dado"/>

---

## **Notas**

- Sempre deve receber como entrada um nó do tipo **Pool Dado**
- Ideal para representar sistemas de soma de múltiplos dados

**Pool Dado** é um **nó do tipo modificador** utilizado para agrupar os resultados de dois outros nós numéricos em um único conjunto (pool). Ele é ideal para representar sistemas que acumulam múltiplos dados ou fontes numéricas, como rolagens combinadas em jogos de mesa.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Agrupa os valores de dois nós de entrada em um único conjunto
- **Saída:** Lista dos resultados numéricos agrupados em pares de execução

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
- **Padrão:** Pool Dado
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

- Útil para representar mecânicas com múltiplas rolagens simultâneas.
- Comumente encadeado com o nó **Pool Soma Dado** para adicionar o modificador de adição de valores.

**Dado é Par** é um **nó do tipo modificador** que retorna um resultado binário indicando sucesso ou falha com base na verificação se o valor numérico de entrada é par.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Verifica se o valor de entrada é par
- **Saída:** Verdadeiro (sucesso) se é par, falso (falha) se não é par

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
- **Padrão:** É par
- **Função:** Nome exibido no quadro de modelagem

---

## **Exemplo de Uso**

**Cenário:** Simular uma verificação de sucesso em que o jogador obtém sucesso se o valor rolado em um **1d10** for par.

### **1. Propriedades do nó Gerador de Dados:**

- Gerador de Dado: Valor Mínimo `1`, Valor Máximo `10`

### **2. Conexão com outros nós:**

- Conecte o nó **Gerador de Dado** ao nó **Dado é Par**
- Conecte o nó **Dado é Par** ao nó **Histograma de Sucesso/Falha**

<img src="/images/is-even.png" width="500px" alt="Exemplo de uso do nó Dado é Par"/>

---

## **Notas**

- Útil para mecânicas de resultado binário baseadas na paridade (par/ímpar) de rolagens de dados.
